import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  token: "",
  id: "",
  name: "",
  avatarUrl: "",
  teachingClass: [],
  enrolledClass: [],
  handleEnrolled: (data) => {},
  handleTeaching: (data) => {},
  onLogout: () => {},
  onLogin: (data) => {},
});

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [teachingClass, setTeachingClass] = useState([]);
  const [enrolledClass, setEnrolledClass] = useState([]);

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
      // console.log(currentUser);
      setUser(currentUser);
      const EnrolledClass=localStorage.getItem("enrolled");
      const TeachingClass=localStorage.getItem("teaching");
      if(!EnrolledClass){
        setEnrolledClass([]);
      } else {
        setEnrolledClass(EnrolledClass);
      }
      if (TeachingClass.length === 0) {
        setTeachingClass([]);
      } else {
        setTeachingClass(TeachingClass);
      }
    }
  }, []);

  const logoutHandler = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("token");
    setUser(null);
    setTeachingClass([]);
    setEnrolledClass([]);
  };
  const classListHandleTeaching = (data) => {
    var dataCustom = [];
    data.map((item) => {
      dataCustom.push(item.name);
    });
    localStorage.setItem("teaching", dataCustom);
    setTeachingClass(dataCustom);
  };
  const classListHandleEnrolled = (data) => {
    var dataCustom = [];
    data.map((item) => {
      dataCustom.push(item.name);
    });
    localStorage.setItem("enrolled", dataCustom);
    setEnrolledClass(dataCustom);
  };
  const loginHandler = (data) => {
    localStorage.setItem("isAuthenticated", "1");
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("avatarUrl", data.avatarUrl);
    localStorage.setItem("token", data.token);
    localStorage.setItem("teaching", []);
    localStorage.setItem("enrolled", []);
    setIsAuthenticated(true);
    const currentUser = {
      token: data.token,
      id: data.id,
      name: data.name,
      avatarUrl: data.avatarUrl,
    };
    console.log(user);
    setUser(currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        user: user,
        teachingClass: teachingClass,
        enrolledClass: enrolledClass,
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
