const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tagPage.js")

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              publish
              title
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  // Extract tag data from query
  const tags = result.data.tagsGroup.group

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      //
      if (!post.frontmatter.publish && process.env.NODE_ENV === "production") {
        console.log(`Page SKIP  :[${post.frontmatter.title}]`)
        return
      }

      let previousPost = index === 0 ? null : posts[index - 1]
      let nextPost = index === posts.length - 1 ? null : posts[index + 1]

      // Skip Logic
      let i = index

      if (previousPost !== null) {
        while (!previousPost.frontmatter.publish) {
          if (i === 0) {
            previousPost = null
            break
          }
          i--
          previousPost = posts[i]
          if (previousPost === null) {
            break
          }
        }
      }

      i = index

      if (nextPost !== null) {
        while (nextPost.frontmatter.publish === false) {
          i++
          if (i === posts.length) {
            nextPost = null
            break
          }
          nextPost = posts[i]
          if (nextPost === null) {
            break
          }
        }
      }

      // Skip Logic End

      let previousPostId = previousPost === null ? null : previousPost.id
      let nextPostId = nextPost === null ? null : nextPost.id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })

      // Make tag pages
      tags.forEach(tag => {
        if (
          !post.frontmatter.publish &&
          process.env.NODE_ENV === "production"
        ) {
          console.log(`Page SKIP  :[${post.frontmatter.title}]`)
          return
        }
        createPage({
          path: `/tags/${tag.fieldValue}/`,
          component: tagTemplate,
          context: {
            tag: tag.fieldValue,
          },
        })
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      github: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      icon: String
      color: String
      publish: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}
