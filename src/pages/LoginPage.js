import { LOGIN_INPUT_CHANGE, SET_USER_LOGED } from "../store/actionsTypes";
import { useDispatch } from "react-redux";
import "../styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import MainHeader from "../components/mainHeader";

function LoginPage() {
  const navigate = useNavigate();
  const [wrongLoginMessage, setWrongLoginMessage] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loginUser = useSelector((state) => state.users.loginUser);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const inputLoginData = {
        value: value,
        name: name,
      };
      dispatch({ type: LOGIN_INPUT_CHANGE, payload: inputLoginData });
    }

    if (name === "password") {
      const inputLoginData = {
        value: value,
        name: name,
      };
      dispatch({ type: LOGIN_INPUT_CHANGE, payload: inputLoginData });
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const email = loginUser.email;
    const password = loginUser.password;
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setWrongLoginMessage(false);
      navigate("/");
      dispatch({ type: SET_USER_LOGED, payload: user });
    } else {
      setWrongLoginMessage(true);
    }
  };

  return (
    <div className="login-container">
      <MainHeader />
      <div className="login-form">
        <h1 className="login-title">
          <FontAwesomeIcon icon={faListCheck} /> ToDo List
        </h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="login-form-row">
            <input
              placeholder="E-mail"
              id="email-inp"
              type="text"
              name="email"
              className="login-form-inp"
              onChange={handleLoginInputChange}
              required
            />
          </div>

          <div className="login-form-row">
            <input
              placeholder="Password"
              id="password-inp"
              name="password"
              type="password"
              className="login-form-inp"
              onChange={handleLoginInputChange}
              required
            />
          </div>
          <div className="wrong-login-massage">
            {wrongLoginMessage ? <p>*Incorrect e-mail and/or password</p> : ""}
          </div>

          <div className="add-delete-box">
            <button type="submit" className="login-submit-btn">
              Log In
            </button>
          </div>
        </form>
        <p className="link-to-signup">
          No account yet?{" "}
          <Link to="/signup" className="link-to-signup">
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
