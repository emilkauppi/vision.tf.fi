import React from "react"
import styles from "./slogan.module.css"

const Slogan: React.FC<SloganProps> = ({
  leadingText,
  boldedText,
  trailingText,
}) => {
  const paddingIfOnlyBoldedText =
    !(leadingText && trailingText) && styles.sloganLargePadding
  const sloganClasses = [styles.slogan, paddingIfOnlyBoldedText].join(" ")
  const noMarginIfNoTrailingText = !trailingText && styles.noMargin
  return (
    <div className={styles.container}>
      <div className={sloganClasses}>
        {leadingText && <p>{leadingText}</p>}
        {leadingText && trailingText ? (
          <h1 className={noMarginIfNoTrailingText}>{boldedText}</h1>
        ) : (
          <h2 className={noMarginIfNoTrailingText}>{boldedText}</h2>
        )}
        {trailingText && (
          <p className={styles.noMargin}>{trailingText.trailingText}</p>
        )}
      </div>
    </div>
  )
}

export interface SloganProps {
  boldedText: string
  leadingText?: string
  trailingText?: {
    trailingText: string
  }
}

export default Slogan
