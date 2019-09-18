import React, { FC } from "react"

const Statement: FC = ({ children }) => (
  <blockquote
    style={{
      margin: "64px 0px",
    }}
  >
    <p
      style={{
        color: "#333",
        fontSize: "2rem",
        lineHeight: "1.5",
        fontWeight: 700,
        fontStyle: "italic",
        textAlign: "center",
      }}
    >
      {children}
    </p>
  </blockquote>
)

export default Statement
