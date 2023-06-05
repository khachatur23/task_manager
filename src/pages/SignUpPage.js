import "../styles/SignUpPage.css";
import SignUpFormComponent from "../components/signUpFormComponent";
import MainHeader from "../components/mainHeader";
function SignUpPage() {
  return (
    <div className="signup-page-container">
      <MainHeader />
      <SignUpFormComponent />
    </div>
  );
}

export default SignUpPage;
