import React, { useEffect } from "react"

const IndexPage: React.FC = () => {
  redirectToTFDotFIOnLoad()

  return <></>
}

const redirectToTFDotFIOnLoad = () =>
  useEffect(() => {
    window.location.href = "https://www.teknologforeningen.fi/"
  })

export default IndexPage
