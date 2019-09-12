import React, { FC } from "react"

const Statement: FC = ({ children }) => (
  <blockquote
    style={{
      margin: "64px 0px",
    }}
  >
    <p
      style={{
        fontSize: "2rem",
        lineHeight: "1.5",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {children}
    </p>
  </blockquote>
)

export default Statement
