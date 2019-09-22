import React, { Component } from "react"
import { Link } from "gatsby"

import Header from "./header"

export default class Navbar extends Component {
  state = {
    navBarOpen: false,
    css: "collapse navbar-collapse",
    links: [
      { id: 1, path: "/", text: "COP KG to USD" },
      { id: 2, path: "/usdcop", text: "USD to COP" },
      { id: 2, path: "/copusd", text: "COP Arrobas to COP" },
    ],
  }

  navBarHandler = () => {
    let { navBarOpen } = this.state
    navBarOpen
      ? this.setState({ navBarOpen: false, css: "collapse navbar-collapse" })
      : this.setState({
          navBarOpen: true,
          css: "collapse navbar-collapse show",
        })
  }
  render() {
    let { css, links } = this.state
    let { siteTitle } = this.props
    return (
      <nav className="navbar navbar-expand-sm navbar-dark">
        <Header siteTitle={siteTitle} />
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.navBarHandler}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={css}>
          <ul className="navbar-nav mx-auto">
            {links.map(link => (
              <li key={link.id} className="nav-item">
                <Link
                  to={link.path}
                  className="nav-link text-capitalize"
                  style={{ color: `#fff` }}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }
}
