const path = require("path")

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const queryResults = await graphql(
    `
      query MyQuery {
        allContentfulPage {
          nodes {
            id
            slug
            section {
              ... on ContentfulImage {
                id
                slug
                image {
                  file {
                    url
                  }
                }
              }
              ... on ContentfulSection {
                id
                title
                childContentfulSectionBodyTextNode {
                  childMarkdownRemark {
                    html
                  }
                }
              }
              ... on ContentfulStatement {
                id
                title
                author
              }
              ... on ContentfulVideo {
                id
                video {
                  file {
                    url
                  }
                }
              }
              ... on ContentfulGrid {
                id
                gridItems {
                  id
                  title
                  backgroundImage {
                    file {
                      url
                    }
                  }
                  page {
                    slug
                  }
                }
              }
              ... on ContentfulCover {
                id
                boldedText
                leadingText
                trailingText {
                  trailingText
                }
              }
            }
          }
        }
      }
    `
  )

  if (queryResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query`)
  }

  const pageTemplate = path.resolve(`src/templates/page.tsx`)
  queryResults.data.allContentfulPage.nodes.map(page => {
    const slashIfIndexElsePageName = page.slug === "index" ? "/" : page.slug.toLowerCase()
    .replace(/(ä|å)/g, "a")
    .replace(/ö/g, "o")
    .replace(/\s/g, "-")
    .replace(/([^a-z|-])/g, "")

    createPage({
      path: slashIfIndexElsePageName,
      component: pageTemplate,
      context: {
        page,
      },
    })
  })
}
