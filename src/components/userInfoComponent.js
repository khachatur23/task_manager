import {
  SET_LOGOUT,
  SET_TASK_TO_SHOW_INFO,
  SET_USER_EDIT_FORM,
  SET_USER_TO_SHOW_INFO,
} from "../store/actionsTypes";
import { useDispatch } from "react-redux";
import "../styles/userInfoComponent.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function UserInfoComponent(props) {
  const { user } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logedUser = useSelector((state) => state.users.logedUser);

  const handleOpenEditForm = () => {
    navigate("/user");
    dispatch({
      type: SET_USER_EDIT_FORM,
      payload: true,
    });
    dispatch({
      type: SET_USER_TO_SHOW_INFO,
      payload: null,
    });
  };

  const handleCloseUserInfo = () => {
    dispatch({
      type: SET_USER_TO_SHOW_INFO,
      payload: null,
    });
  };

  const handleLogOut = () => {
    dispatch({
      type: SET_USER_TO_SHOW_INFO,
      payload: null,
    });
    dispatch({
      type: SET_LOGOUT,
      payload: false,
    });
    dispatch({
      type: SET_TASK_TO_SHOW_INFO,
      payload: null,
    });

    navigate("/");
  };
  return (
    <div className="user-info-form">
      <div className="user-info-close-box">
        <button
          onClick={() => handleCloseUserInfo()}
          className="user-info-close-btn"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="user-info-form-table">
        <div className="user-info-avatar-row">
          <div>
            <img
              src={require("../avatars/" + user.avatar)}
              alt="avatar"
              className="user-info-avatar"
            />
          </div>
        </div>
        <div className="user-info-form-row">
          <div>Name: </div>
          <div>{user.name}</div>
        </div>

        <div className="user-info-form-row">
          <div>Last name: </div>
          <div>{user.lastname}</div>
        </div>

        <div className="user-info-form-row">
          <div>E-mail: </div>
          <div>{user.email}</div>
        </div>
      </div>
      {logedUser.id === user.id && (
        <div className="user-info-btn-box">
          <button
            className="info-edit-logout-btn"
            onClick={() => handleOpenEditForm()}
          >
            Edit
          </button>
          <button
            className="info-edit-logout-btn"
            onClick={() => handleLogOut()}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserInfoComponent;
