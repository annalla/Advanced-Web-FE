import { API_URL } from "./const"
export const PATH = {
    HOME: "/",
    PRODUCT: "/product",
    LOGIN: "/login",
    REGISTER: "/register",
    ADD_CLASS: "/addClass",
    DETAIL_CLASS: "/detailedClass/:code",
    DETAIL_CLASS_PEOPLE: "/detailedClass/people/:code",
    MANAGE_PROFILE: '/user',
    JOIN_CLASS_BY_TEACHER: '/classroom/join/teacher/code',
    JOIN_CLASS_BY_STUDENT: '/classroom/join/student/code',
}
export const DOMAIN = API_URL;
