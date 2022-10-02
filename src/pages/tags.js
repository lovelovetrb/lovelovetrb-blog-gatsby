import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import Seo from "../components/seo"

//  Breadcrumb
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

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
    pageContext
}) => {
    const {
        breadcrumb: { crumbs },
    } = pageContext

    return (
        <Layout location={location} title={title}>
            <Breadcrumb
                crumbs={crumbs}
                crumbSeparator=" > "
                className='breadcrumb'
            />
            <div className="content">
                <h1 className="tag-header">Tags</h1>
                <ul className='tag-list'>
                    {group.map(tag => (
                        <li key={tag.fieldValue} >
                            <Link to={`/tags/${tag.fieldValue}/`}>
                                #{tag.fieldValue} ({tag.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )

    TagsPage.propTypes = {
        data: PropTypes.shape({
            allMarkdownRemark: PropTypes.shape({
                group: PropTypes.arrayOf(
                    PropTypes.shape({
                        fieldValue: PropTypes.string.isRequired,
                        totalCount: PropTypes.number.isRequired,
                    }).isRequired
                ),
            }),
            site: PropTypes.shape({
                siteMetadata: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                }),
            }),
        }),
    }
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
        filter: {frontmatter: {publish: {eq: true}}}, 
        limit: 2000
        ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`