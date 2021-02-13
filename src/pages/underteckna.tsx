import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SignDocument from "../components/signdocument"
import privatpersoner from "../pdfs/privatpersoner.pdf"

const Underteckna = () => (
  <Layout title="Underteckna gåvobrev" isDonateButtonHidden={true}>
    <SEO title="Underteckna gåvobrev" />
    <SignDocument file={privatpersoner} />
  </Layout>
)

export default Underteckna
