import React from "react"
import styles from "./slogan.module.css"

const Slogan: React.FC<SloganProps> = ({
  leadingText,
  boldedText,
  trailingText,
}) => (
  <div className={styles.container}>
    <div className={styles.slogan}>
      {leadingText && <p>{leadingText}</p>}
      <h2>{boldedText}</h2>
      {trailingText && <p>{trailingText.trailingText}</p>}
    </div>
  </div>
)

export interface SloganProps {
  boldedText: string
  leadingText?: string
  trailingText?: {
    trailingText: string
  }
}

export default Slogan
