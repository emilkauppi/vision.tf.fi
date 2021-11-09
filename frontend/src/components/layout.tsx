/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"
import styles from "./layout.module.css"
import TFLogo from "./tflogo"
import TopBar from "./topbar"

interface LayoutData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  instagram: {
    publicURL: string
  }
  facebook: {
    publicURL: string
  }
  linkedin: {
    publicURL: string
  }
}

const Layout: FC<{
  children: React.ReactNode
  title: string
  isDonateButtonHidden?: boolean
}> = ({ children, title, isDonateButtonHidden }) => {
  const data: LayoutData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      instagram: file(relativePath: { eq: "social-media/instagram.png" }) {
        publicURL
      }
      facebook: file(relativePath: { eq: "social-media/facebook.png" }) {
        publicURL
      }
      linkedin: file(relativePath: { eq: "social-media/linkedin.png" }) {
        publicURL
      }
    }
  `)
  const titleIfNotIndex = title === "index" ? undefined : title

  return (
    <div>
      <TopBar
        title={titleIfNotIndex}
        isDonateButtonHidden={isDonateButtonHidden}
      />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <TFLogo />
        </div>
        <div className={styles.socialMedia}>
          <a href="https://www.instagram.com/teknologforeningen/">
            <img src={data.instagram.publicURL} />
          </a>
          <a href="https://www.facebook.com/Teknologforeningen">
            <img src={data.facebook.publicURL} />
          </a>
          <a href="https://www.linkedin.com/company/teknologforeningen/">
            <img src={data.linkedin.publicURL} />
          </a>
        </div>
        <div>
          © {new Date().getFullYear()},{` `}
          <a href="https://www.tf.fi">Teknologföreningen</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
