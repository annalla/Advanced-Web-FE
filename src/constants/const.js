require("dotenv").config();

export const JWT_TYPE = {
  JWT_TYPE_TEACHER: "1",
  JWT_TYPE_STUDENT: "2",
};
export const SRC_IMG = {
  COVER_IMAGE_CLASS: "/images/class/bg12.jpg",
  DEFAULT_AVATAR: "/images/avatar/avatar.jpg",
  PAGE_NOT_FOUND:"/images/404-page-not-found.jpg",
  ANNOUNCE:"/images/DetailClass/announce.jpg"
};
export const VALUE_TAB = {
  TAB_STREAM: 0,
  TAB_CLASSWORK: 1,
  TAB_PEOPLE: 2,
  TAB_GRADE: 3,
};
export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_API
    : process.env.REACT_APP_DEVELOPMENT_API;

export const GOOGLE_LOGIN_CLIENT_ID =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_GOOGLE_LOGIN_CLIENT_ID
    : process.env.REACT_APP_DEVELOPMENT_GOOGLE_LOGIN_CLIENT_ID;
    export const FE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_FE
    : process.env.REACT_APP_DEVELOPMENT_FE;