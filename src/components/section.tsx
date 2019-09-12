import React, { FC } from "react"

interface SectionProps {
  title: string
}

const Section: FC<SectionProps> = ({ title, children }) => (
  <section>
    <h1>{title}</h1>
    {children}
  </section>
)

export default Section
