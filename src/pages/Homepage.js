import { Link } from "react-router-dom";

import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (

    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h2>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h2>
        <h3>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h3>
        <Link to='/login' className="btn btn-success w-25">Get Start</Link>
      </section>
    </main>
  );
}
