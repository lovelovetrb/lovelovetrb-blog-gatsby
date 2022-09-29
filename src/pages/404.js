import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Eyecatch } from "../components/eyecatch"
import { Share } from "../components/share"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <div className="content">
        <Eyecatch place={'article'} color={'#b3e5fc'} icon={'🙏'} />
        <h1 className="tag-header">Sorry... 404: Not Found</h1>
        <p style={{ margin: '1rem 0' }}>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
