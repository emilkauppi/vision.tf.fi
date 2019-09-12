import React, { FC } from "react"

interface QuoteProps {
  quotee: string
  children: string
}

const Quote: FC<QuoteProps> = ({ quotee, children }) => (
  <blockquote
    style={{
      textAlign: "center",
    }}
  >
    <p>{children}</p>
    <footer>{quotee}</footer>
  </blockquote>
)

export default Quote
