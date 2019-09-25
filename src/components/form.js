import React, { Component } from "react"
import { Form, Input, Row, Col, Button, Tooltip } from "antd"
import PropTypes from "prop-types"
import axios from "axios"
/*
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    */

export class Formulario extends Component {
  state = {
    data: {
      TRM: 0,
      precio: 0,
      FR: 0,
      total: 0,
    },
    errors: {},
  }
  componentDidMount() {
    axios
      .get(`http://app.docm.co/prod/Dmservices/Utilities.svc/GetTRM`)
      .then(({ data }) => {
        this.setState({
          data: { ...this.state.data, TRM: data },
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  validate = data => {
    const errors = {}
    if (!data.FR) errors.FRError = "El FR es obligatorio"
    if (!data.precio) errors.precioError = "El precio es obligatorio"
    if (!data.TRM) errors.TRMError = "El TRM es obligatorio"
    return errors
  }
  calculate = ({ FR, precio, TRM }) => {
    let { total, updTotal, usd } = this.props
    precio = parseFloat(precio)
    TRM = parseFloat(TRM)
    FR = parseFloat(FR)
    const gastos = 100000

    if (usd === "usd") {
      total = ((precio * 2.2046 * TRM * 70) - gastos) / FR
      updTotal(total.toPrecision(4) * 1)
    } else if (usd === "arrobas") {
      total = ((FR / 12.5) * precio + gastos) / (TRM * 154.322)
      updTotal(total.toPrecision(3))
    } else {
      total = (precio * FR + gastos) / (70 * TRM * 2.2046)
      updTotal(total.toPrecision(3))
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.calculate(this.state.data)
    }
  }
  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })
  }
  render() {
    let { TRM, precio, FR } = this.state.data
    let { precioError, FRError, TRMError } = this.state.errors
    let { usd } = this.props
    return (
      <div>
        <h1>Cálculo</h1>
        <Form
          //{...formItemLayout}
          onSubmit={this.handleSubmit}
          layout="inline"
        >
          <Row gutter={24}>
            <Col span={24} style={{ textAlign: "left" }}>
              {usd === "usd" ? (
                <Form.Item
                  validateStatus={precioError ? "error" : ""}
                  help={precioError || ""}
                  label="Precio Dolares"
                >
                  <Input
                    name="precio"
                    onChange={this.onChange}
                    placeholder="Ingrese el Precio en Dolares"
                    value={precio}
                  />
                </Form.Item>
              ) : usd === "arrobas" ? (
                <Form.Item
                  validateStatus={precioError ? "error" : ""}
                  help={precioError || ""}
                  label="Precio día por Arroba"
                >
                  <Input
                    name="precio"
                    onChange={this.onChange}
                    placeholder="Ingrese Precio día"
                    value={precio}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  validateStatus={precioError ? "error" : ""}
                  help={precioError || ""}
                  label="Precio día"
                >
                  <Input
                    name="precio"
                    onChange={this.onChange}
                    placeholder="Ingrese Precio día"
                    value={precio}
                  />
                </Form.Item>
              )}

              <Form.Item
                validateStatus={FRError ? "error" : ""}
                help={FRError || ""}
                label="FR"
              >
                <Tooltip title="Factor de Rendimiento">
                  <Input
                    name="FR"
                    onChange={this.onChange}
                    value={FR}
                    placeholder="Ingrese FR"
                  />
                </Tooltip>
              </Form.Item>
              <Form.Item
                validateStatus={TRMError ? "error" : ""}
                help={TRMError || ""}
                label="TRM"
              >
                <Tooltip title="Tasa Representativa del Día Sugerida">
                  <Input
                    name="TRM"
                    onChange={this.onChange}
                    value={TRM}
                    placeholder="Ingrese TRM"
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background: `#52c41a`,
                  }}
                >
                  Calcular
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

Formulario.propTypes = {
  usd: PropTypes.string,
}

Formulario.defaultProps = {
  usd: "false",
}

export default Formulario
