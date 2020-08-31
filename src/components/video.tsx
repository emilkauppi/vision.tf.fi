import React from "react"

const Video: React.FC<{
  url: string
}> = ({ url }) => {
  return (
    <video
      controls={true}
      style={{
        width: "100%",
      }}
    >
      <source src={url} type="video/mp4" />
    </video>
  )
}

export default Video
