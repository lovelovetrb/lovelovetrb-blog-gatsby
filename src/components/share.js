import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookSquare,
  faGetPocket,
  faTwitterSquare,
  faLine,
} from "@fortawesome/free-brands-svg-icons"
import { useStaticQuery, graphql } from "gatsby"
import { isMobile, isDesktop } from "react-device-detect"

export const Share = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            siteUrl
            title
          }
        }
      }
    `
  )

  const [shareData, setShareData] = useState({})

  useEffect(() => {
    const shareData = {
      title: site.siteMetadata?.title,
      url: location.href,
    }
    setShareData(shareData)
  }, [])

  const onClickShareButton = async () => {
    if (navigator?.canShare) {
      await navigator.share(shareData)
    } else {
      alert(`Your system doesn't support sharing System`)
    }
  }

  if (isMobile && !isDesktop) {
    return (
      <div className="shere">
        <h3>Please Shere This Page!</h3>
        <button
          type="button"
          className="share-btn-mobile"
          onClick={onClickShareButton}
        >
          click shere!
        </button>
      </div>
    )
  }

  if (isDesktop) {
    return (
      <div className="shere isDesktop">
        <div className="shere-btn-desktop">
          <a
            className="sns__twitter"
            href={`http://twitter.com/share?url=${location.href}&text=${site.siteMetadata?.title}&hashtags=risunote`}
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faTwitterSquare} />
            </i>
          </a>
          <a
            className="sns__facebook"
            href={`http://www.facebook.com/share.php?u=${location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faFacebookSquare} />
            </i>
          </a>
          <a
            className="sns__pocket"
            href={`http://getpocket.com/edit?url=${location.href}&title=${site.siteMetadata?.title}`}
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faGetPocket} />
            </i>
          </a>
          <a
            className="sns__line"
            href={`https://social-plugins.line.me/lineit/share?url=${location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faLine} />
            </i>
          </a>
        </div>
      </div>
    )
  }
}
