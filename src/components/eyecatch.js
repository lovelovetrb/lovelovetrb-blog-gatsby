import React from "react"
import Twemoji from "@twemoji/api"

export const Eyecatch = ({ place, icon, color }) => {
  let css
  const rendItem = Twemoji.parse(icon)
  if (place === "list") {
    css = {
      backgroundColor: color,
      display: "flex",
      width: "100%",
      height: "10rem",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }
  }

  if (place === "article") {
    css = {
      backgroundColor: color,
      marginTop: "1rem",
      display: "flex",
      width: "100%",
      height: "20rem",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
    }
  }

  return (
    <div
      style={css}
      dangerouslySetInnerHTML={{
        __html: `${rendItem}`,
      }}
    />
  )
}
