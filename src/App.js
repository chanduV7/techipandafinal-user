import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/register";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import Login from "./components/login";

import ViewJob from "./components/viewJob";
import Front from "./components/frontPage";
import Ifollow from "./components/ifollow";
import ViewCompany from "./components/viewCompany";
import SavedJobs from "./components/savedJobs";
import SearchJob from "./components/searchJob";
import Profile from "./components/profile";
import SearchSkill from "./components/searchSkill";

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Front/>
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/viewJob/:jobId",
      element: <ViewJob />,
    },
    {
      path : "/ifollow",
      element: <Ifollow/>
    },
    {
      path : "viewCompany/:cid",
      element: <ViewCompany/>
    },
    {
      path : "savedJobs/:userId",
      element: <SavedJobs/>
    },
    {
      path:'searchJob',
      element:<SearchJob/>
    },
    {
      path: "/profile/:userId",
      element : <Profile/>
    },{
      path: "/searchSkill/:skill",
      element : <SearchSkill/>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
