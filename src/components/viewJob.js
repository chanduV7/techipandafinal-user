import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useMatches, useNavigate,Link } from "react-router-dom";
import { getJob , saveJob } from "../redux/slices/dataSlice";
import {BsInstagram} from "react-icons/bs"
import { FaArrowRightLong } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import Header from "./header";
import { BsBookmark } from "react-icons/bs";
import { verifyToken } from "../utils/utlis";
import "../styles/viewJob.scss";
import Footer from "./footer";
import Navigationpanel from "./navigationpanel";

function ViewJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const userId = localStorage.getItem("userId")


  const getJobDetails = useSelector((state) => state.User.value.getJobDetails);
  const params = useMatches();
  
  const handleSaveJob = () => {
    dispatch(saveJob({ jobId: params[0].params.jobId }))
  }
  useEffect(() => {
    dispatch(getJob({ jobId: params[0].params.jobId }));
  }, []);


  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (!verifyToken(email,userId,token)) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);
  return (
    <div className="job-container w-100%" 
    style={{backgroundColor:'rgb(243,243,243)'}}
    >
      <Header />
      <div className="viewhome container "  >
          <div>
            Home / JobId : {getJobDetails._id && getJobDetails._id.slice(0,3)}
          </div>
          <div style={{ cursor: "pointer" }}>
            <BsBookmark />{" "}
            <span onClick={handleSaveJob}className="text-decoration-underline">
                    Save Job
                    </span>
          </div>
        </div>
        <div className="h2 container ">{getJobDetails.title}</div>
        <div className="">
          <div className="hiring-div container">
            <div
              className=" hirings"
            >
              HIRING
            </div>
            <div
              
              className="openings"
            >
              {getJobDetails.openings}
            </div>
          
          <div
            style={{ cursor: "pointer" }}
            className=" container sharejob"
          >
            SHARE JOB
          </div>
        </div>
        </div>
      
        <hr className="container"/>
      <div className="data">
       
        {/* diplay job details */}
        <div className=" viewjobsDetails-main  shadow border container w-90% ">
        <div className=" viewjobsDetails container">
          <div className="viewjobsDetails-1">
            <div>
              <label>ROLE</label>
              <p>{getJobDetails && getJobDetails.role}</p>
            </div>
            <div>
              <label>FUNCTIONAL AREA</label>
              <p>{getJobDetails && getJobDetails.functionalarea}</p>
            </div>
            <div>
              <label>STATES/CITIES</label>
              <p>{getJobDetails && getJobDetails.States}</p>
            </div>
            <div>
              <label>OPENINGS</label>
              <p>{getJobDetails && getJobDetails.openings}</p>
            </div>
            <div>
              <label>SALARY</label>
              <p>{getJobDetails && getJobDetails.salary}</p>
            </div>
          </div>
          <div className="viewjobsDetails-2">
            <div>
              <label>SKILLS</label>
              <div >
                {getJobDetails.skills &&
                  getJobDetails.skills.split(",").map((i) => {
                    return (
                      <div>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            padding: "0 0.2rem 0 0.2rem",
                          }}
                          className="bg-secondary text-white rounded-pill"
                        >
                          {i}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <label>JOB TYPE</label>
              <p>{getJobDetails && getJobDetails.employmenttype}</p>
            </div>
          </div>
        </div>
        <div className="description">
            <label>JOB DESCRIPTION</label>
            <p>{getJobDetails && getJobDetails.description}</p>

            <div className="responsibilities">
                      <label>Responsibilities :</label>
              <p>{getJobDetails && getJobDetails.responsibilities}</p>
  
            </div>
            </div>  
        <div className="h6">
          Location : {getJobDetails && getJobDetails.States}
        </div>
      </div>

     
      </div>
      
        <div> <div className="aboutcomp container ">About Company</div></div>
        <div className="container">
        <div className="  card-company shadow border ">
         <div className="randoms" >
             <p   style={{backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16), width:"3em", height:"3em", borderRadius:"50%",
              display:"flex",alignItems:"center", justifyContent:"center", marginLeft:"1em", position:"absolute", top:"0.8em"
            }}>
            {getJobDetails.company_name &&
              getJobDetails.company_name.slice(0, 2).toUpperCase()}
          </p>
         </div>
          <div className="locationcomp container">
            <div>
            {
              <div>{getJobDetails && getJobDetails.company_name}</div>
            }
            </div>
            <div>
            {
              <div>{getJobDetails && getJobDetails.States}</div>
              }
              
              </div> 

              <div className="container">
            {
              
              <div className="abt"> {getJobDetails && getJobDetails.about}</div>
            }
            </div>
          </div>
          <div className="view">
            <span >View Company <FaArrowRightLong /></span>
          </div>
        </div>
      </div>

      <div className="container verify ">
         <button onClick={() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
         }}  className="btn-verify">Verify Account to Apply</button>
      </div>

         {/* ///footer// */}

     

       <Footer/>
       <Navigationpanel/>
    </div>
  );
}

export default ViewJob;
