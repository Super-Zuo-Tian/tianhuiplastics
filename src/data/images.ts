/**
 * Image asset registry.
 * All images are stored under /public/images/ and reference real photos
 * extracted from "TIANHUI GROUP COMPANY PROFILE(1).pptx".
 *
 * 85 original PPT images are kept in `_pptx_images_backup/` (one level above
 * the astro project root) as a reference library. Drop additional images into
 * `public/images/` and register them here to use them across pages.
 */

export const images = {
  building1: "/images/building-1.jpg",
  building2: "/images/building-2.jpg",
  building3: "/images/building-3.png",
  lobby1: "/images/lobby-1.jpg",
  lobby2: "/images/lobby-2.jpg",
  lobbyLogoWall: "/images/lobby-logo-wall.jpg",
  office1: "/images/office-1.jpg",
  office2: "/images/office-2.jpg",
  library: "/images/library.jpg",
  canteen: "/images/canteen.jpg",
  basketball: "/images/basketball.jpg",
  badminton: "/images/badminton.jpg",
  basketballMatch: "/images/basketball-match.jpg",
  badmintonMatch: "/images/badminton-match.jpg",
  teamBuilding: "/images/team-building.jpg",
  teamGroupPhoto: "/images/team-group-photo.jpg",
  top500Celebration: "/images/top500-celebration.jpg",
  annualMeeting: "/images/annual-meeting.jpg",
  internationalChamber: "/images/international-chamber.jpg",
  resinPelletsGrid: "/images/resin-pellets-grid.png",
  trucks: "/images/trucks.png",
  freightPlatform: "/images/freight-platform.png",
  certTransport: "/images/cert-transport.jpg",
  certSoftware: "/images/cert-software.png",
  citySkyline: "/images/city-skyline.jpg",
} as const;

export type ImageKey = keyof typeof images;
