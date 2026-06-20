#!/usr/bin/env python3
"""Scrape company news from tianhuisuliao.com and generate news data + compressed images."""

import json
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

BASE_URL = "http://www.tianhuisuliao.com"
COMPANY_LIST_PAGES = [
    "index_t9.html",
    "index_t9_p2.html",
    "index_t9_p3.html",
    "index_t9_p4.html",
]
GLOBAL_LIST_PAGES = [
    "index_t10.html",
    "index_t10_p2.html",
]
LIST_PAGES = COMPANY_LIST_PAGES
ROOT = Path(__file__).resolve().parent.parent
PUBLIC_NEWS = ROOT / "public" / "news"
DATA_DIR = ROOT / "src" / "data"
CONTENT_DIR = DATA_DIR / "news-content"

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; TianhuiNewsBot/1.0)"}


def fetch(url: str, timeout: int = 30) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read()
    for enc in ("gbk", "gb2312", "utf-8"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def fetch_bytes(url: str, timeout: int = 60) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def abs_url(href: str) -> str:
    if href.startswith("http"):
        return href
    return urllib.parse.urljoin(BASE_URL + "/", href.lstrip("/"))


def article_id_from_url(url: str) -> str:
    m = re.search(r"_i(\d+)\.html", url)
    return m.group(1) if m else re.sub(r"\W+", "-", url)[-20:]


def parse_list_page(html: str) -> list[dict]:
    items = []
    pattern = re.compile(
        r'<li>\s*<span>\[(\d{4}-\d{2}-\d{2})\]</span>\s*<a\s+href="([^"]+)"[^>]*(?:title="([^"]*)")?[^>]*>([^<]+)</a>',
        re.I,
    )
    for m in pattern.finditer(html):
        date, href, title_attr, title_text = m.group(1), m.group(2), m.group(3), m.group(4)
        title = unescape(title_attr or title_text).strip()
        title = re.sub(r"\.{2,}$", "", title).strip()
        items.append({"url": abs_url(href), "date": date, "title": title})
    return items


def extract_article(html: str) -> dict:
    title = ""
    m = re.search(r'<div\s+class="ny_nr_bt">([^<]+)</div>', html, re.I)
    if m:
        title = unescape(m.group(1)).strip()

    date = ""
    m = re.search(r'class="ny_nr_date"[^>]*>[^0-9]*(\d{4}-\d{2}-\d{2})', html, re.I)
    if m:
        date = m.group(1)

    content_html = ""
    m = re.search(r'id="js_content"[^>]*>', html, re.I)
    if m:
        start = m.end()
        end_m = re.search(
            r"</div>\s*</div>\s*</div>\s*<div\s+class=\"clear\"",
            html[start:],
            re.I | re.S,
        )
        if end_m:
            content_html = html[start : start + end_m.start()].strip()
    if not content_html:
        m = re.search(
            r'class="ny_nr_date"[^>]*>.*?</div>\s*<div[^>]*>(.*?)</div>\s*</div>\s*</div>\s*<div\s+class="clear"',
            html,
            re.I | re.S,
        )
        if m:
            content_html = m.group(1).strip()

    content_html = re.sub(r"<script[^>]*>.*?</script>", "", content_html, flags=re.I | re.S)
    content_html = re.sub(r"<style[^>]*>.*?</style>", "", content_html, flags=re.I | re.S)
    content_html = re.sub(r'id="meta_content"[^>]*>.*?</div>', "", content_html, flags=re.I | re.S)
    content_html = re.sub(r'class="rich_media_meta[^"]*"[^>]*>.*?</span>', "", content_html, flags=re.I | re.S)
    content_html = re.sub(r'\sstyle="[^"]*"', "", content_html)
    content_html = re.sub(r'\sclass="[^"]*"', "", content_html)
    content_html = re.sub(r'\salign="[^"]*"', "", content_html)
    content_html = re.sub(r"<span>\s*<br\s*/?>\s*</span>", "", content_html, flags=re.I)
    content_html = re.sub(r"<div>\s*<br\s*/?>\s*</div>", "", content_html, flags=re.I)
    content_html = re.sub(r"(<br\s*/?>\s*){3,}", "<br /><br />", content_html, flags=re.I)
    content_html = re.sub(r"<p>\s*<br\s*/?>\s*</p>", "", content_html, flags=re.I)
    content_html = re.sub(r"&nbsp;", " ", content_html)

    images = []
    for im in re.finditer(r'src=["\']([^"\']+)["\']', content_html, re.I):
        src = im.group(1).strip()
        if src and not src.startswith("data:") and "/images/kf/" not in src and not src.startswith("/news/"):
            images.append(abs_url(src))

    text = re.sub(r"<[^>]+>", " ", content_html)
    text = unescape(re.sub(r"\s+", " ", text)).strip()
    excerpt = text[:180] + ("..." if len(text) > 180 else "")

    return {"title": title, "date": date, "content_html": content_html, "images": list(dict.fromkeys(images)), "excerpt": excerpt}


def normalize_content_html(content_html: str) -> str:
    content_html = re.sub(r"^发布日期：[^<]*</div>\s*<div>", "", content_html.strip(), flags=re.I)
    content_html = content_html.replace("/cxev/kindeditor/../../news/", "/news/")
    content_html = re.sub(r"\sstyle=\"[^\"]*\"", "", content_html)
    content_html = re.sub(r"\sclass=\"[^\"]*\"", "", content_html)
    content_html = re.sub(r'\salign="[^"]*"', "", content_html)
    content_html = re.sub(r'\swidth="[^"]*"', "", content_html)
    content_html = re.sub(r'\sheight="[^"]*"', "", content_html)
    content_html = re.sub(r"&nbsp;", " ", content_html)
    content_html = re.sub(r"</div>\s*$", "", content_html.strip())
    return content_html.strip()


def compress_image(src_path: Path, max_width: int = 1200, quality: int = 82) -> Path:
    """Compress image to JPEG via sharp; returns final path."""
    out_path = src_path.with_suffix(".jpg")
    helper = ROOT / "scripts" / "_compress-one.mjs"
    helper.write_text(
        f"""import sharp from 'sharp';
import fs from 'fs';
const src = process.argv[2];
const out = process.argv[3];
const tmp = out + '.tmp';
await sharp(src)
  .resize({{ width: {max_width}, withoutEnlargement: true }})
  .jpeg({{ quality: {quality}, mozjpeg: true }})
  .toFile(tmp);
fs.renameSync(tmp, out);
if (src !== out) fs.unlinkSync(src);
""",
        encoding="utf-8",
    )
    try:
        subprocess.run(
            ["node", str(helper), str(src_path), str(out_path)],
            cwd=str(ROOT),
            check=True,
            capture_output=True,
            timeout=60,
        )
        return out_path if out_path.exists() else src_path
    except Exception as e:
        print(f"  warn: compress failed for {src_path.name}: {e}", file=sys.stderr)
        return src_path


def download_image(url: str, dest: Path) -> Path | None:
    try:
        data = fetch_bytes(url)
        if len(data) < 500:
            return None
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return compress_image(dest)
    except Exception as e:
        print(f"  warn: image download failed {url}: {e}", file=sys.stderr)
        return None


def rewrite_content_images(content_html: str, url_to_local: dict[str, str]) -> str:
    def repl(m):
        before_src, src, after_src = m.group(1), m.group(2), m.group(3)
        local = url_to_local.get(src) or url_to_local.get(abs_url(src))
        if local:
            after = re.sub(r'\swidth=["\'][^"\']*["\']', "", after_src, flags=re.I)
            after = re.sub(r'\sheight=["\'][^"\']*["\']', "", after, flags=re.I)
            return f'<img{before_src}src="{local}"{after} loading="lazy">'
        return m.group(0)

    return re.sub(
        r'<img([^>]*?)src=["\']([^"\']+)["\']([^>]*?)\s*/?>',
        repl,
        content_html,
        flags=re.I,
    )


def local_images_for_slug(slug: str) -> list[Path]:
    files = list(PUBLIC_NEWS.glob(f"{slug}*.jpg"))
    def sort_key(p: Path) -> tuple[int, int]:
        stem = p.stem
        if stem == slug:
            return (0, 0)
        if stem.startswith(f"{slug}-"):
            try:
                return (0, int(stem.rsplit("-", 1)[-1]))
            except ValueError:
                return (1, 0)
        return (2, 0)
    return sorted(files, key=sort_key)


def map_images_to_local(slug: str, remote_images: list[str]) -> dict[str, str]:
    local_files = local_images_for_slug(slug)
    mapping: dict[str, str] = {}
    for i, remote in enumerate(remote_images):
        if i < len(local_files):
            mapping[remote] = f"/news/{local_files[i].name}"
    return mapping


def sanitize_existing_json() -> None:
    for path in sorted(CONTENT_DIR.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        data["contentHtml"] = normalize_content_html(data.get("contentHtml", ""))
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Sanitized {len(list(CONTENT_DIR.glob('*.json')))} content files")


def fix_existing_content() -> None:
    scraped = json.loads((ROOT / "scripts" / "_scraped-news.json").read_text(encoding="utf-8"))
    url_by_slug = {article_id_from_url(item["url"]): item["url"] for item in json.loads(
        (ROOT / "scripts" / "_scraped-urls.json").read_text(encoding="utf-8")
    )} if (ROOT / "scripts" / "_scraped-urls.json").exists() else {}

    # rebuild url map from list pages
    if not url_by_slug:
        for page in LIST_PAGES:
            html = fetch(f"{BASE_URL}/{page}")
            for item in parse_list_page(html):
                url_by_slug[article_id_from_url(item["url"])] = item["url"]

    updated_posts = []
    for i, post in enumerate(scraped, 1):
        slug = post["slug"]
        aid = slug.replace("cn-", "")
        url = url_by_slug.get(aid)
        if not url:
            print(f"  skip {slug}: no url")
            updated_posts.append(post)
            continue
        print(f"[{i}/{len(scraped)}] fix {slug}")
        try:
            html = fetch(url)
            article = extract_article(html)
        except Exception as e:
            print(f"  error: {e}", file=sys.stderr)
            updated_posts.append(post)
            continue

        title = article["title"] or post["title"]
        url_to_local = map_images_to_local(slug, article["images"])
        content_html = article["content_html"]
        for remote, local in url_to_local.items():
            content_html = content_html.replace(remote, local)
            content_html = content_html.replace(remote.replace(BASE_URL, ""), local)
        content_html = normalize_content_html(content_html)
        if not content_html.strip():
            content_html = f"<p>{article['excerpt'] or title}</p>"

        content_file = CONTENT_DIR / f"{slug}.json"
        content_file.write_text(
            json.dumps(
                {
                    "slug": slug,
                    "title": title,
                    "titleZh": title,
                    "contentHtml": content_html,
                    "contentHtmlZh": content_html,
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )

        excerpt = article["excerpt"] or title[:120]
        local_files = local_images_for_slug(slug)
        cover = f"/news/{local_files[0].name}" if local_files else post.get("cover")
        updated_posts.append({
            **post,
            "title": title,
            "titleZh": title,
            "excerpt": excerpt,
            "excerptZh": excerpt,
            "cover": cover,
        })
        time.sleep(0.15)

    global_posts = load_saved_posts("_scraped-global.json")
    generate_news_ts(updated_posts, global_posts)
    (ROOT / "scripts" / "_scraped-news.json").write_text(
        json.dumps(updated_posts, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"Fixed {len(updated_posts)} posts")


def generate_news_ts(posts: list[dict], global_posts: list[dict]) -> None:
    lines = [
        'export type NewsCategory = "company" | "global";',
        "",
        "export type NewsPost = {",
        "  slug: string;",
        "  title: string;",
        "  excerpt: string;",
        "  titleZh?: string;",
        "  excerptZh?: string;",
        "  tagsZh?: string[];",
        "  date: string;",
        "  category: NewsCategory;",
        "  tags?: string[];",
        "  cover?: string;",
        "};",
        "",
        "export const newsPosts: NewsPost[] = [",
    ]
    all_posts = posts + global_posts
    for p in all_posts:
        lines.append("  {")
        lines.append(f'    slug: {json.dumps(p["slug"], ensure_ascii=False)},')
        lines.append(f'    title: {json.dumps(p["title"], ensure_ascii=False)},')
        if p.get("titleZh"):
            lines.append(f'    titleZh: {json.dumps(p["titleZh"], ensure_ascii=False)},')
        lines.append(f'    excerpt: {json.dumps(p["excerpt"], ensure_ascii=False)},')
        if p.get("excerptZh"):
            lines.append(f'    excerptZh: {json.dumps(p["excerptZh"], ensure_ascii=False)},')
        lines.append(f'    date: {json.dumps(p["date"])},')
        lines.append(f'    category: {json.dumps(p["category"])},')
        if p.get("tags"):
            lines.append(f'    tags: {json.dumps(p["tags"], ensure_ascii=False)},')
        if p.get("tagsZh"):
            lines.append(f'    tagsZh: {json.dumps(p["tagsZh"], ensure_ascii=False)},')
        if p.get("cover"):
            lines.append(f'    cover: {json.dumps(p["cover"])},')
        lines.append("  },")
    lines.extend([
        "];",
        "",
        "export function getPostsByCategory(category: NewsCategory): NewsPost[] {",
        "  return newsPosts",
        "    .filter((p) => p.category === category)",
        "    .sort((a, b) => (a.date < b.date ? 1 : -1));",
        "}",
        "",
    ])
    (DATA_DIR / "news.ts").write_text("\n".join(lines), encoding="utf-8")


def truncate_excerpt(text: str, limit: int = 100) -> str:
    text = re.sub(r"\s+", " ", unescape(text)).strip()
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + "..."


def load_saved_posts(filename: str) -> list[dict]:
    path = ROOT / "scripts" / filename
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return []


def fetch_list_items(pages: list[str]) -> list[dict]:
    all_items: list[dict] = []
    seen_urls: set[str] = set()
    for page in pages:
        url = f"{BASE_URL}/{page}"
        html = fetch(url)
        items = parse_list_page(html)
        print(f"  {page}: {len(items)} items")
        for item in items:
            if item["url"] not in seen_urls:
                seen_urls.add(item["url"])
                all_items.append(item)
    return all_items


def scrape_posts_from_list(
    all_items: list[dict],
    *,
    slug_prefix: str,
    category: str,
    tags_en: list[str],
    tags_zh: list[str],
) -> list[dict]:
    PUBLIC_NEWS.mkdir(parents=True, exist_ok=True)
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    posts: list[dict] = []

    for i, item in enumerate(all_items, 1):
        aid = article_id_from_url(item["url"])
        slug = f"{slug_prefix}-{aid}"
        print(f"[{i}/{len(all_items)}] {item['title'][:50]}...")

        try:
            html = fetch(item["url"])
            article = extract_article(html)
        except Exception as e:
            print(f"  error: {e}", file=sys.stderr)
            article = {
                "title": item["title"],
                "date": item["date"],
                "content_html": "",
                "images": [],
                "excerpt": item["title"],
            }

        title = article["title"] or item["title"]
        date = article["date"] or item["date"]
        url_to_local: dict[str, str] = {}
        cover = None

        for j, img_url in enumerate(article["images"]):
            ext = Path(urllib.parse.urlparse(img_url).path).suffix or ".jpg"
            fname = f"{slug}-{j}{ext}" if j else f"{slug}{ext}"
            dest = PUBLIC_NEWS / fname
            saved = download_image(img_url, dest)
            if saved:
                local_path = f"/news/{saved.name}"
                url_to_local[img_url] = local_path
                if cover is None:
                    cover = local_path
            time.sleep(0.15)

        content_html = article["content_html"]
        for remote, local in url_to_local.items():
            content_html = content_html.replace(remote, local)
            content_html = content_html.replace(remote.replace(BASE_URL, ""), local)
        content_html = normalize_content_html(content_html)
        if not content_html.strip():
            content_html = f"<p>{article['excerpt'] or title}</p>"

        content_file = CONTENT_DIR / f"{slug}.json"
        content_file.write_text(
            json.dumps(
                {
                    "slug": slug,
                    "title": title,
                    "titleZh": title,
                    "contentHtml": content_html,
                    "contentHtmlZh": content_html,
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )

        excerpt = truncate_excerpt(article["excerpt"] or title, 100)
        posts.append({
            "slug": slug,
            "title": title,
            "titleZh": title,
            "excerpt": excerpt,
            "excerptZh": excerpt,
            "date": date,
            "category": category,
            "tags": tags_en,
            "tagsZh": tags_zh,
            "cover": cover,
        })
        time.sleep(0.2)

    return posts


def scrape_global() -> None:
    dry_run = "--dry-run" in sys.argv
    print("Fetching global news list pages...")
    all_items = fetch_list_items(GLOBAL_LIST_PAGES)
    print(f"Total unique articles: {len(all_items)}")
    if dry_run:
        for it in all_items:
            print(f"  [{it['date']}] {it['title'][:60]} -> {it['url']}")
        return

    global_posts = scrape_posts_from_list(
        all_items,
        slug_prefix="gn",
        category="global",
        tags_en=["Global News"],
        tags_zh=["全球资讯"],
    )
    company_posts = load_saved_posts("_scraped-news.json")
    generate_news_ts(company_posts, global_posts)

    (ROOT / "scripts" / "_scraped-global.json").write_text(
        json.dumps(global_posts, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (ROOT / "scripts" / "_scraped-global-urls.json").write_text(
        json.dumps(all_items, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"\nDone: {len(global_posts)} global posts")
    print(f"  news.ts updated ({len(company_posts)} company + {len(global_posts)} global)")


def main():
    dry_run = "--dry-run" in sys.argv
    all_items: list[dict] = []
    seen_urls: set[str] = set()

    print("Fetching list pages...")
    for page in LIST_PAGES:
        url = f"{BASE_URL}/{page}"
        try:
            html = fetch(url)
            items = parse_list_page(html)
            print(f"  {page}: {len(items)} items")
            for item in items:
                if item["url"] not in seen_urls:
                    seen_urls.add(item["url"])
                    all_items.append(item)
        except Exception as e:
            print(f"  error {page}: {e}", file=sys.stderr)

    print(f"Total unique articles: {len(all_items)}")
    if dry_run:
        for it in all_items:
            print(f"  [{it['date']}] {it['title'][:60]} -> {it['url']}")
        return

    PUBLIC_NEWS.mkdir(parents=True, exist_ok=True)
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    posts = []
    for i, item in enumerate(all_items, 1):
        aid = article_id_from_url(item["url"])
        slug = f"cn-{aid}"
        print(f"[{i}/{len(all_items)}] {item['title'][:50]}...")

        try:
            html = fetch(item["url"])
            article = extract_article(html)
        except Exception as e:
            print(f"  error: {e}", file=sys.stderr)
            article = {"title": item["title"], "date": item["date"], "content_html": "", "images": [], "excerpt": item["title"]}

        title = article["title"] or item["title"]
        date = article["date"] or item["date"]
        url_to_local: dict[str, str] = {}
        cover = None

        for j, img_url in enumerate(article["images"]):
            ext = Path(urllib.parse.urlparse(img_url).path).suffix or ".jpg"
            fname = f"{slug}-{j}{ext}" if j else f"{slug}{ext}"
            dest = PUBLIC_NEWS / fname
            saved = download_image(img_url, dest)
            if saved:
                local_path = f"/news/{saved.name}"
                url_to_local[img_url] = local_path
                if cover is None:
                    cover = local_path
            time.sleep(0.15)

        content_html = article["content_html"]
        for remote, local in url_to_local.items():
            content_html = content_html.replace(remote, local)
            content_html = content_html.replace(remote.replace(BASE_URL, ""), local)
        content_html = normalize_content_html(content_html)
        if not content_html.strip():
            content_html = f"<p>{article['excerpt'] or title}</p>"

        content_file = CONTENT_DIR / f"{slug}.json"
        content_file.write_text(
            json.dumps(
                {
                    "slug": slug,
                    "title": title,
                    "titleZh": title,
                    "contentHtml": content_html,
                    "contentHtmlZh": content_html,
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )

        posts.append({
            "slug": slug,
            "title": title,
            "titleZh": title,
            "excerpt": article["excerpt"] or title[:120],
            "excerptZh": article["excerpt"] or title[:120],
            "date": date,
            "category": "company",
            "tags": ["Company News"],
            "tagsZh": ["公司新闻"],
            "cover": cover,
        })
        time.sleep(0.2)

    global_posts = load_saved_posts("_scraped-global.json")
    generate_news_ts(posts, global_posts)
    out_json = ROOT / "scripts" / "_scraped-news.json"
    urls_json = ROOT / "scripts" / "_scraped-urls.json"
    urls_json.write_text(json.dumps(all_items, ensure_ascii=False, indent=2), encoding="utf-8")
    out_json.write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nDone: {len(posts)} company posts")
    print(f"  news.ts updated")
    print(f"  images -> {PUBLIC_NEWS}")
    print(f"  content -> {CONTENT_DIR}")


def translate_all_news_en() -> None:
    try:
        from deep_translator import GoogleTranslator
    except ImportError:
        print("Install deep-translator: pip install deep-translator", file=sys.stderr)
        sys.exit(1)

    cache_path = ROOT / "scripts" / "_translation-cache.json"
    cache: dict[str, str] = {}
    if cache_path.exists():
        cache = json.loads(cache_path.read_text(encoding="utf-8"))

    translator = GoogleTranslator(source="zh-CN", target="en")
    files = sorted(CONTENT_DIR.glob("*.json"))
    print(f"Translating {len(files)} articles to English...")

    def translate_text(text: str) -> str:
        text = unescape(text).strip()
        if not text:
            return text
        if text in cache:
            return cache[text]
        try:
            if len(text) > 4500:
                chunks = []
                buf = ""
                for part in re.split(r"([。！？\n])", text):
                    if len(buf) + len(part) > 4500 and buf:
                        chunks.append(buf)
                        buf = part
                    else:
                        buf += part
                if buf:
                    chunks.append(buf)
                en = " ".join(
                    (translator.translate(c.strip()) or c.strip())
                    for c in chunks
                    if c.strip()
                )
            else:
                en = translator.translate(text)
            if not en:
                en = text
        except Exception as e:
            print(f"  warn: translate failed: {e}", file=sys.stderr)
            en = text
        cache[text] = en
        time.sleep(0.25)
        return en

    def translate_html(html: str) -> str:
        def repl(m: re.Match[str]) -> str:
            text = m.group(1)
            if not text.strip() or re.match(r"^[\s\r\n\t]+$", text):
                return m.group(0)
            return ">" + translate_text(text) + "<"

        return re.sub(r">([^<]+)<", repl, html)

    for i, path in enumerate(files, 1):
        data = json.loads(path.read_text(encoding="utf-8"))
        if "titleZh" not in data:
            data["titleZh"] = data.get("title", "")
            data["contentHtmlZh"] = data.get("contentHtml", "")

        slug = data["slug"]
        print(f"[{i}/{len(files)}] {slug}")

        if not data.get("title") or data.get("title") == data["titleZh"]:
            data["title"] = translate_text(data["titleZh"]) or data["titleZh"]
        if not data.get("contentHtml") or data.get("contentHtml") == data.get("contentHtmlZh"):
            data["contentHtml"] = translate_html(data["contentHtmlZh"]) or data["contentHtmlZh"]

        path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    cache_path.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")

    company_posts = load_saved_posts("_scraped-news.json")
    global_posts = load_saved_posts("_scraped-global.json")
    if not company_posts and not global_posts:
        print("No scraped metadata; only content JSON updated.", file=sys.stderr)
        return

    for posts in (company_posts, global_posts):
        for p in posts:
            content_path = CONTENT_DIR / f"{p['slug']}.json"
            if not content_path.exists():
                continue
            data = json.loads(content_path.read_text(encoding="utf-8"))
            p["titleZh"] = data.get("titleZh", p.get("titleZh", p["title"]))
            p["title"] = data.get("title", p["title"])
            p["excerptZh"] = p.get("excerptZh") or p.get("excerpt", "")
            text = re.sub(r"<[^>]+>", " ", data.get("contentHtml", ""))
            p["excerpt"] = truncate_excerpt(text, 100)

    generate_news_ts(company_posts, global_posts)
    if company_posts:
        (ROOT / "scripts" / "_scraped-news.json").write_text(
            json.dumps(company_posts, ensure_ascii=False, indent=2), encoding="utf-8"
        )
    if global_posts:
        (ROOT / "scripts" / "_scraped-global.json").write_text(
            json.dumps(global_posts, ensure_ascii=False, indent=2), encoding="utf-8"
        )
    print(f"Done: translated {len(files)} articles, news.ts updated")


if __name__ == "__main__":
    if "--global" in sys.argv:
        scrape_global()
    elif "--translate-en" in sys.argv:
        translate_all_news_en()
    elif "--fix-content" in sys.argv:
        fix_existing_content()
    elif "--sanitize" in sys.argv:
        sanitize_existing_json()
    else:
        main()
