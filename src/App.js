import React from "react";
import "./index.css";
// import "./assets/css/index.scss"
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { ClassList } from './components/Class/ClassList';
// import { Nav } from './components/Layout/Nav';
// import { Header } from './components/Form/Add';
import Routes from "./routes/routes";
import { AuthContextProvider } from "./store/store";

function App() {
  return (
    //   <Router>
    //   <Nav/>
    //   <Switch>
    //     <Route exact path="/" component={ClassList} />
    //     <Route exact path="/add" component={Header} />
    //   </Switch>
    // </Router>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
export { App };
