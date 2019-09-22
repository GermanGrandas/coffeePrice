import React, { Component } from "react"
import { BlockMath } from "react-katex"
import { Row, Col, Statistic, Typography } from "antd"

import Layout from "../components/layout"
import Form from "../components/form"
import SEO from "../components/seo"

import "antd/dist/antd.css"
import "katex/dist/katex.min.css"

const { Title } = Typography

export class usdToCop extends Component {
  state = {
    data: { total: 0 },
  }
  updateTotal = total => {
    this.setState({
      data: { ...this.state.data, total },
    })
  }
  render() {
    const func1 = String.raw`\frac{(USDPRICE * 2.2046 * TRM * 70)-GASTOS}{FR} `
    let { total } = this.state.data
    return (
      <Layout>
        <SEO title="USD-COP" />
        <Title>USD -> COP</Title>
        <Title level={2}>
          Para evaluar el pago en Pesos Colombianos a partir del precio por
          libra americana se debe:
        </Title>
        <Col align="middle" type="flex">
          <Row>
            <BlockMath>{func1}</BlockMath>
          </Row>
        </Col>
        <Form total={total} updTotal={this.updateTotal} usd="usd" />
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
                <h2> El valor por kg de CPS es:</h2>
                <Statistic value={`\$${total} COP/Kg `} precision={2} />
              </Col>
            )}
          </Row>
        </div>
      </Layout>
    )
  }
}

export default usdToCop
