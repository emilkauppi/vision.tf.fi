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
        color: "#333",
        fontSize: "1.6rem",
        lineHeight: "1.2",
        fontWeight: 700,
        fontStyle: "italic",
        textAlign: "center",
      }}
    >
      {children}
    </p>
    {author && <footer>— {author}</footer>}
  </blockquote>
)

export default Quote
