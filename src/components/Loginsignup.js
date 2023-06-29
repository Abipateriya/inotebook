import React, { useState } from "react";
import "../Style.css";
import { useNavigate } from "react-router-dom";
const Loginsignup = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // let history = useHistory();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    // if (json.success){
    //     // Save the auth token and redirect
    //     localStorage.setItem('token', json.authtoken);
    //     history.push("/");

    // }
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert(" Sucessfully logged in", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [signcredentials, setsigncredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // let history = useHistory();

  const handleSignSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signcredentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    // if (json.success){
    //     // Save the auth token and redirect
    //     localStorage.setItem('token', json.authtoken);
    //     history.push("/");

    // }
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid signcredentials", "danger");
    }
  };

  const onSignChange = (e) => {
    setsigncredentials({ ...signcredentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label for="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-1 pb-3">Log In</h4>
                        <div>
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                value={credentials.email}
                                onChange={onChange}
                                id="email"
                                name="email"
                                aria-describedby="emailHelp"
                              />
                              <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                              </div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                value={credentials.password}
                                onChange={onChange}
                                name="password"
                                id="password"
                              />
                            </div>

                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-3 pb-3">Sign Up</h4>
                        <div className="conatiner">
                          <form onSubmit={handleSignSubmit}>
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                aria-describedby="emailHelp"
                                onSignChange={onSignChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                aria-describedby="emailHelp"
                                onSignChange={onSignChange}
                              />
                              <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                              </div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                onSignChange={onSignChange}
                                minLength={5}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="cpassword" className="form-label">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                name="cpassword"
                                id="cpassword"
                                minLength={5}
                                required
                              />
                            </div>

                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
