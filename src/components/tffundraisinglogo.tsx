import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const TFFundraisingLogo: FC = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "tf-fundraising.svg" }) {
        publicURL
      }
    }
  `)

  console.log(data)

  return (
    <img
      style={{ margin: 0 }}
      src={data.file.publicURL}
      alt="TF Fundraising-logotyp"
    />
  )
}

export default TFFundraisingLogo
