import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const TFLogo: React.FC = () => {
  const logo = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "tf.svg" }) {
        publicURL
      }
    }
  `)

  return (
    <img
      style={{ margin: 0 }}
      src={logo.file.publicURL}
      alt="Teknologföreningens logotyp"
    />
  )
}

export default TFLogo
