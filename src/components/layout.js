/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Layout } from "antd"

import Navbar from "./navbar"
import "./layout.css"
import "bootstrap/dist/css/bootstrap.min.css"

const { Content, Footer } = Layout

const LayoutNew = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <Navbar siteTitle={data.site.siteMetadata.title} />
      <Content style={{ padding: "0 50px" }}>{children}</Content>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </Layout>
  )
}

LayoutNew.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutNew
