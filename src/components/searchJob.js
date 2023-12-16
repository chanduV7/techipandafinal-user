import React, { useState } from 'react'
import {BsArrowRight} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
function SearchJob() {
  const SearchJob = useSelector((state) => state.User.value.getSearchJob);

  const[on,setOn]=useState(false);
  return (
    <div>

         <div className="homePage-cards-container container">
        {SearchJob &&
          SearchJob.map((e) => {
            return (
              <div className="card-container bg-white">
                <div className="card-container-01">
                  <div>
                    <h5 >{e.title}</h5>
                    <h5 className="text-secondary " >{e.company_name}</h5>
                    <div>
                      <label className="h6">Role :</label>
                      <span>{e.role}</span>
                    </div>
                    <div>
                      <label className="h6">Functional Area : </label>
                      <span>{e.functionalarea}</span>
                    </div>
                    <div>
                      <label className="h6">States/Cities :</label>
                      <span>{e.States}</span>
                    </div>
                    <div>
                      <label className="h6">Employment Type :</label>
                      <span>{e.employmenttype}</span>
                    </div>
                  </div>
                 
                </div>
                <div>
                  <label className="h6">Skills :</label>
                  <div className="d-flex" style={{ columnGap: "0.1em" }}>
                    {e.skills &&
                      e.skills.split(",").map((i) => {
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
                <div className="d-flex gap-1 ">
                <div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "0 0.2rem 0 0.3rem",
                      }}
                      className=" text-success border border-success rounded-pill"
                    >
                      HIRING
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "0 0.2rem 0 0.2rem",
                      }}
                      className="bg-secondary text-white rounded-pill"
                    >
                      {e.experience}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "0 0.2rem 0 0.2rem",
                      }}
                    >
                      {e.salary && e.salary == "" ? (
                        <span className="bg-white"></span>
                      ) : (
                        <span className="bg-secondary text-white rounded-pill">
                          {" "}
                          {e.salary}
                        </span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "0 0.2rem 0 0.2rem",
                      }}
                      className="bg-secondary text-white rounded-pill"
                    >
                      {e.openings}
                    </span>
                  </div>
                </div>
                <div className="card-profile">
                    <p style={{ backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16) ,color:'white'}}>{e.company_name.slice(0, 2).toUpperCase()}</p>
                  </div>
                 <Link to={"/viewJOb/" + e._id}> <div className="viewjob">View Job <BsArrowRight/></div></Link>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default SearchJob