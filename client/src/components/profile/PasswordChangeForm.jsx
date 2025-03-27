import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import FormGroup from "../auth/FormGroup";
import styles from "./passwordChange.module.css";

function PasswordChange() {
  const { changePassword, isLoading } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      addToast("New passwords do not match", "error");
      return;
    }
    await changePassword(formData);
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <form className={styles.passwordChangeForm} onSubmit={handleSubmit}>
      <h2>Change Your Password</h2>
      <p>
        Please enter your current password and a new password to update your
        credentials.
      </p>
      <FormGroup
        type="password"
        name="currentPassword"
        label="Current Password"
        value={formData.currentPassword}
        onChange={handleChange}
      />
      <FormGroup
        type="password"
        name="newPassword"
        label="New Password"
        value={formData.newPassword}
        onChange={handleChange}
      />
      <FormGroup
        type="password"
        name="confirmNewPassword"
        label="Confirm New Password"
        value={formData.confirmNewPassword}
        onChange={handleChange}
      />
      <button disabled={isLoading} className="btn actionButton" type="submit">
        Update Password
      </button>
    </form>
  );
}

export default PasswordChange;
