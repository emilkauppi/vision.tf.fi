import React, { FC } from "react"
import MarkdownRemark, { MarkdownRemarkNode } from "./markdownremark"

export interface SectionNode {
  title?: string
  childContentfulSectionBodyTextNode?: MarkdownRemarkNode
  image?: {
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
  console.log(node)
  return node.childContentfulSectionBodyTextNode ? (
    <section>
      <h1>{title}</h1>
      <MarkdownRemark node={node.childContentfulSectionBodyTextNode} />
    </section>
  ) : node.image ? (
    <img src={node.image.file.url} />
  ) : (
    <div />
  )
}

export default Section
