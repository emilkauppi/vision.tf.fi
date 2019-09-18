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
  <div
    style={{ color: "#111" }}
    dangerouslySetInnerHTML={{ __html: node.childMarkdownRemark.html }}
  />
)

export default MarkdownRemark
