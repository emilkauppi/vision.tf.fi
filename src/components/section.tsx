import React, { FC } from "react"
import MarkdownRemark, { MarkdownRemarkNode } from "./markdownremark"
import Quote from "./quote"
import Video from "./video"

export interface SectionNode {
  id: string
  author?: string
  title?: string
  childContentfulSectionBodyTextNode?: MarkdownRemarkNode
  image?: {
    file: {
      url: string
    }
  }
  video?: {
    file: {
      url: string
    }
  }
  slug?: string
}

interface SectionProps {
  title?: string
  node: SectionNode
}

const Section: FC<SectionProps> = ({ title, node }) => {
  return node.childContentfulSectionBodyTextNode ? (
    <section style={{ marginBottom: "64px" }}>
      <h1>{title}</h1>
      <MarkdownRemark node={node.childContentfulSectionBodyTextNode} />
    </section>
  ) : node.image ? (
    <div style={{ textAlign: "center" }}>
      <img width={576} src={node.image.file.url} />
    </div>
  ) : node.video ? (
    <Video url={node.video.file.url} />
  ) : (
    <>{node.title && <Quote author={node.author}>{node.title}</Quote>}</>
  )
}

export default Section
