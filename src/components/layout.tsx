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
    <div>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()},{` `}
        <a href="https://www.tf.fi">Teknologföreningen</a>
      </footer>
    </div>
  )
}

export default Layout
