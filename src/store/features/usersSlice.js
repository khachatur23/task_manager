import {
  CLEAR_NEW_USER,
  LOGIN_INPUT_CHANGE,
  SET_LOGOUT,
  SET_NEW_USER,
  SET_SHOW_AVATAR_MODAL,
  SET_USER_EDIT_FORM,
  SET_USER_LOGED,
  SET_USER_TO_SHOW_INFO,
  SIGNUP_INPUT_CHANGE,
} from "../actionsTypes";

const LOCAL_STORAGE_USER_KEY = "myUsers";

export const initialUser = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_USER_KEY)
) || {
  users: [
    {
      email: "khachaturakopyan@gmail.com",
      id: 1683878575019,
      lastname: "Akopyan",
      name: "Khachatur",
      password: "Aaaaaaaa1",
      passwordReply: "Aaaaaaaa1",
      avatar: "avatar7.jpg",
      role: "admin",
    },
    {
      email: "khachaturakop@yandex.ru",
      id: 1683878575020,
      lastname: "Jacob",
      name: "Christian",
      password: "Aaaaaaaa1",
      passwordReply: "Aaaaaaaa1",
      avatar: "avatar13.jpg",
      role: "user",
    },
    {
      email: "Shanna@melissa.tv",
      id: 1683878575021,
      lastname: "Howell",
      name: "Ervin",
      password: "Aaaaaaaa1",
      passwordReply: "Aaaaaaaa1",
      avatar: "avatar23.jpg",
      role: "user",
    },
    {
      email: "Nathan@yesenia.net",
      id: 1683878575022,
      lastname: "Bauch",
      name: "Clementine",
      password: "Aaaaaaaa1",
      passwordReply: "Aaaaaaaa1",
      avatar: "avatar1.jpg",
      role: "user",
    },
    {
      email: "Julianne.OConner@kory.org",
      id: 1683878575023,
      lastname: "Lebsack",
      name: "Patricia",
      password: "Aaaaaaaa1",
      passwordReply: "Aaaaaaaa1",
      avatar: "avatar5.jpg",
      role: "user",
    },
    {
      email: "Lucio_Hettinger@annie.ca",
      id: 1683878575024,
      lastname: "Dietrich",
      name: "Chelsey",
      password: "Aaaaaaaa1",
      passwordReply: "Aaaaaaaa1",
      avatar: "avatar7.jpg",
      role: "user",
    },
  ],
  avatars: [
    { name: "avatar1.jpg", id: 1 },
    { name: "avatar2.jpg", id: 2 },
    { name: "avatar3.jpg", id: 3 },
    { name: "avatar4.jpg", id: 4 },
    { name: "avatar5.jpg", id: 5 },
    { name: "avatar6.jpg", id: 6 },
    { name: "avatar7.jpg", id: 7 },
    { name: "avatar8.jpg", id: 8 },
    { name: "avatar9.jpg", id: 9 },
    { name: "avatar10.jpg", id: 10 },
    { name: "avatar11.jpg", id: 11 },
    { name: "avatar12.jpg", id: 12 },
    { name: "avatar13.jpg", id: 13 },
    { name: "avatar14.jpg", id: 14 },
    { name: "avatar15.jpg", id: 15 },
    { name: "avatar16.jpg", id: 16 },
    { name: "avatar17.jpg", id: 17 },
    { name: "avatar18.jpg", id: 18 },
    { name: "avatar19.jpg", id: 19 },
    { name: "avatar20.jpg", id: 20 },
    { name: "avatar21.jpg", id: 21 },
    { name: "avatar22.jpg", id: 22 },
    { name: "avatar23.jpg", id: 23 },
    { name: "avatar24.jpg", id: 24 },
  ],
  newUser: {
    email: "",
    password: "",
    name: "",
    lastname: "",
    avatar: "avatar24.jpg",
  },
  loginUser: {
    email: "",
    password: "",
  },
  isLoged: false,
  logedUser: null,
  setUserEditForm: false,
  showAvatarModal: false,
  userToShowInfo: null,
};

export function usersReducer(state = initialUser, action) {
  const currentDate = new Date();
  let newState;
  switch (action.type) {
    case SET_USER_TO_SHOW_INFO:
      newState = {
        ...state,
        userToShowInfo: action.payload,
      };
      break;

    case CLEAR_NEW_USER:
      newState = {
        ...state,
        newUser: action.payload,
      };
      break;

    case SET_SHOW_AVATAR_MODAL:
      newState = {
        ...state,
        showAvatarModal: action.payload,
      };
      break;

    case SET_USER_EDIT_FORM:
      newState = {
        ...state,
        setUserEditForm: action.payload,
      };
      break;

    case SET_LOGOUT:
      newState = {
        ...state,
        isLoged: action.payload,

        logedUser: null,
        newUser: {
          email: "",
          password: "",
          name: "",
          lastname: "",
          avatar: "avatar24.jpg",
        },
      };
      break;

    case SET_USER_LOGED:
      newState = {
        ...state,
        isLoged: true,
        logedUser: action.payload,
        newUser: action.payload,
      };
      break;

    case SET_NEW_USER:
      newState = {
        ...state,
        users: [...state.users],
      };

      const userToAdd = action.payload;

      const index = newState.users.findIndex(
        (user) => user.id === userToAdd.id
      );
      if (index === -1) {
        const newUserId = currentDate.getTime();
        userToAdd.id = newUserId;

        newState.users.push(userToAdd);
        newState.newUser = {
          email: "",
          password: "",
          name: "",
          lastname: "",
          avatar: "avatar24.jpg",
        };
      } else {
        newState.users[index] = userToAdd;
        newState.newUser = {
          email: "",
          password: "",
          name: "",
          lastname: "",
          avatar: "avatar24.jpg",
        };
      }

      break;

    case LOGIN_INPUT_CHANGE:
      const { value, name } = action.payload;
      newState = {
        ...state,
        loginUser: {
          ...state.loginUser,
          [name]: value,
        },
      };
      break;

    case SIGNUP_INPUT_CHANGE:
      const { signUpValue, signUpName } = action.payload;
      newState = {
        ...state,
        newUser: {
          ...state.newUser,
          [signUpName]: signUpValue,
        },
      };

      break;

    default:
      newState = state;
  }

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newState));

  return newState;
}
