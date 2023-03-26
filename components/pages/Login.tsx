import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import axios from "axios";
import useValidate from "@/hooks/useValidate";

import styles from "./Login.module.scss";

import Button from "../Buttons/Button";

interface loginProps {
  signup?: boolean;
}

const Login: React.FC<loginProps> = ({ signup }) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const cfnPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [isPasswordValid, validatePassword, clearPassword] = useValidate({
    inputRef: passwordRef,
    isEmpty: true,
    isPassword: true,
  });
  const [isCfnPasswordValid, validateCfnPassword, clearCfnPassword] =
    useValidate({
      inputRef: cfnPasswordRef,
      isEmpty: true,
      isEqualTo: passwordRef,
    });

  const [isUsernameValid, validateUsername, clearUsername] = useValidate({
    inputRef: usernameRef,
    isEmpty: true,
    isUsername: true,
  });
  const [isEmailValid, validateEmail, clearEmail] = useValidate({
    inputRef: emailRef,
    isEmpty: true,
    isEmail: true,
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const validEmail = validateEmail();
    const validPassword = validatePassword();
    let validCfnPassword = true;
    const validUsername = validateUsername();

    if (signup) {
      validCfnPassword = validateCfnPassword();
    }

    if (!(validEmail && validPassword && validCfnPassword && validUsername)) {
      return;
    }

    const currentUsername = usernameRef.current?.value;
    const currentEmail = emailRef.current?.value;
    const currentPassword = passwordRef.current?.value;
    const currentCfnPassword = cfnPasswordRef.current?.value;

    if (signup) {
      const res = await axios.post("/api/auth/signup", {
        userData: {
          username: currentUsername,
          email: currentEmail,
          password: currentPassword,
          cfnPassword: currentCfnPassword,
        },
      });

      console.log(res);
    }
  };

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
        <form className={styles.login_form} onSubmit={submitHandler}>
          {!isUsernameValid && (
            <label htmlFor="username">Incorrect username</label>
          )}
          <input
            ref={usernameRef as any}
            id="username"
            type="text"
            placeholder={`Username`}
            onChange={clearUsername}
          />
          {!isEmailValid && (
            <label htmlFor="email">Incorrect email address</label>
          )}
          <input
            ref={emailRef as any}
            id="email"
            type="text"
            placeholder={`Email`}
            onChange={clearEmail}
          />
          {!isPasswordValid && (
            <label htmlFor="password">Password, should contain: (a-Z | !@#$%^&* | 0-9)</label>
          )}
          <input
            ref={passwordRef as any}
            id="password"
            type="password"
            placeholder={`Password`}
            onChange={clearPassword}
          />
          {!isCfnPasswordValid && (
            <label htmlFor="cfn-password">Incorrect password</label>
          )}
          {signup && (
            <input
              ref={cfnPasswordRef as any}
              id="cfn-password"
              type="password"
              placeholder={`Confirm password`}
              onChange={clearCfnPassword}
            />
          )}
          <div className={styles.checkbox}>
            <input ref={checkboxRef} type="checkbox" />
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
