import { useSelector, useDispatch } from "react-redux";
import "../styles/MainHeader.css";
import {
  SET_SHOW_MODAL,
  SET_SEARCH_VALUE,
  SET_SELECTED_SORT,
  SET_SELECTED_STATUS,
  SET_USER_TO_SHOW_INFO,
} from "../store/actionsTypes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faPlus,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

function MainHeader() {
  const dispatch = useDispatch();
  const isLoged = useSelector((state) => state.users.isLoged);
  const logedUser = useSelector((state) => state.users.logedUser);
  const selectedSort = useSelector((state) => state.tasks.selectedSort);
  const navigate = useNavigate();
  const location = useLocation();
  const setShowModal = (value) => {
    dispatch({
      type: SET_SHOW_MODAL,
      payload: value,
    });
  };

  const handleOpenUserPage = () => {
    dispatch({
      type: SET_USER_TO_SHOW_INFO,
      payload: logedUser,
    });
  };

  const handleSearch = (e) => {
    dispatch({
      type: SET_SEARCH_VALUE,
      payload: e.target.value,
    });
  };

  const handleSort = (e) => {
    dispatch({
      type: SET_SELECTED_SORT,
      payload: e.target.value,
    });
  };

  const handleGoHomePage = () => {
    if (location.pathname === "/") {
      dispatch({
        type: SET_SELECTED_STATUS,
        payload: "All",
      });
      dispatch({
        type: SET_USER_TO_SHOW_INFO,
        payload: null,
      });
    } else {
      navigate("/");
      dispatch({
        type: SET_USER_TO_SHOW_INFO,
        payload: null,
      });
    }
  };
  return (
    <div className="main-header">
      <div className="header-left-container">
        <h1 className="header-title" onClick={() => handleGoHomePage()}>
          <FontAwesomeIcon icon={faListCheck} /> ToDo List
        </h1>

        {location.pathname === "/" && isLoged && logedUser.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="new-task-btn"
            title="add"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}

        {location.pathname === "/" && (
          <select
            className="status-inp-app"
            name="status"
            defaultValue={selectedSort}
            onChange={handleSort}
          >
            <option value="byPriority">Sort by priority</option>
            <option value="byDateAdded">Sort by date added</option>
            <option value="byDeadlineDate">Sort by deadline date</option>
          </select>
        )}

        {location.pathname === "/" ? (
          <div className="search-box">
            <input
              className="search-input"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        ) : (
          " "
        )}
      </div>
      <div className="header-right-container">
        <div className="login-user">
          {!isLoged ? (
            <Link to="/login" className="login-button" title="Login">
              <FontAwesomeIcon icon={faRightToBracket} />
            </Link>
          ) : (
            <div className="login-button" onClick={() => handleOpenUserPage()}>
              {logedUser.name} {logedUser.lastname}{" "}
              <img
                src={require("../avatars/" + logedUser.avatar)}
                alt="avatar"
                className="header-avatar"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
