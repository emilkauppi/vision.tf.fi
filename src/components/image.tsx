import React, { FC } from "react"
import styles from "./image.module.css"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image: FC<ImageProps> = ({ bottomMargin, image }) => {
  const potentiallyBottomMargin = bottomMargin && styles.marginBottom
  console.log(bottomMargin)
  console.log(styles.marginBottom)
  const classes = [styles.container, potentiallyBottomMargin].join(" ")
  return (
    <div className={classes}>
      <img src={image.fixed.src} className={styles.img} />
    </div>
  )
}

export interface ImageProps {
  bottomMargin: boolean
  image: {
    fixed: {
      src: string
    }
  }
}

export default Image
