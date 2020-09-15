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
        ... on ContentfulGrid {
          id
          gridItems {
            id
            title
            backgroundImage {
              file {
                url
              }
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

class IndexPage extends React.Component<{ data: Query }> {
  render() {
    const sections = this.props.data.page.section.map(section => (
      <Section key={section.id} title={section.title} node={section} />
    ))

    return (
      <Layout>
        <SEO title="Home" />
        {sections}
      </Layout>
    )
  }
}

export default IndexPage
