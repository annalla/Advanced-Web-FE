import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: {
    token: "",
    id: "",
    name: "",
    avatarUrl: "",
  },
  teachingClass: [],
  enrolledClass: [],
  idTeachingClass: [],
  idEnrolledClass: [],
  handleEnrolled: (data) => {},
  handleTeaching: (data) => {},
  onLogout: () => {},
  onLogin: (data) => {},
});
const changeStringToList = (string) => {
  if (!string) return null;
  let strArr = string.split(",");
  let results = [];
  for (let str in strArr) {
    results.push(strArr[str]);
  }
  return results;
};
export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [teachingClass, setTeachingClass] = useState([]);
  const [enrolledClass, setEnrolledClass] = useState([]);
  const [idTeachingClass, setIdTeachingClass] = useState([]);
  const [idEnrolledClass, setIdEnrolledClass] = useState([]);

  useEffect(() => {
    const storedUserLoggedInInformation =
      localStorage.getItem("isAuthenticated");
    if (storedUserLoggedInInformation === "1") {
      setIsAuthenticated(true);
      const storedUserTokenInformation = localStorage.getItem("token");
      const storedUserIdInformation = localStorage.getItem("id");
      const storedUserNameInformation = localStorage.getItem("name");
      var storedUserAvatarInformation = localStorage.getItem("avatarUrl");
      if (storedUserAvatarInformation === null) {
        storedUserAvatarInformation = "";
      }
      const currentUser = {
        token: storedUserTokenInformation,
        id: storedUserIdInformation,
        name: storedUserNameInformation,
        avatarUrl: storedUserAvatarInformation,
      };
      setUser(currentUser);
      const EnrolledClass = localStorage.getItem("enrolled");
      const TeachingClass = localStorage.getItem("teaching");
      const IdEnrolledClass = localStorage.getItem("idEnrolled");
      const IdTeachingClass = localStorage.getItem("idTeaching");
      if (!EnrolledClass) {
        setEnrolledClass([]);
        setIdEnrolledClass([]);
      } else {
        const enrolled = changeStringToList(EnrolledClass);
        setEnrolledClass(enrolled);
        const idEnrolled = changeStringToList(IdEnrolledClass);
        setIdEnrolledClass(idEnrolled);
      }
      if (!TeachingClass) {
        setTeachingClass([]);
        setIdTeachingClass([]);
      } else {
        const teaching = changeStringToList(TeachingClass);
        setTeachingClass(teaching);
        const idTeaching = changeStringToList(IdTeachingClass);
        setIdTeachingClass(idTeaching);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logoutHandler = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "0");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("token");
    setUser(null);
    setTeachingClass([]);
    setEnrolledClass([]);
    setIdTeachingClass([]);
    setIdEnrolledClass([]);
  };
  const classListHandleTeaching = (data) => {
    var dataCustom = [];
    var dataIdCustom = [];
    data.map((item) => {
      dataIdCustom.push(item.id);
      return dataCustom.push(item.name);
    });
    localStorage.setItem("teaching", dataCustom);
    setTeachingClass(dataCustom);
    localStorage.setItem("idTeaching", dataIdCustom);
    setIdTeachingClass(dataIdCustom);
  };
  const classListHandleEnrolled = (data) => {
    var dataCustom = [];
    var dataIdCustom = [];
    data.map((item) => {
      dataIdCustom.push(item.id);
      return dataCustom.push(item.name);
    });
    localStorage.setItem("enrolled", dataCustom);
    setEnrolledClass(dataCustom);
    localStorage.setItem("idEnrolled", dataIdCustom);
    setIdEnrolledClass(dataIdCustom);
  };
  const loginHandler = (data) => {
    localStorage.setItem("isAuthenticated", "1");
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("avatarUrl", data.avatarUrl);
    localStorage.setItem("token", data.token);
    localStorage.setItem("teaching", []);
    localStorage.setItem("enrolled", []);
    localStorage.setItem("idTeaching", []);
    localStorage.setItem("idEnrolled", []);
    setIsAuthenticated(true);
    const currentUser = {
      token: data.token,
      id: data.id,
      name: data.name,
      avatarUrl: data.avatarUrl,
    };
    setUser(currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        user: user,
        teachingClass: teachingClass,
        enrolledClass: enrolledClass,
        idTeachingClass: idTeachingClass,
        idEnrolledClass: idEnrolledClass,
        handleEnrolled: classListHandleEnrolled,
        handleTeaching: classListHandleTeaching,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
