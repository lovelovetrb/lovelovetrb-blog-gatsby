import React from "react"

import Layout from "/src/components/layout"
import Seo from "/src/components/seo"

// Components
import { Link, graphql } from "gatsby"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
  pageContext,
}) => {
  return (
    <Layout location={location} title={title}>
      <div className="content">
        <h1 className="tag-header">Tags</h1>
        <ul className="tag-list">
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${tag.fieldValue}/`}>
                #{tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagsPage

export const Head = () => <Seo title="tags" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { publish: { eq: true } } }
      limit: 2000
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`
