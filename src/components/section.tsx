import React, { FC } from "react"
import { Cover, CoverProps } from "./cover"
import Grid, { GridProps } from "./grid"
import MarkdownRemark, { MarkdownRemarkProps } from "./markdownremark"
import Quote, { QuoteProps } from "./quote"
import Video, { VideoProps } from "./video"

const Section: FC<SectionNode> = ({ title, node }) => {
  return "childContentfulSectionBodyTextNode" in node ? (
    <section style={{ marginBottom: "64px" }}>
      <h1>{title}</h1>
      <MarkdownRemark
        childMarkdownRemark={
          node.childContentfulSectionBodyTextNode.childMarkdownRemark
        }
      />
    </section>
  ) : "image" in node ? (
    <div style={{ textAlign: "center" }}>
      <img width={576} src={node.image.file.url} />
    </div>
  ) : "video" in node ? (
    <Video video={node.video} />
  ) : "gridItems" in node ? (
    <Grid gridItems={node.gridItems} />
  ) : "boldedText" in node ? (
    <Cover
      leadingText={node.leadingText}
      boldedText={node.boldedText}
      trailingText={node.trailingText}
    />
  ) : "title" in node ? (
    <Quote author={node.author} title={node.title} />
  ) : (
    <></>
  )
}

export interface SectionNode {
  id: string
  title: string
  author?: string
  slug?: string
  node:
    | MarkdownRemarkProps
    | ImageProps
    | VideoProps
    | GridProps
    | CoverProps
    | QuoteProps
}

interface ImageProps {
  image: {
    file: {
      url: string
    }
  }
}

export default Section
