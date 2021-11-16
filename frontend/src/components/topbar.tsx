import React from "react"
import styles from "./topbar.module.css"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import TFLogo from "./tflogo"

const TopBar: React.FC<{
  title?: string
  isDonateButtonHidden?: boolean
}> = ({ title, isDonateButtonHidden }) => (
  <div className={styles.container}>
    <nav className={styles.topbar}>
      <div className={styles.currentPage}>
        <Link to="/">
          <motion.span className={styles.logo} whileHover={{ scale: 1.1 }}>
            <TFLogo variant="white" />
          </motion.span>
        </Link>
        {title && <span>{title}</span>}
      </div>
      {!isDonateButtonHidden && (
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link to="/stod-projektet" className={styles.donate}>
            Stöd projektet
          </Link>
        </motion.div>
      )}
    </nav>
  </div>
)

export default TopBar
