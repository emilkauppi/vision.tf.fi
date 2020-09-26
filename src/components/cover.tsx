import React from "react"

export interface CoverProps {
  boldedText: string
  leadingText: string
  trailingText: {
    trailingText: string
  }
}

export const Cover: React.FC<CoverProps> = ({
  boldedText,
  leadingText,
  trailingText,
}) => {
  return <h1>Cover</h1>
}
