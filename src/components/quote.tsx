import React, { FC } from "react"

export interface QuoteProps {
  author?: string
  title: string
}

const Quote: FC<QuoteProps> = ({ author, title }) => (
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
      {title}
    </p>
    {author && <footer>— {author}</footer>}
  </blockquote>
)

export default Quote
