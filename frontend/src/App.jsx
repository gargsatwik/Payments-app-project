import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Sendmoney from "./pages/Sendmoney";

// const Signin = React.lazy(() => import("./pages/Signin"));
// const Signup = React.lazy(() => import("./pages/Signup"));
// const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// const Sendmoney = React.lazy(() => import("./pages/Sendmoney"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signup />} path="/signup"></Route>
        <Route element={<Signin />} path="/signin"></Route>
        <Route element={<Dashboard />} path="/dashboard"></Route>
        <Route element={<Sendmoney />} path="/send"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
