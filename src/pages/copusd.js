import React, { Component } from "react"
import { BlockMath } from "react-katex"
import { Row, Col, Statistic, Typography } from "antd"

import Layout from "../components/layout"
import Form from "../components/form"
import SEO from "../components/seo"

import "antd/dist/antd.css"
import "katex/dist/katex.min.css"

const { Title } = Typography

export class CopUsd extends Component {
  state = {
    data: { total: 0 },
  }
  updateTotal = total => {
    this.setState({
      data: { ...this.state.data, total },
    })
  }
  render() {
    const func = String.raw`\frac{(\frac{FR}{12.5})*PRECIOARROBA + gastos}{TRM * 154.322}`
    let { total } = this.state.data
    return (
      <Layout>
        <SEO title="Home" />
        <Title>COP Arrobas -> USD</Title>
        <Title level={2}>
          Para evaluar el pago en dólares de una carga de café por arrobas se
          debe:
        </Title>
        <Col align="middle" type="flex">
          <Row>
            <BlockMath>{func}</BlockMath>
          </Row>
        </Col>
        <Form total={total} updTotal={this.updateTotal} usd="arrobas" />
        <div
          style={{
            margin: `32px`,
          }}
        >
          <Row>
            {total === 0 ? (
              <Col></Col>
            ) : (
              <Col>
                <h2> El valor por kg de CPS en dólares es:</h2>
                <Statistic value={`\$${total} USD/Pound `} />
              </Col>
            )}
          </Row>
        </div>
      </Layout>
    )
  }
}

export default CopUsd
