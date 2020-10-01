import React from "react"
import Collage from "./collage"
import styles from "./cover.module.css"
import TFFundraisingLogo from "./tffundraisinglogo"

export interface CoverProps {
  boldedText: string
  leadingText: string
  trailingText: {
    trailingText: string
  }
}

export const Cover: React.FC<CoverProps> = ({
  boldedText,
  leadingText,
  trailingText,
}) => {
  return (
    <section className={styles.cover}>
      <div className={styles.logoAndImage}>
        <div className={styles.logo}>
          <TFFundraisingLogo />
        </div>
        <div className={styles.image}>
          <Collage />
        </div>
      </div>
      <div className={styles.slogan}>
        <p>{leadingText}</p>
        <h1>{boldedText}</h1>
        <p>{trailingText.trailingText}</p>
      </div>
    </section>
  )
}
