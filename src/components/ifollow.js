import React, { useEffect } from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompanies,
  getUserFollowedComp,
} from "../redux/slices/dataSlice"; 
import { FaArrowRightLong } from "react-icons/fa6";

import { verifyToken } from "../utils/utlis";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ifollow.scss"
import "../styles/home.scss"
import Footer from "./footer";
import Navigationpanel from "./navigationpanel";
function Ifollow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.User.value.companyData)
  // const getJobDetails = useSelector((state) => state.User.value.getJobDetails);
  const followedCompanies = useSelector((state) => state.User.value.followedCompanies);

  useEffect(() => {
    dispatch(getAllCompanies());
    dispatch(getUserFollowedComp({ userId: localStorage.getItem("userId") }));
  }, []);

  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (!verifyToken(email,userId,token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);
  return (
    <div>
      <Header />
      <div className="container ">
        <div className="ifollow" > <h2>i-Follow</h2></div>
        <div className="ifolowinp">
          <input className="inp" type="text" />
        </div>
        <div className="followed"><h2>Companies Followed</h2></div>

        <div className="followcomp container ">
          {
            followedCompanies && followedCompanies.map((e) => {
              return (
                <div className="card-browse shadow border container " >
                  <div className="card-pic card-profile pt-3 p-2">
                    <p className="random"
                     style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)}}>{e.value.company_name.slice(0, 2).toUpperCase()}</p>
                  </div>
                  <div className="compname"><b>{e.value.company_name}</b></div>
                  <div className="comploc">{e.value.location}</div>
                  <div className="viewcomp">
                    <Link to={"/viewCompany/" + e.value._id}  className="link">
                      View Company<FaArrowRightLong />
                    </Link>
                  </div>
                </div>

              )
            })
          }
        </div>
        <div className="browse"><h2>Browse Companies</h2></div>
        <div  className="followcomp container ">
          {
            companyData && companyData.map((e) => {
              return (
                <div className="card-browse shadow border container" >
                  <div >
                    <p  className = "random"  
                      style={{ backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16)}}>
                      {e?.company_name.slice(0, 2).toUpperCase()}</p>
                  </div>

                  <div className="loc">
                  <div className="compname"><b>{e?.company_name}</b></div>
                  <div className="comploc">{e?.location}</div>
                  </div>

                  <div className="viewcomp">
                    <Link to={"/viewCompany/" + e?._id} className="link">
                      View Company<FaArrowRightLong />
                    </Link>
                  </div>
                </div>

              )
            })
          }
        </div>
      </div>

      <Footer/>
      <Navigationpanel/>
            </div>
  );
}

export default Ifollow;



