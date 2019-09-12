import React, { FC } from "react"

interface QuoteProps {
  quotee: string
  children: string
}

const Quote: FC<QuoteProps> = ({ quotee, children }) => (
  <blockquote
    style={{
      margin: "64px 0 ",
      textAlign: "center",
    }}
  >
    <p
      style={{
        fontWeight: "bold",
        fontSize: "2rem",
        lineHeight: "1.5",
      }}
    >
      {children}
    </p>
    <footer>— {quotee}</footer>
  </blockquote>
)

export default Quote
