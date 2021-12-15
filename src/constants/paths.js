import { FE_URL } from "./const"
export const PATH = {
  HOME: "/",
  PRODUCT: "/product",
  LOGIN: "/login",
  REGISTER: "/register",
  DETAIL_CLASS:"/detailedClass/:code",
  DETAIL_CLASS_SPLIT:"/detailedClass/",
  DETAIL_CLASS_PEOPLE:"/detailedClass/people/:code",
  DETAIL_CLASS_PEOPLE_SPLIT:"/detailedClass/people/",
  GRADE_SPLIT:"/grade/",
  GRADE:"/grade/:code",
  MANAGE_PROFILE: '/user',
  JOIN_CLASS:'/join',
  JOIN_CLASS_INVITATION:'/join?code=',
}

export const DOMAIN = FE_URL;
