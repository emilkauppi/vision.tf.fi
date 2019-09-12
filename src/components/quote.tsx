import React, { FC } from "react"

interface QuoteProps {
  author?: string
  children: string
}

const Quote: FC<QuoteProps> = ({ author, children }) => (
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
    {author && <footer>— {author}</footer>}
  </blockquote>
)

export default Quote
