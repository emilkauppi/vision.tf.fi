import React, { FC } from "react"

const Statement: FC = ({ children }) => (
  <blockquote>
    <p
      style={{
        textAlign: "center",
      }}
    >
      {children}
    </p>
  </blockquote>
)

export default Statement
