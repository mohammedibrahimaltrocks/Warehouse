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
import React, { Component } from "react";
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
} from "react-bootstrap";
import BlockUi from "react-block-ui";
import UserProfile from "../Models/UserSession";
import DepartmentModel from "../Models/DepartmentModel";
import { DataGrid, getThemePaletteMode } from "@material-ui/data-grid";
import { withAlert } from "react-alert";
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from "../Common/Common";
// const columns: GridColDef[] = DepartmentModel.DepartmentGridHeader();
const options = {
  filterType: "checkbox",
};
class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      id: "",
      DepartmentName: "",
      status: true,
      rows: [],
      ScreenHeight: "",
      selectionOrder: [],
      errors: {},
      Departmentnamestylecss: {},
      selectdata: [],
      columns: [],
    };

    this.Alert = props.alert;
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
    this.EditDepartment = this.EditDepartment.bind(this);
    this.SaveDepartment = this.SaveDepartment.bind(this);
    this.onChangeOfInput = this.onChangeOfInput.bind(this);
    this.DeleteDepartment = this.DeleteDepartment.bind(this);
    this.ValidTextStyle = this.ValidTextStyle.bind(this);
    this.ClearData = this.ClearData.bind(this);
    this.DisplayAlert = this.DisplayAlert.bind(this);
  }
  ClearData() {
    this.setState({
      DepartmentName: "",
      id: "",
    });
  }
  componentDidMount = async () => {
    this.BlockUI();
    this.setState({
      columns: DepartmentModel.DepartmentGridHeader(),
    });
    await this.LoadGridData();
    var size = getWindowDimensions();
    size.height = size.height / 2 + 80;
    this.setState({ ScreenHeight: size.height });
    this.ValidTextStyle();
    this.UnBlockUI();
  };

  LoadGridData = async () => {
    var griddata = await DepartmentModel.GetAllDepartments();
    this.setState({
      rows: griddata,
    });
  };
  ValidTextStyle() {
    this.setState({
      Departmentnamestylecss: stylecode,
    });
  }
  EditDepartment = async () => {
    this.BlockUI();
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        "Not Possible to Edit more than one Department!!",
        types.INFO
      );
    } else if (this.state.selectdata.length < 1) {
      this.DisplayAlert("Select a Department to Edit", types.INFO);
    }
    var DepartmentData = this.state.rows.find((f) => {
      return f.department_id === this.state.selectdata[0];
    });

    this.setState({
      DepartmentName: DepartmentData.department_name,
      id: DepartmentData.department_id,
    });
    this.UnBlockUI();
  };
  DeleteDepartment = async () => {
    this.BlockUI();
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        "Not Possible to Delete more than one Department!!",
        types.INFO
      );
      return;
    } else if (this.state.selectdata.length < 1) {
      this.DisplayAlert("Select a Printer to Department", types.INFO);
    }

    var res = await DepartmentModel.DeleteDepartmentById(
      this.state.selectdata[0]
    );
    if (!res.toLowerCase().includes("failed")) {
      this.ClearData();
      await this.LoadGridData();
      this.DisplayAlert(res, types.SUCCESS);
    } else {
      this.DisplayAlert(res, types.ERROR);
    }
    this.UnBlockUI();
  };
  SaveDepartment = async () => {
    this.BlockUI();
    var error = {};
    var iserror = true;
    if (this.state.DepartmentName === "") {
      error["DepartmentName"] = "Department Name cannot be empty";
      iserror = false;
    }

    this.setState({ errors: error });
    if (iserror) {
      this.ValidTextStyle();
      var bodyobj = {
        department_name: this.state.DepartmentName,
      };
      var res = await DepartmentModel.UCDepartment(bodyobj, this.state.id);
      if (!res.includes("failed")) {
        this.ClearData();
        this.DisplayAlert(res, types.SUCCESS);
        await this.LoadGridData();
        this.UnBlockUI();
      } else {
        this.DisplayAlert(res, types.ERROR);
      }
    } else {
      this.UnBlockUI();
    }
  };
  GetSelectedOrder(selectdata) {
    this.setState({ selectdata: selectdata });
  }
  DisplayAlert(msg, type) {
    this.Alert.show(msg, {
      timeout: 5000,
      type: type,
    });
  }
  BlockUI() {
    this.setState({ blocking: true });
  }
  onChangeOfInput = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  UnBlockUI() {
    this.setState({ blocking: false });
  }
  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-md-10">
        <Jumbotron
          style={{ marginbottom: ".5rem !important" }}
          className="jumbotronpadding"
        >
          <h5 className="HeaderText" style={{ textAlign: "center" }}>
            Department
          </h5>
        </Jumbotron>
        <Jumbotron className="jumbotronpadding">
          <Row className="form-group form-groupmb">
            <Col md={2}>
              <FormLabel size="sm">Department Name</FormLabel>
            </Col>
            <Col md={3}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="DepartmentName"
                value={this.state.DepartmentName}
                size="sm"
                style={this.state.DepartmentNamestylecss}
               />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.DepartmentName}</span>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={2}>
              <Button variant="light" onClick={this.SaveDepartment}>
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
          <Col>
            <Button onClick={this.EditDepartment} variant="light">
              Edit
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={this.DeleteDepartment}>
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
              getRowId={(r) => r.department_id}
              pageSize={25}
              onSelectionModelChange={(newSelection) => {
                this.GetSelectedOrder(newSelection);
              }}
              selectionModel={this.state.selectionOrder}
              onRowClick={(params, event) => {
                if (!event.ignore) {
                  console.log(`push -> /roles/${  params.row.department_id}`);
                  // this.RowEvent(params.row.id);
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
export default withAlert()(Department);
