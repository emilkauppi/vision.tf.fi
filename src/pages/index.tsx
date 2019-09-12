import React, { FC } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Section, { SectionNode } from "../components/section"
import Statement from "../components/statement"
import Quote from "../components/quote"
import Map from "../components/Map"
import Collage from "../components/collage"

export const query = graphql`
  query MyQuery {
    page: contentfulPage(slug: { eq: "index" }) {
      section {
        ... on ContentfulImage {
          image {
            file {
              url
            }
          }
          slug
        }
        ... on ContentfulSection {
          title
          childContentfulSectionBodyTextNode {
            childMarkdownRemark {
              html
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

const IndexPage: FC<{ data: Query }> = ({ data }) => {
  const sections = data.page.section.map(section => (
    <Section
      key={section.title || section.slug}
      title={section.title}
      node={section}
    />
  ))

  return (
    <Layout>
      <SEO title="Home" />
      {sections}
      <Collage />
      <Statement>
        Vi vill skapa Träffpunkt Aalto — Ett vardagsrum för alla vid Aalto, ett
        hem för TF.
      </Statement>
      <Quote quotee="Nils Jonatan Wenell, Teknologföreningens stiftare, 1872">
        “Läroverket utbildar tjänstemannen, kamratskapet danar medborgaren.”
      </Quote>
      <Map />
      <Statement>
        Låt oss möjliggöra ett livskraftigt TF – i minst 150 år till.
      </Statement>
    </Layout>
  )
}

export default IndexPage
