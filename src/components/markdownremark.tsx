import React, { FC } from "react"

export interface MarkdownRemarkNode {
  childMarkdownRemark: {
    html: string
  }
}

interface MarkdownRemarkProps {
  node: MarkdownRemarkNode
}

const MarkdownRemark: FC<MarkdownRemarkProps> = ({ node }) => (
  <div dangerouslySetInnerHTML={{ __html: node.childMarkdownRemark.html }} />
)

export default MarkdownRemark
