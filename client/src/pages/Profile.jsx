import Image from "../components/profile/Image";
import UserData from "../components/profile/UserData";
import PasswordChange from "../components/profile/PasswordChangeForm";
import Container from "../components/profile/Container";
function Profile() {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    width: "100%",
  };
  return (
    <>
      <Container>
        <Image />
        <div style={style}>
          <UserData />
          <PasswordChange />
        </div>
      </Container>
    </>
  );
}

export default Profile;
