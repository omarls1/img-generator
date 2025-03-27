import { useState } from "react";
import FormGroup from "../auth/FormGroup";
import styles from "./UserData.module.css";
import { useAuth } from "../../context/AuthContext";

function UserData() {
  const { user, updateUser, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  return (
    <div className={styles.userDataContainer}>
      <h2>Change Your Profile Information</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
        dignissimos itaque facilis.
      </p>

      <form onSubmit={handleSubmit}>
        <FormGroup
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Your Name"
        />
        <FormGroup
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Your Email"
        />
        <FormGroup
          type="aria"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          label="Your Bio"
          required={false}
        />
        <button disabled={isLoading} className="btn actionButton" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UserData;
