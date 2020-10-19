import React from "react"
import styles from "./topbar.module.css"
import TFFU from "./tffulogo"
import { Link } from "gatsby"

const TopBar: React.FC<{
  title?: string
}> = ({ title }) => (
  <div className={styles.container}>
    <nav className={styles.topbar}>
      <div className={styles.currentPage}>
        <Link to="/">
          <span className={styles.logo}>
            <TFFU variant="white" />
          </span>
        </Link>
        {title && <span>{title}</span>}
      </div>
      <Link to="#" className={styles.donate}>
        Donera
      </Link>
    </nav>
  </div>
)

export default TopBar
