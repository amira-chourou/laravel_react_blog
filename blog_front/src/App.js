import React from "react";
import "./App.css";

import { Route, Switch, BrowserRouter } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Header from "./components/containers/Header";
import "../src/assets/style.css"
import PublicRoute from "./components/hooks/PublicRoute";
import Posts from "./components/posts/Posts";
import PrivateRoute from "./components/hooks/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <React.Suspense>
          <Header/>
          <Switch>
            <PublicRoute restricted={true} component={Login} path="/login" exact/>
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Posts}   />
            {/*<PrivateRoute exact path="/add-post" component={AddPost}   />*/}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
