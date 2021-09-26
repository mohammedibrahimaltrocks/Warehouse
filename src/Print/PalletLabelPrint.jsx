/* eslint-disable react/jsx-key */
/* eslint-disable react/no-typos */
/* eslint-disable no-lonely-if */
/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable radix */
/* eslint-disable one-var */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-bitwise */
/* eslint-disable import/no-unresolved */
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
import { Row, Col } from 'react-bootstrap';
import RenderImage from './RenderImage';

class PalletNumberPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PrintCanvas: [],
      viewheader: false,
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      PrintCanvas: newProps.PrintLabel,
      viewheader: newProps.viewheader,
    });
  }

  render() {
    return (
      <div style={{ marginLeft: '5%', marginTop: '5%' }}>
        <h2 style={{ textAlign: 'center' }}>PALLET Number</h2>
        {this.state.PrintCanvas.map(function (item, i) {
          var j = 0;
          if (i % 2 === 0) {
            if (
              (i + 2) % 20 === 0 &&
              i !== 0 &&
              i + 1 !== this.state.PrintCanvas.length
            ) {
              if (
                i + 1 < this.state.PrintCanvas.length &&
                (j !== i || j === 0)
              ) {
                j = i + 1;
                return (
                  <div>
                    <Row style={{ paddingTop: '3%' }}>
                      <Col>
                        <RenderImage.ImageRender
                          BarCodetxt={this.state.PrintCanvas[i]}
                          idv={'mycanvas' + i}
                          viewheader={this.state.viewheader}
                        />
                      </Col>
                      <Col>
                        <RenderImage.ImageRender
                          BarCodetxt={this.state.PrintCanvas[i + 1]}
                          idv={'mycanvas' + i + 1}
                          viewheader={this.state.viewheader}
                        />
                      </Col>
                    </Row>
                    <div
                      className="pagebreak"
                      style={{ paddingBottom: '5%' }}
                    ></div>
                  </div>
                );
              } else {
                return (
                  <div>
                    <Row style={{ paddingTop: '3%' }}>
                      <Col>
                        <RenderImage.ImageRender
                          BarCodetxt={this.state.PrintCanvas[i]}
                          idv={'mycanvas' + i}
                          viewheader={this.state.viewheader}
                        />
                      </Col>
                    </Row>
                    <div
                      className="pagebreak"
                      style={{ paddingBottom: '5%' }}
                    ></div>
                  </div>
                );
              }
            } else {
              if (
                i + 1 < this.state.PrintCanvas.length &&
                (j !== i || j === 0)
              ) {
                j = i + 1;
                return (
                  <Row style={{ paddingTop: '3%' }}>
                    <Col>
                      <RenderImage.ImageRender
                        BarCodetxt={this.state.PrintCanvas[i]}
                        idv={'mycanvas' + i}
                        viewheader={this.state.viewheader}
                      />
                    </Col>
                    <Col>
                      <RenderImage.ImageRender
                        BarCodetxt={this.state.PrintCanvas[i + 1]}
                        idv={'mycanvas' + i + 1}
                        viewheader={this.state.viewheader}
                      />
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Row style={{ paddingTop: '3%' }}>
                    <Col>
                      <RenderImage.ImageRender
                        BarCodetxt={this.state.PrintCanvas[i]}
                        idv={'mycanvas' + i}
                        viewheader={this.state.viewheader}
                      />
                    </Col>
                  </Row>
                );
              }
            }
          }
        }, this)}

        {this.state.PrintCanvas.map(function (itemcode, j) {
          console.log('log ' + itemcode);
          return (
            <RenderImage.SingleImageRender
              BarCodetxt={itemcode}
              idv={'myscanvas' + j}
            />
          );
        }, this)}
      </div>
    );
  }
}
export default PalletNumberPrint;
