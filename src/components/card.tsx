import React from "react"
import styles from "./card.module.css"

const Card: React.FC<CardProps> = ({ children, color, hoverable = true }) => {
  const cardClasses = [styles.card, hoverable ? styles.cardHoverable : ""].join(
    " "
  )
  const cardBackgroundColor = color || "koppargron"
  const cardBackgroundColorClass = styles[cardBackgroundColor]
  const cardBackgroundClasses = [
    styles.cardBackground,
    cardBackgroundColorClass,
  ].join(" ")
  return (
    <div className={cardClasses}>
      <div className={cardBackgroundClasses}></div>
      <div className={styles.cardFrontCard}>{children}</div>
    </div>
  )
}

interface CardProps {
  children: React.ReactNode
  color?: "koppargron" | "ljusrod"
  hoverable?: boolean
}

export default Card
