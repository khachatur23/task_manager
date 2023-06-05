import "../styles/SignUpPage.css";

import MainHeader from "../components/mainHeader";
import SignUpFormComponent from "../components/signUpFormComponent";

function UserPage() {
  return (
    <div className="signup-page-container">
      <MainHeader />
      <SignUpFormComponent />
    </div>
  );
}

export default UserPage;
