"use client";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import signup from "@/app/actions/signup/signup";
import { registrationSchema } from "@/lib/schemas/registrationSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState([]);
  const [success, setSuccess] = useState();
  const [redirectCountdown, setRedirectCountdown] = useState(5); // Initial countdown time

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
    resolver: yupResolver(registrationSchema),
  });

  useEffect(() => {
    // Countdown effect to redirect after success
    let countdownTimer;
    if (success) {
      countdownTimer = setInterval(() => {
        setRedirectCountdown((prevCount) => prevCount - 1);
      }, 1000);

      if (redirectCountdown === 0) {
        router.push("/login");
      }
    }

    // Cleanup timer on component unmount or after redirect
    return () => {
      clearInterval(countdownTimer);
    };
  }, [success, redirectCountdown]);

  async function onSubmit(data) {
    setServerError([]);
    // Clear any previous server error
    const response = await signup(data);

    if (!response.success) {
      if (response.errors) {
        // Handle server validation errors
        setServerError(response.errors);
      } else {
        // Handle duplicate email error
        setServerError([response.message]);
      }
    } else {
      setSuccess(response.message);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? null : "Register"}</h1>

      {success ? (
        <div className={styles.success}>
          <p>Redirecting to login page in {redirectCountdown} seconds...</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputDiv}>
              <label>Name</label>
              <input type="text" {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className={styles.inputDiv}>
              <label>Email</label>
              <input type="email" {...register("email")} />
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
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>

            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Registering" : "Register"}
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
          <p className={styles.loginPrompt}>
            Already have an account?{" "}
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Register;
