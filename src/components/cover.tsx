import React from "react"
import Collage from "./collage"
import styles from "./cover.module.css"
import Slogan, { SloganProps } from "./slogan"
import TFFundraisingLogo from "./tffundraisinglogo"

export interface CoverProps {
  slogan: SloganProps
}

export const Cover: React.FC<CoverProps> = ({
  slogan
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
      <Slogan
        leadingText={slogan.leadingText}
        boldedText={slogan.boldedText}
        trailingText={slogan.trailingText}
      />
    </section>
  )
}
