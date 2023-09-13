import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = (props) => (
  <ContentLoader className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="299" rx="10" ry="10" width="280" height="88" /> 
    <rect x="1" y="260" rx="0" ry="0" width="280" height="27" /> 
    <rect x="-1" y="407" rx="0" ry="0" width="95" height="22" /> 
    <rect x="128" y="401" rx="25" ry="25" width="151" height="36" /> 
    <circle cx="123" cy="122" r="120" />
  </ContentLoader>
)

