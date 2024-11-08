import { useEffect, useState } from "react";

import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  const {login , isAthenticated ,errors} = useAuth();

  function handelSubmit(e){
    e.preventDefault();
    if(email && password) login(email , password);
  }
  useEffect(function(){
    if(isAthenticated) navigate('/app' , {replace:true})
  },[isAthenticated , navigate])

  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit={handelSubmit}>
        {
          errors && <div className="alert alert-danger">{errors}</div>
        }
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className="btn btn-primary w-100">Login</button>
        </div>
      </form>
    </main>
  );
}
