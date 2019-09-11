import React, { FC } from "react"
import { Link } from "gatsby"
import VisionTFLogo from "./VisionTFLogo"

const Header: FC = () => (
  <header
    style={{
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      padding: "8px 0 4px 0",
      borderBottom: "1px solid lightgray",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "768px",
      }}
    >
      <Link to="/">
        <VisionTFLogo />
      </Link>
    </div>
  </header>
)

export default Header
