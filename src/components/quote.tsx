import React, { FC } from "react"
import Card from "./card"
import styles from "./quote.module.css"

export interface QuoteProps {
  author?: string
  title: string
  authorImage?: {
    id: string
    fixed: {
      src: string
    }
  }
}

const Quote: FC<QuoteProps> = ({ author, title, authorImage }) => (
  <div className={styles.container}>
    <blockquote className={styles.quote}>
      {authorImage && (
        <img src={authorImage.fixed.src} alt={`Bild på ${author}`}></img>
      )}
      <p>{title}</p>
      {author && <footer>— {author}</footer>}
    </blockquote>
  </div>
)

export default Quote
