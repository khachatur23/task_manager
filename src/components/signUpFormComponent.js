import { useState } from "react";
import {
  CLEAR_NEW_USER,
  SET_NEW_USER,
  SET_SHOW_AVATAR_MODAL,
  SET_USER_EDIT_FORM,
  SET_USER_LOGED,
  SET_USER_TO_SHOW_INFO,
  SIGNUP_INPUT_CHANGE,
} from "../store/actionsTypes";
import { useDispatch } from "react-redux";
import "../styles/SignUpPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import AvatarSelectComponent from "./avatarSelectComponent";

function SignUpFormComponent() {
  const isLoged = useSelector((state) => state.users.isLoged);
  const logedUser = useSelector((state) => state.users.logedUser);
  const newUser = useSelector((state) => state.users.newUser);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const showAvatarModal = useSelector((state) => state.users.showAvatarModal);
  const [emailError, setEmailError] = useState(false);
  const [passwordReplyError, setPasswordReplyError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [sameEmailError, setSameEmailError] = useState(false);

  const navigate = useNavigate();
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (users > 0 && users.some((user) => user.email === newUser.email)) {
      setSameEmailError(true);
    } else if (
      !nameError &&
      !lastnameError &&
      !emailError &&
      !passwordError &&
      !passwordReplyError
    ) {
      setSameEmailError(false);
      dispatch({ type: SET_NEW_USER, payload: newUser });
      if (isLoged) {
        dispatch({ type: SET_USER_LOGED, payload: newUser });
        dispatch({ type: SET_USER_EDIT_FORM, payload: false });
        dispatch({
          type: SET_USER_TO_SHOW_INFO,
          payload: null,
        });
        navigate("/");
      } else {
        dispatch({
          type: SET_USER_TO_SHOW_INFO,
          payload: null,
        });
        navigate("/login");
      }
      dispatch({
        type: SET_USER_EDIT_FORM,
        payload: false,
      });
    }
  };

  const handleCancelSignOn = () => {
    const newUserToClean = {
      email: "",
      password: "",
      name: "",
      lastname: "",
      avatar: "avatar24.jpg",
    };
    if (isLoged) {
      dispatch({
        type: SET_USER_EDIT_FORM,
        payload: false,
      });
      dispatch({ type: CLEAR_NEW_USER, payload: logedUser });
      dispatch({
        type: SET_USER_TO_SHOW_INFO,
        payload: null,
      });
      navigate("/");
    } else {
      navigate("/login");
      dispatch({
        type: SET_USER_TO_SHOW_INFO,
        payload: null,
      });
      dispatch({ type: CLEAR_NEW_USER, payload: newUserToClean });
    }
  };

  const handleShowAvatarModal = (value) => {
    dispatch({
      type: SET_SHOW_AVATAR_MODAL,
      payload: value,
    });
  };

  const handleSignupInputChange = (e) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    const { name, value } = e.target;

    if (name === "name") {
      if (!nameRegex.test(value)) {
        setNameError(true);
      } else {
        const inputSignupData = {
          signUpValue: value,
          signUpName: name,
        };
        setNameError(false);
        dispatch({ type: SIGNUP_INPUT_CHANGE, payload: inputSignupData });
      }
    } else if (name === "lastname") {
      if (!nameRegex.test(value)) {
        setLastnameError(true);
      } else {
        const inputSignupData = {
          signUpValue: value,
          signUpName: name,
        };
        setLastnameError(false);
        dispatch({ type: SIGNUP_INPUT_CHANGE, payload: inputSignupData });
      }
    } else if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailError(true);
      } else {
        const inputSignupData = {
          signUpValue: value,
          signUpName: name,
        };
        setEmailError(false);
        dispatch({ type: SIGNUP_INPUT_CHANGE, payload: inputSignupData });
      }
    } else if (name === "password") {
      if (!passwordRegex.test(value)) {
        setPasswordError(true);
      } else {
        const inputSignupData = {
          signUpValue: value,
          signUpName: name,
        };
        setPasswordError(false);
        dispatch({ type: SIGNUP_INPUT_CHANGE, payload: inputSignupData });
      }
    } else if (name === "passwordReply") {
      if (value !== newUser.password) {
        setPasswordReplyError(true);
      } else {
        const inputSignupData = {
          signUpValue: value,
          signUpName: name,
        };
        setPasswordReplyError(false);
        dispatch({ type: SIGNUP_INPUT_CHANGE, payload: inputSignupData });
      }
    }
  };

  return (
    <div className="signup-form">
      {showAvatarModal && <AvatarSelectComponent />}
      <form onSubmit={handleSignupSubmit}>
        <div className="form-table">
          <h1 className="signup-title">
            <FontAwesomeIcon icon={faListCheck} /> ToDo List
          </h1>
          <div className="avatar-row">
            <img
              src={require("../avatars/" + newUser.avatar)}
              alt="avatar"
              className="header-avatar"
            />
            <div
              className="avatar-change-button"
              onClick={() => handleShowAvatarModal(true)}
            >
              Change avatar
            </div>
          </div>

          <div className="signup-form-row">
            <div>
              <input
                defaultValue={newUser.name}
                placeholder="Name"
                id="name-inp"
                type="text"
                name="name"
                className="signup-form-name-inp"
                onChange={handleSignupInputChange}
                required
              />
            </div>
            <div>
              <input
                defaultValue={newUser.lastname}
                placeholder="Lastname"
                id="lastname-inp"
                type="text"
                name="lastname"
                className="signup-form-name-inp"
                onChange={handleSignupInputChange}
                required
              />
            </div>
          </div>
          <div className="name-err-container">
            <div className="name-err-div">
              {nameError ? (
                <p className="err-msg">
                  *The name must be written in English and start with a capital
                  letter.
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="name-err-div">
              {lastnameError ? (
                <p className="err-msg">
                  *The lastname must be written in English and start with a
                  capital letter.
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="signup-form-row">
            <div>
              <input
                defaultValue={newUser.email}
                placeholder="E-mail"
                id="email-inp"
                type="text"
                name="email"
                className="signup-form-inp"
                onChange={handleSignupInputChange}
                required
              />
            </div>
          </div>
          <div className="err-div">
            {emailError ? (
              <p className="err-msg">
                *Check for the @ symbol and a top-level domain (TLD) of two or
                more letters.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="signup-form-row">
            <div>
              <input
                defaultValue={newUser.password}
                placeholder="Password"
                id="password-inp"
                name="password"
                type="password"
                className="signup-form-inp"
                onChange={handleSignupInputChange}
                required
              />
            </div>
          </div>
          <div className="err-div">
            {passwordError ? (
              <p className="err-msg">
                *Password must contain at least 8 characters, at least one
                uppercase and lowercase letter and at least one number.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="signup-form-row">
            <div>
              <input
                defaultValue={newUser.passwordReply}
                placeholder="Reply password"
                id="password-reply-inp"
                name="passwordReply"
                type="password"
                className="signup-form-inp"
                onChange={handleSignupInputChange}
                required
              />
            </div>
          </div>
          <div className="err-div">
            {passwordReplyError ? (
              <p className="err-msg">
                *Repeat the previously entered password.
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="submit-btn-box">
          <button type="submit" className="sign-up-submit-btn">
            Save
          </button>
          <button
            className="sign-up-submit-btn"
            onClick={() => handleCancelSignOn()}
          >
            Cancel
          </button>
          {sameEmailError ? (
            <p className="same-email-err-msg">
              *This email is already in use, if you are already registered you
              can{" "}
              <Link to={"/login"} className="same-email-err-msg">
                log in
              </Link>
              .
            </p>
          ) : (
            " "
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUpFormComponent;
