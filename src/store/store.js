import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  token: "",
  id: "",
  name: "",
  avatarUrl: "",
  onLogout: () => {},
  onLogin: (data) => {},
});

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserLoggedInInformation =
      localStorage.getItem("isAuthenticated");
    if (storedUserLoggedInInformation === "1") {
      setIsAuthenticated(true);
      const storedUserTokenInformation = localStorage.getItem("token");
      const storedUserIdInformation = localStorage.getItem("id");
      const storedUserNameInformation = localStorage.getItem("name");
      const storedUserAvatarInformation = localStorage.getItem("avatarUrl");
      const currentUser = {
        token: storedUserTokenInformation,
        id: storedUserIdInformation,
        name: storedUserNameInformation,
        avatarUrl: storedUserAvatarInformation,
      };
      setUser(currentUser)
    }
  }, []);

  const logoutHandler = () => {
    // localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("token");
    setUser(null);
  };

  const loginHandler = (data) => {
    localStorage.setItem("isAuthenticated", "1");
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("avatarUrl", data.avatarUrl);
    localStorage.setItem("token", data.token);
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
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
