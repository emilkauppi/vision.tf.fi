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
    <header className={styles.cover}>
      <LinkHomeOnSubpages>
        <div className={styles.logo}>
          <TFFundraisingLogo />
        </div>
        <div className={styles.image}>
          <Collage />
        </div>
      </LinkHomeOnSubpages>
      <Slogan
        leadingText={slogan.leadingText}
        boldedText={slogan.boldedText}
        trailingText={slogan.trailingText}
      />
    </header>
  )
}

const LinkHomeOnSubpages: React.FC = ({ children }) => (
  window.location.pathname == "/" ? (
    <div className={styles.logoAndImage}>
      {children}
    </div>
  ) : (
    <a className={styles.logoAndImage} href="/">
      {children}
    </a>
  )
)
