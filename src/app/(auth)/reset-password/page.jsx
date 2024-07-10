"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/lib/schemas/resetPasswordSchema";
import resetPassword from "@/app/actions/resetPassword/resetPassword";
import { AlertTriangle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import useCountdownRedirect from "@/lib/useContext/useCountdownRedirect";

function ResetPassword({ searchParams }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState([]);
  const [success, setSuccess] = useState();
  const { redirectCountdown } = useCountdownRedirect(success, 5, "/login");

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
    resolver: yupResolver(resetPasswordSchema),
  });

  async function onSubmit(data) {
    setServerError([]);
    setSuccess();
    // Clear any previous server error
    const response = await resetPassword(data, searchParams.token);

    if (response) {
      if (response.success) {
        setSuccess(true);
      } else {
        setServerError([response.error]);
      }
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? null : "Reset Password"}</h1>

      {success ? (
        <div className={styles.success}>
          <span className={styles.successIcon}>
            <CheckCircle2 />
          </span>
          <p>
            Your password has been reset. Redirecting to login page in{" "}
            {redirectCountdown} seconds...
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>

            <button disabled={isSubmitting} type="submit">
              {success
                ? "Password Reset"
                : isSubmitting
                ? "Resetting Password..."
                : "Reset Password"}
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
        </>
      )}
    </div>
  );
}
export default ResetPassword;
