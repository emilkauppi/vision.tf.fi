import React from "react"
import styles from "./topbar.module.css"
import TFFU from "./tffulogo"
import { Link } from "gatsby"
import { motion } from "framer-motion"

const TopBar: React.FC<{
  title?: string
  isDonateButtonHidden?: boolean
}> = ({ title, isDonateButtonHidden }) => (
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
      {!isDonateButtonHidden && (
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link to="/kontakt" className={styles.donate}>
            Hör mer
          </Link>
        </motion.div>
      )}
    </nav>
  </div>
)

export default TopBar
