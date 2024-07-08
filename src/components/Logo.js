import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return <Link to='/'>
    <img src="worldWiseImgs/logo.png" alt="WorldWise logo" className={styles.logo} style={{width:'100px' , height:'40px'}}/>
  </Link>
}

export default Logo;
