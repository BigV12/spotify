import React from "react";
import { loginEndpoint } from "../spotify";
import sp from "../components/assets/sp.webp";
import styles from "./login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.flex_item}>
        <img src={sp} className={styles.login_img} />

        <p>login page for new users</p>
        <a href={loginEndpoint} className={styles.login}>
          Login
        </a>
      </div>
    </div>
  );
}

export default Login;
