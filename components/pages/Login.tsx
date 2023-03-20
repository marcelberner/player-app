import React from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

import styles from "./Login.module.scss";

import Button from "../Buttons/Button";

interface loginProps {
  signup?: boolean;
}

const Login: React.FC<loginProps> = ({ signup }) => {
  return (
    <section className={styles.login_section}>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>
          <Image
            priority
            src="/logo.svg"
            height={50}
            width={250}
            alt="PlayerApp logo"
            draggable={false}
          />
        </div>
        <h2>{signup ? "Sign up" : "Sign in"}</h2>
        <form className={styles.login_form}>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          {signup && <input type="text" placeholder="Confirm password" />}
          <div className={styles.checkbox}>
            <input type="checkbox" />
            <span>Remember me</span>
          </div>
          <Button>{signup ? "Sign up" : "Sign in"}</Button>
          {!signup && (
            <p>
              New to PlayerApp? <Link href="/signup">Create an account.</Link>
            </p>
          )}
        </form>
        {signup && (
          <p>
            By creating an account, you agree to the
            <span> Terms of Service</span>. For more information about,
            PlayerApp&apos;s privacy practices, see the
            <span> PlayerApp Privacy Statement</span>. (placeholder)
          </p>
        )}
      </div>
      <Image
        src="/login-bg.webp"
        alt=""
        width={1920}
        height={1080}
        style={{ height: "100%", objectFit: "cover", filter: "brightness(.3)" }}
        draggable={false}
      />
    </section>
  );
};

export default Login;
