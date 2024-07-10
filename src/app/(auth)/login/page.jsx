"use client";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import { loginSchema } from "@/lib/schemas/loginSchema";
import login from "@/app/actions/login/login";
import Link from "next/link";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState([]);
  const [success, setSuccess] = useState();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data) {
    setServerError([]);
    setSuccess();

    const response = await login(data);

    if (response) {
      if (response.success) {
        setSuccess(true);
        const callbackUrl = new URLSearchParams(window.location.search).get(
          "callbackUrl"
        );
        window.location.href = callbackUrl || "/account";
      } else {
        setServerError([response.error]);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          <p>{errors.password && errors.password.message}</p>
        </div>

        <button disabled={isSubmitting} type="submit">
          {success ? "Logged in" : isSubmitting ? "Loading..." : "Login"}
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
        Need to create an account?{" "}
        <Link href="/register" className={styles.registerLink}>
          Register
        </Link>
      </p>
      <p className={styles.registerPrompt}>
        <Link href="/send-reset-password" className={styles.registerLink}>
          Forgot Password?
        </Link>
      </p>
    </div>
  );
}
export default LoginPage;
