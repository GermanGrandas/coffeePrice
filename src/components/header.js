import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { Layout, Typography } from "antd"
const { Header } = Layout
const HeaderP = ({ siteTitle }) => (
  <Header
    style={{
      background: `#52c41a`,
      marginBottom: `1.45rem`,
      height: `100px`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <Typography.Title level={2} style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Typography.Title>
    </div>
  </Header>
)

HeaderP.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderP.defaultProps = {
  siteTitle: ``,
}

export default HeaderP
