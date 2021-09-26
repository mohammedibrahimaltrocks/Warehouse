/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable operator-assignment */
/* eslint-disable vars-on-top */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  FormLabel,
  FormControl,
  Modal,
  Jumbotron,
  Form,
} from 'react-bootstrap';
import BlockUi from 'react-block-ui';
import {
  DataGrid,
  getThemePaletteMode,
  GridColDef,
} from '@material-ui/data-grid';
import { withAlert } from 'react-alert';
import UserProfile from '../Models/UserSession';
import customerModel from '../Models/CustomerModel';

import { types, getWindowDimensions } from '../Common/Common';

// const columns: GridColDef[] = customerModel.CustomerGridHeader();
const options = {
  filterType: "checkbox",
};

let stylecode = {
  bordercolor: "none",
};
var Invalidstylecode = {
  bordercolor: "red",
};

class Customer extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      Customername: "",
      Customercode: "",
      Description: "",
      id: "",
      buttonDisabled: false,
      status: true,
      rows: [],
      ScreenHeight: "",
      selectionOrder: [],
      errors: {},
      Cusnamestylecss: {},
      Cuscodestylecss: {},
      Cusdesstylecss: {},
      Cusstatusstylecss: {},
      columns: [],
    };

    this.onChangeOfInput = this.onChangeOfInput.bind(this);
    this.RadioButtonClick = this.RadioButtonClick.bind(this);
    this.SaveCustomer = this.SaveCustomer.bind(this);
    this.GetSelectedOrder = this.GetSelectedOrder.bind(this);
    this.ValidTextBox = this.ValidTextBox.bind(this);
    this.ClearData = this.ClearData.bind(this);
    this.Alert = props.alert;
    this.DisplayAlert = this.DisplayAlert.bind(this);
    this.EditCustomer = this.EditCustomer.bind(this);
    this.DeleteCustomer = this.DeleteCustomer.bind(this);
    this.LoadGridData = this.LoadGridData.bind(this);
    this.ClearData = this.ClearData.bind(this);
  }

  componentDidMount = async () => {
    this.setState({
      columns: customerModel.CustomerGridHeader(),
    });
    await this.LoadGridData();
    var size = getWindowDimensions();
    size.height = size.height / 2;
    this.setState({ ScreenHeight: size.height });
    this.ValidTextBox();
  };

  LoadGridData = async () => {
    var data = await customerModel.GetAllCustomers();
    this.setState({
      rows: data,
    });
  };
  EditCustomer = async () => {
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        "Not Possible to Edit more than one customer!!",
        types.INFO
      );
      return;
    } else if (this.state.selectdata.length < 1) {
      this.DisplayAlert("Select a customer to Edit", types.INFO);
      return;
    }
    var customer = this.state.rows.find((f) => {
      return f.customer_id === this.state.selectdata[0];
    });

    this.setState({
      Customername: customer.customer_name,
      Customercode: customer.customer_code,
      Description: customer.description,
      buttonDisabled: customer.isActive === "1" ? true : false,
      id: customer.customer_id,
    });
  };

  DeleteCustomer = async () => {
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        "Not Possible to Edit more than one customer!!",
        types.INFO
      );
      return;
    } else if (this.state.selectdata.length < 1) {
      this.DisplayAlert("Select a customer to Edit", types.INFO);
      return;
    }
    this.BlockUI();
    var res = await customerModel.DeleteCustomerById(this.state.selectdata[0]);
    if (!res.toLowerCase().includes("failed")) {
      this.DisplayAlert(res, types.SUCCESS);
    } else {
      this.DisplayAlert(res, types.ERROR);
    }
    this.UnBlockUI();
  };
  ValidTextBox() {
    this.setState({
      Cusnamestylecss: stylecode,
      Cuscodestylecss: stylecode,
      Cusdesstylecss: stylecode,
      Cusstatusstylecss: stylecode,
    });
  }
  RadioButtonClick = function () {
    if (this.state.buttonDisabled) {
      this.setState({ buttonDisabled: false, status: false });
    } else {
      this.setState({ buttonDisabled: true, status: true });
    }
  };
  onChangeOfInput = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  ClearData() {
    this.setState({
      Customername: "",
      Customercode: "",
      Description: "",
      errors: {},
    });
  }
  SaveCustomer = async () => {
    this.BlockUI();
    var error = {};
    var iserror = true;
    if (this.state.Customercode === "") {
      error["Customercode"] = "Customer Code cannot be empty";
      iserror = false;
      this.UnBlockUI();
    }
    if (this.state.Customername === "") {
      error["Customername"] = "Customer Name cannot be empty";
      iserror = false;
      this.UnBlockUI();
    }
    if (this.state.Description === "") {
      error["Description"] = "Description cannot be empty";
      iserror = false;
      this.UnBlockUI();
    }
    this.setState({ errors: error });
    if (iserror) {
      var bodyobj = {
        customer_name: this.state.Customername,
        customer_code: this.state.Customercode,
        description: this.state.Description,
        isActive: this.state.status === true ? "1" : "0",
        id: "",
      };
      var res = await customerModel.UCCustomer(bodyobj, this.state.id);

      if (!res.includes("failed")) {
        this.ClearData();
        this.DisplayAlert(res, types.SUCCESS);
      } else {
        this.DisplayAlert(res, types.ERROR);
      }
    }
    await this.LoadGridData();
    this.UnBlockUI();
  };

  DisplayAlert(msg, type) {
    this.Alert.show(msg, {
      timeout: 5000, // custom timeout just for this one alert
      type: type,
    });
  }
  BlockUI() {
    this.setState({ blocking: true });
  }
  UnBlockUI() {
    this.setState({ blocking: false });
  }
  GetSelectedOrder(selectdata) {
    this.setState({ selectdata: selectdata });
  }
  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-md-10">
        <Jumbotron
          style={{ marginbottom: ".5rem !important" }}
          className="jumbotronpadding"
        >
          <h5 className="HeaderText" style={{ textAlign: "center" }}>
            Customer
          </h5>
        </Jumbotron>
        <Jumbotron className="jumbotronpadding">
          <Row className="form-group form-groupmb">
            <Col md={1}>
              <FormLabel size="sm">Customer Name</FormLabel>
            </Col>
            <Col md={2}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="Customername"
                value={this.state.Customername}
                size="sm"
                style={this.state.Cusnamestylecss}
               />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.Customername}</span>
            </Col>

            <Col md={1}>
              <FormLabel>Customer Code</FormLabel>
            </Col>
            <Col md={2}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="Customercode"
                value={this.state.Customercode}
                style={this.state.Cuscodestylecss}
               />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.Customercode}</span>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={1}>
              <FormLabel>Description</FormLabel>
            </Col>
            <Col md={2}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="Description"
                value={this.state.Description}
                style={this.state.Cusdesstylecss}
               />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.Description}</span>
            </Col>
            <Col md={1}>
              <FormLabel>Status</FormLabel>
            </Col>
            <Col md={2}>
              <ButtonGroup
                aria-label="Basic example"
                className="mb-2"
                style={this.state.Cusstatusstylecss}
              >
                <Button
                  variant="secondary"
                  disabled={!this.state.buttonDisabled}
                  onClick={this.RadioButtonClick}
                >
                  Active
                </Button>
                <Button
                  variant="secondary"
                  disabled={this.state.buttonDisabled}
                  onClick={this.RadioButtonClick}
                >
                  InActive
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={2}>
              <Button variant="light" onClick={this.SaveCustomer}>
                Save
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="light" onClick={this.ClearData}>
                Clear
              </Button>
            </Col>
          </Row>
        </Jumbotron>
        <Row className="justify-content-end">
          <Col md={3}>
            <Button onClick={this.EditCustomer} variant="light">
              Edit
            </Button>
          </Col>
          <Col md={3}>
            <Button variant="light" onClick={this.DeleteCustomer}>
              Delete
            </Button>
          </Col>
        </Row>
        <Row className="form-group form-groupmb">
          <div
            style={{
              height: this.state.ScreenHeight,
              width: "100%",
              paddingTop: "1%",
            }}
          >
            <DataGrid
              checkboxSelection
              rows={this.state.rows}
              columns={this.state.columns}
              options={options}
              getRowId={(r) => r.customer_id}
              pageSize={25}
              onSelectionModelChange={(newSelection) => {
                this.GetSelectedOrder(newSelection);
              }}
              selectionModel={this.state.selectionOrder}
              onRowClick={(params, event) => {
                if (!event.ignore) {
                  console.log("push -> /roles/" + params.row.customer_id);
                  //this.RowEvent(params.row.id);
                }
              }}
            />
          </div>
        </Row>
        <Row className="form-group form-groupmb">
          <span>Number of Records Load : {this.state.rows.length}</span>
        </Row>
      </BlockUi>
    );
  }
}
export default withAlert()(Customer);
