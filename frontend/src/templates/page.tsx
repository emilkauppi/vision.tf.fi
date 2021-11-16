import React, { createContext } from "react"
import Layout from "../components/layout"
import Section, { SectionNode } from "../components/section"
import SEO from "../components/seo"

interface Page {
  section: SectionNode[]
}

const Page: React.FC<{
  location: Location,
  pageContext: {
    page: Page
    title: string
  }
}> = ({ location, pageContext }) => {
  const sections = pageContext.page.section.map(section => (
    <Section
      key={section.id}
      id={section.id}
      title={section.title}
      node={section}
    />
  ))
  const isAtDonationPage = location.pathname.indexOf("stod-projektet")  !== -1

  return (
    <Layout title={pageContext.title} isDonateButtonHidden={isAtDonationPage}>
      <LocationContext.Provider value={location}>
        <SEO title={pageContext.title} />
        {sections}
      </LocationContext.Provider>
    </Layout>
  )
}

export const LocationContext = createContext<Location | null>(null)

export default Page
