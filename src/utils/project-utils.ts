namespace ProjectUtils {
  /**
   * "hello-kitty" -> "HELLO_KITTY"
   */
  export const projectNameToUpperCase = (name: string): string => {
    return name.toUpperCase().replaceAll("-", "_");
  };

  /**
   * "HELLO_KITTY" -> "hello-kitty"
   */
  export const projectNameToLowerHyphen = (name: string): string => {
    return name.toLowerCase().replaceAll("_", "-");
  };

  /**
   * "HELLO_KITTY" -> "Hello Kitty"
   */
  export const projectNameToReadable = (name: string): string => {
    return name
      .split("_")
      .map((e) => e[0] + e.slice(1).toLowerCase())
      .join(" ");
  };
}

export default ProjectUtils;
