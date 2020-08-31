import React, { FC } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section, { SectionNode } from "../components/section"

export const query = graphql`
  query MyQuery {
    page: contentfulPage(slug: { eq: "index" }) {
      section {
        ... on ContentfulImage {
          id
          slug
          image {
            file {
              url
            }
          }
        }
        ... on ContentfulSection {
          id
          title
          childContentfulSectionBodyTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulStatement {
          id
          title
          author
        }
        ... on ContentfulVideo {
          id
          video {
            file {
              url
            }
          }
        }
      }
    }
  }
`

interface Query {
  page: {
    section: SectionNode[]
  }
}

class IndexPage extends React.Component<{ data: Query}> {
  componentDidMount() {
    window.location.href = "https://www.teknologforeningen.fi/"
  }
  render() {
    const sections = this.props.data.page.section.map(section => (
      <Section key={section.id} title={section.title} node={section} />
    ))

    window.location.href = "https://www.teknologforeningen.fi"

    return (
      <>
      </>
      // <Layout>
      //   <SEO title="Home" />
      //   {sections}
      // </Layout>
    )
  }
}

export default IndexPage
