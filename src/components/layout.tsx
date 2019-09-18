/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import styles from "./layout.module.css"

interface LayoutData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  bricksLeft: {
    publicURL: string
  }
  bricksRight: {
    publicURL: string
  }
}

const Layout: FC = ({ children }) => {
  const data: LayoutData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      bricksLeft: file(relativePath: { eq: "bricks-left.png" }) {
        publicURL
      }
      bricksRight: file(relativePath: { eq: "bricks-right.png" }) {
        publicURL
      }
    }
  `)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundImage: `url("${data.bricksLeft.publicURL}")`,
            backgroundRepeat: "repeat-y",
            backgroundPositionX: "100%",
            backgroundColor: "#F1F5FB",
          }}
        />
        <div className={styles.container}>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()},{` `}
            <a href="https://www.tf.fi">Teknologföreningen</a>
          </footer>
        </div>
        <div
          style={{
            flex: 1,
            backgroundImage: `url("${data.bricksRight.publicURL}")`,
            backgroundRepeat: "repeat-y",
            backgroundColor: "#F1F5FB",
          }}
        />
      </div>
    </div>
  )
}

export default Layout
