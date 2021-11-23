import React from "react";
import "./index.css";
// import "./assets/css/index.scss"
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { ClassList } from './components/Class/ClassList';
// import { Nav } from './components/Layout/Nav';
// import { Header } from './components/Form/Add';
import { AuthContextProvider } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { AppApp } from "./AppApp";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <React.StrictMode>
          <AppApp></AppApp>
        </React.StrictMode>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export { App };
