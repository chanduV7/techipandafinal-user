import { useEffect, useState } from "react";
import "../styles/home.scss";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllJobs } from "../redux/slices/dataSlice";
import Header from "./header";
import Footer from "./footer";
import Navigationpanel from "./navigationpanel";

export default function Home() {

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState({});
  const jobData = useSelector((state) => state.User.value.jobData);
  const [filtJobs, setFiltJobs] = useState([]);
  const searchState = useSelector((state) => state.User.value.searchOn);
  const [on, setOn] = useState(false)
  const getSearchJob = useSelector((state) => state.User.value.getSearchJob);
  const navigate = useNavigate();
console.log(searchState,"searchState");
  const filter = () => {
    const temp = jobData.map((e) => e.role.trim());
    const temp1 = new Set(temp);

    setRoles({ rolesArr: Array.from(temp1) });
    
  };
  useEffect(() => {
    dispatch(getAllJobs());
   
    if (!token) {
      navigate("/login");
      window.location.reload();
    }
  }, [token]);

  useEffect(()=> {
    
       setOn(searchState)
     
  },[searchState])
 
  return (
    <div className="" style={{ backgroundColor: "rgb(243,243,243)" }}>
      <Header />
      <div className=" filter " onClick={filter}>
        <div className="filter-select ">
          <div>Sort by :</div>
          <div>
            <select
              onChange={(e) => {
                if (e.target.value == "All") {
                  setFiltJobs(jobData.map((i) => i));
                  setOpen(true);
                } else {
                  setFiltJobs(jobData.filter((i) => i.role == e.target.value));
                  setOpen(true);
                }
              }}
            >
              <option value={"All"}>All</option>
              {roles.rolesArr &&
                roles.rolesArr.map((e) => {
                  return <option value={e}>{e}</option>;
                })}
            </select>
          </div>
        </div>
      </div>
      {
        on?
        <div className="card-container container">
          {getSearchJob &&
            getSearchJob.map((e) => {
              return (
                <div className="card shadow border container ">
                  <div>
                    <div className="card-1">
                      <div>
                        <h5 className="title">{e.title}</h5>
                        <h5 className=" h5 text-secondary">{e.company_name}</h5>
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

                      <div>
                        <label className="h6">Skills :</label>
                        <div className="skills" style={{ columnGap: "0.1em" }}>
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
                    </div>
                  </div>
                  <div>
                    <div className="card-2">
                      <p
                        className="random"
                        style={{
                          backgroundColor:
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                          color: "white",
                        }}
                      >
                        {e.company_name.slice(0, 2).toUpperCase()}
                      </p>

                      <Link to={"/viewJOb/" + e._id}>
                        {" "}
                        <div className="viewjob">
                          View Job <BsArrowRight />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
         :
         open ? (
        <div className="card-container container">
          {filtJobs &&
            filtJobs.map((e) => {
              return (
                <div className="card shadow border container ">
                  <div>
                    <div className="card-1">
                      <div>
                        <h5 className="title">{e.title}</h5>
                        <h5 className=" h5 text-secondary">{e.company_name}</h5>
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

                      <div>
                        <label className="h6">Skills :</label>
                        <div className="skills" style={{ columnGap: "0.1em" }}>
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
                    </div>
                  </div>
                  <div>
                    <div className="card-2">
                      <p
                        className="random"
                        style={{
                          backgroundColor:
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                          color: "white",
                        }}
                      >
                        {e.company_name.slice(0, 2).toUpperCase()}
                      </p>

                      <Link to={"/viewJOb/" + e._id}>
                        {" "}
                        <div className="viewjob">
                          View Job <BsArrowRight />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="card-container  container">
          {jobData &&
            jobData.map((e) => {
              return (
                <div className="card shadow border container ">
                  <div>
                    <div className="card-1">
                      <div>
                        <h5 className="title">{e.title}</h5>
                        <h5 className=" h5 text-secondary">{e.company_name}</h5>
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

                      <div>
                        <label className="h6">Skills :</label>
                        <div
                          className="skills container"
                          style={{ columnGap: "0.1em" }}
                        >
                          {e.skills &&
                            e.skills.split(",").map((i) => {
                              return (
                                <div>
                                  <span className="skills-text bg-secondary">
                                    {i}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className="d-flex gap-1 container   ">
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
                    </div>
                  </div>
                  <div>
                    <div className="card-2">
                      <p
                        className="random"
                        style={{
                          backgroundColor:
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                          color: "white",
                        }}
                      >
                        {e.company_name.slice(0, 2).toUpperCase()}
                      </p>

                      <Link to={"/viewJOb/" + e._id}>
                        {" "}
                        <div className="viewjob">
                          View Job <BsArrowRight />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )
      }
    

     <Footer/>
     <Navigationpanel/>
    </div>
  );
}
