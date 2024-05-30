import React from "react"
import Bio from "/src/components/bio"
import { Share } from "/src/components/share"
import Header from "./header"
import Footer from "./footer"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"

// 全体に共通するレイアウトを定義する
// <Layout>コンポーネントを呼べば良い
// TODO: title Propsの削除
const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div id="gotop">
        <Link href="#">
          <FontAwesomeIcon icon={faAngleUp} />
        </Link>
      </div>
      <Header />
      <div className="container">
        <main>{children}</main>
        <aside>
          <Bio />
        </aside>
      </div>
      <Share location={location} />
      <Footer />
    </div>
  )
}

export default Layout
