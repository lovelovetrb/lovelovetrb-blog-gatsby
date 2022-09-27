import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare, faGetPocket, faTwitterSquare, faLine, } from "@fortawesome/free-brands-svg-icons"
import { useStaticQuery, graphql } from "gatsby"

export const Share = ({ location }) => {

    const { site, markdownRemark } = useStaticQuery(
        graphql`
        query {
        markdownRemark {
            frontmatter {
            title
            }
        }
        site {
            siteMetadata {
            description
            siteUrl
            title
            }
        }
        }
    `)

    let uaData
    useEffect(() => {
        uaData = navigator.userAgentData.mobile;
    }, [])

    const shareData = {
        title: site.siteMetadata?.title,
        text: site.siteMetadata?.description,
        url: markdownRemark.frontmatter.title

    }
    
    const onClickShareButton = async () => {
        if (navigator.canShare) {
            await navigator.share(shareData);
        } else {
            alert(`Your system doesn't support sharing System`)
        }
    }

    if (uaData) {
        return (
            <div className="shere">
                <h3>Please Shere This Page!</h3>
                <button type="button" className='share-btn-mobile' onClick={onClickShareButton}>click shere!</button>
            </div>
        )
    } else {
        return (
            <div className="shere">
                <div className="shere-btn-desktop">
                    <a className="sns__twitter" href={`http://twitter.com/share?url=${location.href}&text=${markdownRemark.frontmatter.title} | ${site.siteMetadata?.title}&hashtags=risunote`} target="_blank" rel="nofollow noopener">
                        <i>
                            <FontAwesomeIcon icon={faTwitterSquare} />
                        </i>
                    </a>
                    <a className="sns__facebook" href={`http://www.facebook.com/share.php?u=${location.href}`} target="_blank" rel="nofollow noopener">
                        <i>
                            <FontAwesomeIcon icon={faFacebookSquare} />
                        </i>
                    </a>
                    <a className="sns__pocket" href={`http://getpocket.com/edit?url=${location.href}&title=${markdownRemark.frontmatter.title} | ${site.siteMetadata?.title}`} target="_blank" rel="nofollow noopener">
                        <i>
                            <FontAwesomeIcon icon={faGetPocket} />
                        </i>
                    </a>
                    <a className="sns__line" href={`https://social-plugins.line.me/lineit/share?url=${location.href}`} target="_blank" rel="nofollow noopener">
                        <i>
                            <FontAwesomeIcon icon={faLine} />
                        </i>
                    </a>
                </div>
            </div>
        )
    }


}
