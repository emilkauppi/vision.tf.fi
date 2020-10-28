import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Kontakt = () => (
  <Layout title="Hör mer" isDonateButtonHidden={true}>
    <SEO title="Hör mer" />
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width="100%"
      height="500px"
      style={{
        position: "absolute",
        height: "calc(100% - 48px)",
        border: "none",
      }}
      src="https://aemilkauppi.typeform.com/to/dSFzvUvw"
    ></iframe>
  </Layout>
)

export default Kontakt
