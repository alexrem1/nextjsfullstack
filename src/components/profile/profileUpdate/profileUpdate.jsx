"use client";
import updateUserProfile from "@/app/actions/updateUserProfile/updateUserProfile";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import styles from "./profileUpdateDetails.module.css";
import { updateDetailsSchema } from "@/lib/schemas/updateDetailsSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";
function ProfileUpdate({ userInfo }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState([]);
  const [success, setSuccess] = useState();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateDetailsSchema),
  });
  async function onSubmit(data) {
    setServerError([]);
    // Clear any previous server error
    const response = await updateUserProfile(userInfo.userId, data);

    if (!response.success) {
      if (response.error) {
        // Handle server validation errors
        setServerError([response.error]);
      } else {
        // Handle duplicate email error
        setServerError([response.message]);
      }
    } else {
      router.push("/account");
      setSuccess(response.message);
    }
  }
  return (
    <div className={styles.container}>
      <h1>Update Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputDiv}>
          <label>Name</label>
          <input type="text" disabled={true} defaultValue={userInfo.name} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={styles.inputDiv}>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            defaultValue={userInfo.email}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={styles.inputDiv}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? <Eye /> : <EyeOff />}
          </span>
          <p>
            {errors.password
              ? errors.password.message
              : " Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"}
          </p>
        </div>
        <div className={styles.inputDiv}>
          <label>Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
          />
          <span onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <Eye /> : <EyeOff />}
          </span>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button disabled={isSubmitting} type="submit">
          {success
            ? "Details updated "
            : isSubmitting
            ? "Updating details..."
            : "Update details"}
        </button>
        {serverError.length > 0 && (
          <div className={styles.warningMessage}>
            <span className={styles.warningIcon}>
              <AlertTriangle />
            </span>
            {serverError.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
      <p className={styles.registerPrompt}>
        <Link href="/account" className={styles.registerLink}>
          Back
        </Link>
      </p>
    </div>
  );
}
export default ProfileUpdate;
