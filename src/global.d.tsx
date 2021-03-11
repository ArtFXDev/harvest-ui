/**
 * Project data
 */
export interface Project {
  id: number;
  name: string;
  color: string;
  totalFrames: number;
}

export const PROJECTS: Array<Project> = [
  {
    id: 0,
    name: "BARNEY",
    color: "rgb(21, 175, 151)",
    totalFrames: 5312
  },
  {
    id: 1,
    name: "BACKSTAGE",
    color: "rgb(232, 66, 59)",
    totalFrames: 2579
  },
  {
    id: 2,
    name: "COCORICA",
    color: "rgb(0, 155, 217)",
    totalFrames: 4922
  },
  {
    id: 3,
    name: "DIVE",
    color: "rgb(176, 53, 139)",
    totalFrames: 5094
  },
  {
    id: 4,
    name: "DREAMBLOWER",
    color: "rgb(249, 177, 34)",
    totalFrames: 5925
  },
  {
    id: 5,
    name: "FROM_ABOVE",
    color: "rgb(255, 206, 68)",
    totalFrames: 9345
  },
  {
    id: 6,
    name: "GOOD_MORNING_KITTY",
    color: "#fd8b7c",
    totalFrames: 5925
  },
  {
    id: 7,
    name: "GREEN",
    color: "#00c9a7",
    totalFrames: 5925
  },
  {
    id: 8,
    name: "HAKAM",
    color: "#af0069",
    totalFrames: 5925
  },
  {
    id: 9,
    name: "HOSTILE",
    color: "#db6400",
    totalFrames: 5925
  },
  {
    id: 10,
    name: "PIR_HEARTH",
    color: "#96bb7c",
    totalFrames: 7003
  },
  {
    id: 11,
    name: "RELATIVITY",
    color: "#7868e6",
    totalFrames: 10075
  },
  {
    id: 12,
    name: "TEST_PIPE",
    color: "black",
    totalFrames: 3811
  }
];

/**
 * Get a project object from it's name
 */
export const getProjectFromName = (name: string): Project => {
  return PROJECTS.filter(project => project.name === name)[0];
}

/**
 * "hello-kitty" -> "HELLO_KITTY"
 */
export const projectNameToUpperCase = (name: string): string => {
  return name.toUpperCase().replaceAll('-', '_');
}

/**
 * "HELLO_KITTY" -> "hello-kitty"
 */
export const projectNameToLowerHyphen = (name: string): string => {
  return name.toLowerCase().replaceAll('_', '-');
}

/**
 * "HELLO_KITTY" -> "Hello Kitty"
 */
export const projectNameToReadable = (name: string): string => {
  return name.split('_').map(e => e[0] + e.slice(1).toLowerCase()).join(' ');
}
