import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { Eyecatch } from "../components/eyecatch"
import Seo from "../components/seo"

// Breadcrumb
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"


const tagPage = ({ pageContext, data, location }) => {
    const { tag } = pageContext
    const { breadcrumb: { crumbs }, } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
        } tagged with "#${tag}"`
    const siteTitle = data.site.siteMetadata?.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>
            <Breadcrumb
                crumbs={crumbs}
                crumbSeparator=" > "
                className='breadcrumb'
            />
            <div className="tag-container">
                <h2 className="tag-header bg-blue">{tagHeader}</h2>
                <ol className="article_list">
                    {edges.map(({ node }) => {
                        const { slug } = node.fields
                        const { title, description } = node.frontmatter
                        const color = node.frontmatter.color || '#B3E5FC'
                        const icon = node.frontmatter.icon || '🔍'

                        return (
                            <li className="card">
                                <Link to={slug} itemProp='url'>
                                    <Eyecatch place={'list'} color={color} icon={icon} />
                                    <div class="card_text">
                                        <h3 class="card_article_title">{title}</h3>
                                        <p dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                            itemProp='description'
                                        />
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ol>
                <Link to="/tags">
                    <p className="go-all-tags">
                        Go All tags Page
                        <FontAwesomeIcon icon={faTag} style={{ marginLeft: '10px' }} />
                    </p>
                </Link>
            </div>
        </Layout>
    )
}

tagPage.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
}

export default tagPage

export const Head = ({ pageContext }) => {
    const { tag } = pageContext
    return (<Seo title={`#${tag}`} />)
}

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: {publish: {eq: true}, tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            color
            icon
            publish
          }
        }
      }
    }
  }
`