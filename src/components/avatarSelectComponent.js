import { useDispatch } from "react-redux";
import {
  SET_SHOW_AVATAR_MODAL,
  SIGNUP_INPUT_CHANGE,
} from "../store/actionsTypes";
import "../styles/avatarSelectComponent.css";
import { useSelector } from "react-redux";

function AvatarSelectComponent() {
  const dispatch = useDispatch();
  const avatars = useSelector((state) => state.users.avatars);

  const cancelAvatarModal = () => {
    dispatch({
      type: SET_SHOW_AVATAR_MODAL,
      payload: false,
    });
  };
  const handleAvatarSelect = (avatar) => {
    const inputSignupData = {
      signUpValue: avatar.name,
      signUpName: "avatar",
    };
    dispatch({ type: SIGNUP_INPUT_CHANGE, payload: inputSignupData });
    cancelAvatarModal();
  };
  return (
    <div className="avatar-select-container-modal">
      <div
        className="avatar-select-modal-overlay"
        onClick={() => cancelAvatarModal()}
      ></div>
      <div className="avatar-select-modal-form">
        {avatars.map((avatar) => (
          <div key={avatar.id} className="avatar-select-list-div">
            <img
              src={require("../avatars/" + avatar.name)}
              alt="avatar"
              className="avatar-select-list"
              onClick={() => handleAvatarSelect(avatar)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvatarSelectComponent;
