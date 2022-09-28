/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitterSquare, faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="side-card text-center stycky">
      <StaticImage
        className="icon"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/icon.jpg"
        width={100}
        height={100}
        quality={95}
        alt="Profile picture"
      />
      <h3 className="name url"><a href="https://lovelovetrb.github.io/" target="_blank" rel="noopener noreferrer">{author.name}</a></h3>
      <p className="textarea">{author?.summary || null}</p>
      <hr style={{ margin: '10px' }} />
      <h4>Contact Me!</h4>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
      }}>
        <p style={{ margin: '2.5px', fontSize: '1.6rem' }}>
          <a href={`https://lovelovetrb.github.io`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faHouse} />
          </a>
        </p>
        <p style={{ margin: '2.5px', fontSize: '2rem' }}>
          <a href={`https://twitter.com/${social?.twitter || ``}`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>
        </p>
        <p style={{ margin: '2.5px', fontSize: '2rem' }}>
          <a href={`https://github.com/${social?.github || ``}`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
        </p>
      </div>
    </div >
  )
}

export default Bio
