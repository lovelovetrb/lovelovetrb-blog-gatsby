import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Eyecatch } from "../components/eyecatch"
import { Share } from "../components/share"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
  pageContext
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const {
    breadcrumb: { crumbs },
  } = pageContext
  const tagStyle = {
    fontFamily: 'Silkscreen, cursive',
    fontSize: '1.2rem'
  }

  const color = post.frontmatter.color || '#B3E5FC'
  const icon = post.frontmatter.icon || '🔍'
  const isPublish = post.frontmatter.publish

  return (
    <Layout location={location} title={siteTitle}>
      <Breadcrumb
        crumbs={crumbs}
        crumbSeparator=" > "
        className='breadcrumb'
      />
      <article
        itemScope
        itemType="http://schema.org/Article"
        className="content"
      >
        <Eyecatch place={'article'} color={color} icon={icon} />
        <div className="article-title">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
        </div>
        <div className="article-data">
          <div className="article-data-publish-time">
            <FontAwesomeIcon icon={faClock} />
            <p>{post.frontmatter.date}</p>
          </div>
          {isPublish || (<p>{`pubulish : ${isPublish}`}</p>)}
          <div style={tagStyle}>
            tags:
            {post.frontmatter.tags.map((tag) => {
              return (
                <>
                  <Link to={`/tags/${tag}`} style={{ margin: '0 3px' }}>
                    #{tag || 'none'}
                  </Link>
                </>
              )
            })}
          </div>
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="sentence"
        />
        <hr />
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li className="previous-post">
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li className="next-post">
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </article>
    </Layout >
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        icon
        color
        publish
      }
    }
    previous: markdownRemark(
      id: { eq: $previousPostId }
      ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(
      id: { eq: $nextPostId }
      ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
