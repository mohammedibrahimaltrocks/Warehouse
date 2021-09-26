/* eslint-disable no-lonely-if */
/* eslint-disable react/self-closing-comp */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable func-names */
/* eslint-disable react/no-deprecated */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RenderImage from '../Print/RenderImage';

class LabelPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Headertext: '',
      PalletNumber: '',
      Partnumber: '',
      MasterSerial: [],
      TwoDPrint: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      Headertext: newProps.Headertext,
      PalletNumber: newProps.PalletNumber,
      Partnumber: newProps.Partnumber,
      MasterSerial: newProps.MasterSerial,
      TwoDPrint: newProps.TwoDPrint,
    });
  }
  render() {
    return (
      <div>
        <div
          style={{
            background: 'black',
            marginBottom: '1%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: 'white' }}>{this.state.PalletNumber}</h1>
        </div>
        <Row>
          <Col>
            <RenderImage.ImageRender
              BarCodetxt={this.state.PalletNumber}
              idv="PalletNumber"
              BarcodeText=""
              viewheader="false"
            />
          </Col>
          <Col>
            <RenderImage.ImageRender
              BarCodetxt={this.state.Partnumber}
              idv="Partnumber"
              BarcodeText=""
              viewheader="false"
            />
          </Col>
        </Row>
        <hr />
        {!this.state.TwoDPrint ? (
          <Row style={{ marginLeft: '1%' }}>
            {this.state.MasterSerial.map(
              function (item, i) {
                var j = 0;
                if (i % 2 === 0) {
                  if (
                    (i + 2) % 20 === 0 &&
                    i !== 0 &&
                    i + 1 !== this.state.MasterSerial.length
                  ) {
                    if (
                      i + 1 < this.state.MasterSerial.length &&
                      (j !== i || j === 0)
                    ) {
                      j = i + 1;
                      return (
                        <div>
                          <Row
                            style={{ paddingTop: '1%' }}
                            className="justify-content-center"
                          >
                            <Col>
                              <RenderImage.ImageRender
                                BarCodetxt={this.state.MasterSerial[i]}
                                idv={`mycanvas${i}`}
                                viewheader="false"
                              />
                            </Col>
                            <Col>
                              <RenderImage.ImageRender
                                BarCodetxt={this.state.MasterSerial[i + 1]}
                                idv={`mycanvas${i}${1}`}
                                viewheader="false"
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
                          <Row
                            style={{ paddingTop: '1%' }}
                            className="justify-content-center"
                          >
                            <Col>
                              <RenderImage.ImageRender
                                BarCodetxt={this.state.MasterSerial[i]}
                                idv={`mycanvas${i}`}
                                viewheader="false"
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
                      i + 1 < this.state.MasterSerial.length &&
                      (j !== i || j === 0)
                    ) {
                      j = i + 1;
                      return (
                        <Row
                          style={{ paddingTop: '1%' }}
                          className="justify-content-center"
                        >
                          <Col>
                            <RenderImage.ImageRender
                              BarCodetxt={this.state.MasterSerial[i]}
                              idv={`mycanvas${i}`}
                              viewheader="false"
                            />
                          </Col>
                          <Col>
                            <RenderImage.ImageRender
                              BarCodetxt={this.state.MasterSerial[i + 1]}
                              idv={`mycanvas${i}${1}`}
                              viewheader="false"
                            />
                          </Col>
                        </Row>
                      );
                    } else {
                      return (
                        <Row
                          style={{ paddingTop: '1%' }}
                          className="justify-content-center"
                        >
                          <Col>
                            <RenderImage.ImageRender
                              BarCodetxt={this.state.MasterSerial[i]}
                              idv={`mycanvas${i}`}
                              viewheader="false"
                            />
                          </Col>
                        </Row>
                      );
                    }
                  }
                }
              },

              // eslint-disable-next-line react/jsx-key
              // <div style={{ float: 'right', width: '40%', marginTop: '2%' }}>
              //   <RenderImage.ImageRender
              //     BarCodetxt={item}
              //     idv={`mycanvas${  i}`}
              //     BarcodeText=""
              //     viewheader="false"
              //   />
              // </div>
              this
            )}
          </Row>
        ) : (
          <RenderImage.ImageRender2D
            BarCodetxt={this.state.MasterSerial.join(';')}
            idv="2Dmycanvas"
            BarcodeText=""
            viewheader="false"
          />
        )}
      </div>
    );
  }
}
export default LabelPrint;
