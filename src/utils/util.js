export const splitPath = (path, match) => {
  let str = path.split(match);
  str = str[str.length - 1].split("?");
  str = str[0].split("/");
  str = str[0].split("#");
  return str[0];
};
export const splitDomain = (path, match) => {
  let str = path.split(match);
  return str[str.length - 1];
};
export const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const joinTwoList = (list1, list2) => {
  let result = [];
  let i = 0;
  while (i < list1.length) {
    result.push({
      name: list1[i],
      id: list2[i],
    });
    i++;
  }
  return result;
};
