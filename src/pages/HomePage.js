import { useSelector, useDispatch } from "react-redux";
import "../styles/HomePage.css";
import { SET_STATUS_DND, SET_TASK_EXPIRED } from "../store/actionsTypes";
import { DragDropContext } from "react-beautiful-dnd";
import Modal from "../components/modal";
import TasksByStatus from "../components/tasksByStatus";
import MainHeader from "../components/mainHeader";
import InfoDesk from "../components/infoDesk";
import UserInfoComponent from "../components/userInfoComponent";

function HomePage() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.tasks.showModal);

  const userToShowInfo = useSelector((state) => state.users.userToShowInfo);
  setInterval(() => {
    dispatch({
      type: SET_TASK_EXPIRED,
    });
  }, 1000);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newStatusObj = {
      newStatus: result.destination.droppableId,
      dndId: result.draggableId,
    };
    dispatch({
      type: SET_STATUS_DND,
      payload: newStatusObj,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container">
        {userToShowInfo && <UserInfoComponent user={userToShowInfo} />}
        {showModal && <Modal />}
        <MainHeader />
        <div className="home-page-main-container">
          <TasksByStatus />
          <InfoDesk />
        </div>
        <div className="footer"></div>
      </div>
    </DragDropContext>
  );
}

export default HomePage;

