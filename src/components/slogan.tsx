import React from "react"
import styles from "./slogan.module.css"

const Slogan: React.FC<SloganProps> = ({
    leadingText,
    boldedText,
    trailingText
}) => (
    <div className={styles.slogan}>
        <p>{leadingText}</p>
        <h1>{boldedText}</h1>
        <p>{trailingText.trailingText}</p>
    </div>
)

export interface SloganProps {
  boldedText: string
  leadingText: string
  trailingText: {
    trailingText: string
  }
}

export default Slogan
