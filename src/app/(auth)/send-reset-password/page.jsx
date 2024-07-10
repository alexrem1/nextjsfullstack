"use client";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "@/lib/schemas/emailSchema";
import { useState } from "react";

import sendResetPassword from "@/app/actions/sendResetPassword/sendResetPassword";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
function SendResetPassword() {
  const [serverError, setServerError] = useState([]);
  const [success, setSuccess] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  async function onSubmit(data) {
    setServerError([]);
    setSuccess();

    const response = await sendResetPassword(data);

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
      {success ? (
        <div className={styles.success}>
          <span className={styles.successIcon}>
            <CheckCircle2 />
          </span>
          <p>Reset Password Email sent Successfully.</p>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>Send Password Reset</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputDiv}>
              <label>Email</label>
              <input type="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <button disabled={isSubmitting} type="submit">
              {success
                ? "Email Sent"
                : isSubmitting
                ? "Sending..."
                : "Send Email"}
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
export default SendResetPassword;
