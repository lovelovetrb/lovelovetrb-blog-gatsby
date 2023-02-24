import React from "react"
import Twemoji  from "@twemoji/api"

export const Eyecatch = ({ place, icon, color }) => {
  let css
  const rendItem = Twemoji.parse(icon)
  console.log(icon)
  if (place === "list") {
    css = {
      backgroundColor: color,
      display: "flex",
      width: "100%",
      height: "10rem",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "30px",
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
      fontSize: "50px",
      borderRadius: "10px",
    }
  }

  return (
    <div style={css}>
      {icon}
    </div>
  )
}
