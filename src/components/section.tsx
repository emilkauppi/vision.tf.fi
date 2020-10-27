import React, { FC } from "react"
import { Cover, CoverProps } from "./cover"
import Grid, { GridProps } from "./grid"
import { MarkdownRemarkProps } from "./markdownremark"
import Quote, { QuoteProps } from "./quote"
import TextSection from "./textsection"
import Video, { VideoProps } from "./video"
import Image, { ImageProps } from "./image"
import Slogan, { SloganProps } from "./slogan"

const Section: FC<SectionNode> = ({ title, node }) => {
  return "childContentfulSectionBodyTextNode" in node ? (
    <TextSection title={title} node={node} />
  ) : "image" in node ? (
    <Image image={node.image} caption={node.caption} />
  ) : "video" in node ? (
    <Video video={node.video} />
  ) : "gridItems" in node ? (
    <Grid title={title} gridItems={node.gridItems} />
  ) : "slogan" in node ? (
    <Cover slogan={node.slogan} />
  ) : "title" in node ? (
    <Quote
      author={node.author}
      title={node.title}
      authorImage={node.authorImage}
    />
  ) : "boldedText" in node ? (
    <Slogan
      leadingText={node.leadingText}
      boldedText={node.boldedText}
      trailingText={node.trailingText}
    />
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
    | SloganProps
}

export default Section
