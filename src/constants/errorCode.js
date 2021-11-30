export const ERROR_CODE = {
    // Register
    PASSWORD_NOT_MATCH: "Password and retype password not match",
    PASSWORD_WEAK: "Password must contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character",
    USERNAME_EXISTED: "Username existed! Please choose another username!",
    PASSWORD_AND_RETYPE_DOES_NOT_MATCH: "Please check your retype password!",
    REGISTER_ACCOUNT_FAIL: "Register account failed! Please try again later!",
    USER_CODE_EXISTED: "Code existed! Please choose another code!",
    NAME_OF_USER_EMPTY: "Please input your name!",
    IDENTITY_CARD_EXISTED: "Identity number existed! Please choose another identity number!",
    FIND_USER_FAIL: "Find user failed!",
    GOOGLE_ID_NOT_EXISTED: "Google ID is not existed!",

    // Login
    WRONG_PASSWORD: "Wrong password!",
    EMPTY_PASSWORD: "Empty password!",
    USERNAME_NOT_EXISTED: "Username is not existed!",
    EXPIRED_USER_ACCOUNT: "Account is expired!",
    LOGIN_ACCOUNT_FAIL: "Login failed!",

    // Manage Profile
    UPDATE_FAILED: "Update information failed!",

    // Classroom
    CREATE_CLASSROOM_FAIL: "Create classroom failed!",
    EXISTED_CLASSROOM_CODE:"Classroom code existed!",
    CLASSROOM_ID_NOT_EXISTED: "Classroom ID does'nt existed",
    CLASSROOM_CODE_EMPTY: "Classroom code is empty!",
    CLASSROOM_NAME_EMPTY: "Classroom name is empty!",
    INVALID_CLASSROOM_INVITE_CODE: "Invalid classroom invite code!",
    USER_ALREADY_IN_CLASSROOM: "User already in classroom!",
    USER_ALREADY_OWNER_OF_CLASSROOM: "User is owner of this classroom!",
    ONLY_OWNER_CAN_INVITE_MEMBER_TO_CLASS: "Only owner can invite member to classroom!",

    // Grade
    EXISTED_GRADE_IN_CLASSROOM: "Grade existed in this classroom. Please pick up another grade!"
}