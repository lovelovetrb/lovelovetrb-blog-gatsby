import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Eyecatch } from "../components/eyecatch"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes.filter(post => post.frontmatter.publish !== false)

  return (
    <Layout location={location} title={siteTitle}>
      <h1 className="tag-header bg-blue">- All Posts -</h1>
      <ol className="article_list">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const color = post.frontmatter.color || '#B3E5FC'
          const icon = post.frontmatter.icon || '🔍'

          return (
            <li className="card">
              <p class="card_tag">
                <Link to={`/tags/${post.frontmatter.tags[0]}`}>
                  #{post.frontmatter.tags[0] || 'none'}
                </Link>
              </p>
              <Link to={post.fields.slug} itemProp='url'>
                <Eyecatch place={'list'} color={color} icon={icon} />
                <div class="card_text">
                  <h3 class="card_article_title">{title}</h3>
                  <p dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.except,
                  }}
                    itemProp='description'
                  />
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Top" />


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          color
          icon
          publish
        }
      }
    }
  }
`
