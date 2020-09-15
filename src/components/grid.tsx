import React from "react"

const Grid: React.FC<{
  gridItems: GridItem[]
}> = ({ gridItems }) => {
  const cardLinks = gridItems.map(gridItem => (
    <CardLink key={gridItem.id} gridItem={gridItem} />
  ))
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
        gap: "32px",
        justifyItems: "center",
        marginBottom: "64px",
      }}
    >
      {cardLinks}
    </section>
  )
}

export interface GridItem {
  id: string
  title: string
  backgroundImage: {
    file: {
      url: string
    }
  }
}

const CardLink: React.FC<{
  gridItem: GridItem
}> = ({ gridItem }) => (
  <a
    href="#"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "280px",
      height: "280px",
      backgroundImage: `url('${gridItem.backgroundImage.file.url}')`,
      backgroundSize: "cover",
      textDecoration: "none",
      color: "white",
      textTransform: "uppercase",
      fontWeight: "bold",
    }}
  >
    <h2
      style={{
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {gridItem.title}
    </h2>
  </a>
)

export default Grid
