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
          slug
          image {
            file {
              url
            }
          }
        }
        ... on ContentfulSection {
          title
          childContentfulSectionBodyTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulStatement {
          title
          author
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
      <Section
        key={section.title || section.slug}
        title={section.title}
        node={section}
      />
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
// const IndexPage: FC<{ data: Query }> = ({ data }) => {
// }

export default IndexPage
