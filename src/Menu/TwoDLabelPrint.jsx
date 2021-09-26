/* eslint-disable react/jsx-key */
/* eslint-disable spaced-comment */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RenderImage from '../Print/RenderImage';

class TwoDLabelPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Headertext: '',
      PalletNumber: '',
      Partnumber: '',
      MasterSerial: [],
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      Headertext: newProps.Headertext,
      PalletNumber: newProps.PalletNumber,
      Partnumber: newProps.Partnumber,
      MasterSerial: newProps.MasterSerial,
    });
  }
  render() {
    return (
      <div>
        <Row style={{ background: 'black', marginBottom: '10px' }}>
          <Col>
            <h1 style={{ color: 'white' }}>{this.state.PalletNumber}</h1>
          </Col>
        </Row>
        <Row style={{ paddingLeft: '5%' }}>
          <div style={{ float: 'right', width: '30%' }}>
            {' '}
            <RenderImage.ImageRender
              BarCodetxt={this.state.PalletNumber}
              idv="PalletNumber"
              BarcodeText=""
              viewheader="false"
            />
          </div>
          <div style={{ float: 'right', width: '30%' }}>
            {' '}
            <RenderImage.ImageRender
              BarCodetxt={this.state.Partnumber}
              idv="Partnumber"
              BarcodeText=""
              viewheader="false"
            />
          </div>
        </Row>
        <hr></hr>
        <Row style={{ paddingLeft: '5%', textAlign: 'center' }}>
          {this.state.MasterSerial.map((item, i) => (
            <div style={{ float: 'right', width: '100%', marginTop: '5%' }}>
              <RenderImage.ImageRender2D
                BarCodetxt={item}
                idv={'2dmycanvas' + i}
                BarcodeText=""
                viewheader="false"
              />
            </div>
          ))}
        </Row>
      </div>
    );
  }
}
export default TwoDLabelPrint;
