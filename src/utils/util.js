export const splitPath = (path, match) => {
  let str = path.split(match);
  str = str[str.length - 1].split("?");
  str = str[0].split("/");
  str = str[0].split("#");
  return str[0];
};
export const isValidEmail = (e) => {
  let emailRegex= new RegExp("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
  if (e.length < 3 && e.length > 254) {
    return false;
  }
  return e.match(emailRegex);
};
