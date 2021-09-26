/* eslint-disable jsx-a11y/control-has-associated-label */
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
import { DataGrid } from '@material-ui/data-grid';
import {
  Container,
  Row,
  Col,
  Button,
  Jumbotron,
  FormLabel,
} from 'react-bootstrap';
import BlockUi from 'react-block-ui';
import { withAlert } from 'react-alert';
import SystemConfigModel from '../Models/SystemConfigModel';
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from '../Common/Common';

//const columns: GridColDef[] = SystemConfigModel.SystemConfigDisplayColumn();

const options = {
  filterType: 'checkbox',
};

class SystemConfiguraton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      rows: [],
      columns: [],
    };
    this.setState({
      columns: SystemConfigModel.SystemConfigDisplayColumn(),
    });
    this.Alert = props.alert;
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
  }
  BlockUI() {
    this.setState({ blocking: true });
  }
  UnBlockUI() {
    this.setState({ blocking: false });
  }
  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-md-9">
        <Container className="p-3">
          {' '}
          <Jumbotron
            style={{ padding: '1%', marginbottom: '.5rem !important' }}
          >
            <h3 className="HeaderText">System Configure</h3>
          </Jumbotron>
          <Row>
            <Col md={1}>
              <Button variant="light">Save</Button>
            </Col>
            <Col md={1}>
              <Button variant="light">Refresh</Button>
            </Col>
            <Col md={1}>
              <Button variant="light">Exit</Button>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormLabel>Configure :</FormLabel>
            </Col>
            <Col md={3}>
              <select className="form-control"></select>
            </Col>
            <Col>
              <Button variant="light">Input Box</Button>
            </Col>
            <Col>
              <Button variant="light">New</Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid
              checkboxSelection
              rows={this.state.rows}
              columns={this.state.columns}
              options={options}
              pageSize={25}
            ></DataGrid>
          </div>
        </Container>
      </BlockUi>
    );
  }
}

export default SystemConfiguraton;
