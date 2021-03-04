/**
 * Project data
 */
export interface Project {
  id: number;
  name: string;
  totalFrames: number;
}

export const PROJECTS: Array<Project> = [
  { id: 0, name: "BARNEY", totalFrames: 5312 },
  { id: 1, name: "BACKSTAGE", totalFrames: 2579 },
  { id: 2, name: "COCORICA", totalFrames: 4922 },
  { id: 3, name: "DIVE", totalFrames: 5094 },
  { id: 4, name: "DREAMBLOWER", totalFrames: 5925 },
  { id: 5, name: "FROM_ABOVE", totalFrames: 9345 },
  { id: 6, name: "GOOD_MORNING_KITTY", totalFrames: 5925 },
  { id: 7, name: "GREEN", totalFrames: 5925 },
  { id: 8, name: "HAKAM", totalFrames: 5925 },
  { id: 9, name: "HOSTILE", totalFrames: 5925 },
  { id: 10, name: "PIR_HEARTH", totalFrames: 7003 },
  { id: 11, name: "RELATIVITY", totalFrames: 10075 },
];


export const COLORS = [
  "rgb(21, 175, 151)",
  "rgb(232, 66, 59)",
  "rgb(0, 155, 217)",
  "rgb(176, 53, 139)",
  "rgb(249, 177, 34)",
  "rgb(255, 206, 68)",
  "#fd8b7c",
  "#00c9a7",
]
