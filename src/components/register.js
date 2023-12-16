import { useNavigate } from "react-router-dom";
import "../styles/register.scss"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../redux/slices/dataSlice";
export default function Register() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();
  console.log(date);
  const OnHandleClick1 = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      window.alert("Password and Confirm Password are not same");
    } else {
      dispatch(RegisterUser({ ...formData, timedate: date }));
      window.alert("Successfully Registered");
    }
  };

  return (
    <div className="register-container-main">
      <div className="register-container">
        <div className="left">
          <div className="wallpaper">
            <img src="https://res.cloudinary.com/cliqtick/image/upload/v1684308943/create_user_ryynll.jpg" />
          </div>
        </div>

        <div className="right">
          <div className="right-upper">
            <div className="blacircle"></div>
            <div className="oraline"></div>
            <div className="oracircle"></div>
          </div>
          <div className="logo-container">
            <div className="logo">
              <img src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png" />
            </div>
          </div>
          <div className="register">
            <div className="input-container">
              <input
                className="invalu"
                id="exampleDatetime"
                name="username"
                placeholder="User Name"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              ></input>
            </div>

            <div className="input-container">
              <input
                id="Email"
                className="invalu"
                name="email"
                placeholder="Email "
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              ></input>
            </div>

            <div className="input-container">
              <input
                id="exampleNumber"
                className="invalu"
                name="number"
                placeholder="Phone"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, mobilenumber: e.target.value })
                }
              ></input>
            </div>

            <div className="input-container">
              <input
                id="Password"
                className="invalu"
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              ></input>
            </div>

            <div className="input-container">
              <input
                id="examplePassword"
                className="invalu"
                name="confirmpassword"
                placeholder="Confirm password"
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, confirmpassword: e.target.value })
                }
              ></input>
            </div>
          </div>

          <div className="AlreadyRegis" onClick={OnHandleClick1}>
            <div>Already Registered ? Click me</div>
          </div>
          <div className="register-btn">
            <div>
              <button type="button" onClick={handleClick}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}