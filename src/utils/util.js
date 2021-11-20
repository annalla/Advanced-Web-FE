export const splitPath = (path, match) => {
  let str = path.split(match);
  str = str[str.length - 1].split("?");
  str = str[0].split("/");
  str = str[0].split("#");
  return str[0];
};
