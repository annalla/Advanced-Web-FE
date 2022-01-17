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
  STUDENT_GRADE: "/grade/student/:code",
  STUDENT_GRADE_SPLIT: "/grade/student/",
  GRADE_REVIEW: "/grade/review/:code",
  GRADE_REVIEW_SPLIT: "/grade/review/",
  LIST_GRADE_REVIEW: "/list-grade-review/:code",
  LIST_GRADE_REVIEW_SPLIT: "/list-grade-review/",
  MANAGE_PROFILE: '/user',
  JOIN_CLASS:'/join',
  JOIN_CLASS_INVITATION:'/join?code=',
  FORGOT_PASSWORD: '/forgot-password',
  HANDLE_FORGOT_PASSWORD: '/verify',
  UPDATE_PASSWORD: '/update-password',
  VERIFY_EMAIL: '/verify-email'
}

export const DOMAIN = FE_URL;
