import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const TFFU: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "tffu.svg" }) {
        publicURL
      }
    }
  `)

  return (
    <img
      style={{ margin: 0 }}
      src={data.file.publicURL}
      alt="TF Fundraising-logotyp"
    />
  )
}

export default TFFU
