import React from "react"

const Video: React.FC<VideoProps> = ({ video }) => {
  return (
    <video
      controls={true}
      style={{
        width: "100%",
      }}
    >
      <source src={video.file.url} type="video/mp4" />
    </video>
  )
}

export interface VideoProps {
  video: {
    file: {
      url: string
    }
  }
}

export default Video
