import React from "react"
import styles from "./topbar.module.css"
import TFFU from "./tffulogo"
import { Link } from "gatsby"

const TopBar: React.FC = () => (
  <div className={styles.container}>
    <nav className={styles.topbar}>
      <Link to="/" className={styles.logo}>
        <TFFU variant="white" />
      </Link>
      <Link to="#" className={styles.donate}>
        Donera
      </Link>
    </nav>
  </div>
)

export default TopBar
