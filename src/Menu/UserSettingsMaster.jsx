/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
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
import { DataGrid } from '@material-ui/data-grid';
import { Row, Col, Button, Jumbotron, Modal } from 'react-bootstrap';
import BlockUi from 'react-block-ui';
import { withAlert } from 'react-alert';
import SystemUserModel from '../Models/SystemUserModel';
import AccessGroupModel from '../Models/AccessGroupModel';
import DepartmentModel from '../Models/DepartmentModel';
import PrinterModel from '../Models/PrinterModel';
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from '../Common/Common';

const options = {
  filterType: 'checkbox',
};
//const columns: GridColDef[] = SystemUserModel.UserSettingDisplayColumn();

class UserSettingsMaster extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      columns: [],
      rows: [],
      selectionModel: [],
      AccessGroupItem: [],
      DepartmentItem: [],
      PrintersItem: [],
      id: 0,
      userId: '',
      Active: 1,
      username: '',
      LastPassword: '',
      Password: '',
      Department: '',
      AccessGroup: '',
      DefaultPrinter: '',
      description: '',
      remark: '',
      errors: {},
      blocking: true,
      Showalert: false,
      AlertMessage: '',
      IsUseridEnable: false,
      Buttonname: 'Save',
    };

    this.Alert = props.alert;
    this.LoadGridData = this.LoadGridData.bind(this);
    this.ShowAddUser = this.ShowAddUser.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.GetSelectedUser = this.GetSelectedUser.bind(this);
    this.DeleteSelectedUser = this.DeleteSelectedUser.bind(this);
    this.OnChangeSelect = this.OnChangeSelect.bind(this);
    this.handleinput = this.handleinput.bind(this);
    this.HandleSaveUser = this.HandleSaveUser.bind(this);
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
    this.EditSelectedUser = this.EditSelectedUser.bind(this);
    this.RefreshData = this.RefreshData.bind(this);
    this.ClearData = this.ClearData.bind(this);
    this.LoadGridData();
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {};

  }
  componentDidMount(){
    this.setState({
      columns: SystemUserModel.UserSettingDisplayColumn(),
    });
  }
  OnChangeSelect(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleinput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  LoadDropDownData = async () => {
    var AccessGroupd = await AccessGroupModel.GetAllAccessGroups();
    var departmentd = await DepartmentModel.GetAllDepartment();
    var Printerd = await PrinterModel.GetAllPrinter();
    this.setState({
      Department: departmentd.lenght > 0 ? departmentd[0].department_id : '',
      DefaultPrinter: Printerd.lenght > 0 ? Printerd[0].printer_id : '',
      AccessGroup: AccessGroupd.length > 0 ? AccessGroupd[0].group_id : '',
      AccessGroupItem: AccessGroupd,
      DepartmentItem: departmentd,
      PrintersItem: Printerd,
    });
  };
  LoadGridData = async () => {
    //this.BlockUI();
    var row = await SystemUserModel.GetUserDetail();
    this.setState({
      rows: row,
    });
    await this.LoadDropDownData();
    this.UnBlockUI();
  };
  RefreshData = async () => {
    this.BlockUI();
    await this.LoadGridData();
    this.UnBlockUI();
  };

  BlockUI() {
    this.setState({ blocking: true });
  }
  UnBlockUI() {
    this.setState({ blocking: false });
  }

  HandleSaveUser = async () => {
    if (this.validateUser()) {
      this.handleClose();
      this.BlockUI();
      var message = await SystemUserModel.AddByUpdateUser(
        this.state.id,
        this.state
      );
      this.ClearData();
      this.setState({
        AlertMessage: message,
        Showalert: true,
        id: 0,
        userId: '',
        Active: 1,
        username: '',
        LastPassword: '',
        Password: '',
        Department: '',
        DefaultPrinter: '',
        AccessGroup: '',
        description: '',
        remark: '',
        IsUseridEnable: false,
        Buttonname: 'Save',
      });
      await this.LoadGridData();
      this.UnBlockUI();
    }
  };

  ClearData() {
    this.setState({
      id: 0,
      userId: '',
      Active: 1,
      username: '',
      LastPassword: '',
      Password: '',
      Department: this.state.DepartmentItem[0].department_id,
      DefaultPrinter: this.state.PrintersItem[0].printer_id,
      AccessGroup: this.state.AccessGroupItem[0].group_id,
      description: '',
      remark: '',
      IsUseridEnable: false,
      Buttonname: 'Save',
    });
    var error = {};
    error.description = '';
    error.userId = '';
    error.Password = '';
    error.username = '';
    error.userId = '';
    this.setState({ errors: error });
  }
  validateUser() {
    var error = {};
    var isvalidate = true;
    if (this.state.userId === '') {
      error.userId = 'User Id cannot be empty';
      isvalidate = false;
    } else if (isNaN(parseInt(this.state.userId))) {
      error.userId = 'User Id must be integer';
      isvalidate = false;
    } else if (
      SystemUserModel.CheckUserId(this.state.userId) &&
      this.state.id === ''
    ) {
      error.userId = 'User Id already Exists';
      isvalidate = false;
    }
    if (this.state.username === '') {
      error.username = 'Username cannot be empty';
      isvalidate = false;
    }
    if (this.state.Password === '') {
      error.Password = 'Password cannot be empty';
      isvalidate = false;
    }
    if (this.state.description === '') {
      error.description = 'description cannot be empty';
      isvalidate = false;
    }
    this.setState({ errors: error });

    return isvalidate;
  }

  ShowAddUser() {
    this.setState({ show: true, Buttonname: 'Save' });
    this.ClearData();
  }
  handleClose() {
    this.setState({ show: false });
    this.ClearData();
  }

  handleAlertClose() {
    this.setState({ Showalert: false });
    this.UnBlockUI();
  }
  GetSelectedUser(selecteduser) {
    this.setState({ selectionModel: selecteduser });
  }
  DeleteSelectedUser = async () => {
    var message;
    this.BlockUI();
    if (this.state.selectionModel.length > 1) {
      message = 'Cannot able to delete more than one user';
      this.setState({
        AlertMessage: message,
        Showalert: true,
        selectionModel: [],
      });
    } else {
      message = await SystemUserModel.DeleteUserDetailbyId(
        this.state.selectionModel[0]
      );
      this.setState({
        AlertMessage: message,
        Showalert: true,
      });
    }
    await this.LoadGridData();
    await this.LoadDropDownData();
    this.UnBlockUI();
  };
  EditSelectedUser = async () => {
    var message = '';
    this.BlockUI();
    if (this.state.selectionModel.length > 1) {
      message = 'Cannot able to edit more than one user';
      this.setState({
        AlertMessage: message,
        Showalert: true,
        selectionModel: [],
      });
    }
    if (this.state.selectionModel.length === 0) {
      message = 'Select a user to edit';
      this.setState({
        AlertMessage: message,
        Showalert: true,
      });
    } else {
      this.setState({ id: parseInt(this.state.selectionModel[0]) });
      var Responsedata = await SystemUserModel.GetUserDetailbyId(
        this.state.selectionModel[0]
      );
      this.setState({
        id: Responsedata.id,
        userId: Responsedata.user_id,
        Active: Responsedata.isActive,
        username: Responsedata.user_name,
        Password: Responsedata.password,
        Department: Responsedata.departmentid,
        DefaultPrinter: Responsedata.Printerid,
        AccessGroup: Responsedata.Access_groupId,
        description: Responsedata.remarks,
        remark: Responsedata.isActive,
        show: true,
        IsUseridEnable: true,
        selectionModel: [],
        Buttonname: 'Update',
      });
    }
    this.UnBlockUI();
  };
  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-lg-10">
        <div>
          <Modal
            show={this.state.Showalert}
            onHide={this.handleAlertClose}
            backdrop="static"
            keyboard={false}
            size="sm"
          >
            <Modal.Header closeButton>
              <Modal.Title>Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>{this.state.AlertMessage}</div>
            </Modal.Body>
          </Modal>
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>System User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container-lg frmusr">
                <div className="row form-group">
                  <div className="col-2">
                    <label>User ID*</label>
                  </div>
                  <div className="col-3">
                    <input
                      name="userId"
                      className="form-control"
                      onChange={this.handleinput}
                      value={this.state.userId}
                      disabled={this.state.IsUseridEnable}
                    ></input>
                    <span style={{ color: 'red' }}>
                      {this.state.errors.userId}
                    </span>
                  </div>
                  <div className="col-2">IsActive</div>
                  <div className="col-3">
                    <select
                      name="Active"
                      className="browser-default custom-select"
                      onChange={this.OnChangeSelect}
                      value={this.state.Active}
                    >
                      <option value="1">Y | Active</option>
                      <option value="0">N | InActive</option>
                    </select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-2">User name</div>
                  <div className="col-3">
                    <input
                      name="username"
                      className="form-control"
                      onChange={this.handleinput}
                      value={this.state.username}
                    ></input>
                    <span style={{ color: 'red' }}>
                      {this.state.errors.username}
                    </span>
                  </div>
                  <div className="col-2">Password Last Update</div>
                  <div className="col-3">
                    <select
                      name="LastPassword"
                      className="browser-default custom-select"
                    ></select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-2">Password</div>
                  <div className="col-3">
                    <input
                      name="Password"
                      className="form-control"
                      onChange={this.handleinput}
                      value={this.state.Password}
                    ></input>
                    <span style={{ color: 'red' }}>
                      {this.state.errors.Password}
                    </span>
                  </div>
                  <div className="col-2"></div>
                  <div className="col-3"></div>
                </div>
                <div className="row form-group">
                  <div className="col-2">Department</div>
                  <div className="col-3">
                    <select
                      name="Department"
                      className="browser-default custom-select"
                      onChange={this.OnChangeSelect}
                      value={this.state.Department}
                    >
                      {this.state.DepartmentItem.map((item) => (
                        <option
                          key={item.department_id}
                          value={item.department_id}
                        >
                          {item.department_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-2">Access Group *</div>
                  <div className="col-3">
                    <select
                      name="AccessGroup"
                      className="browser-default custom-select"
                      onChange={this.OnChangeSelect}
                      value={this.state.AccessGroup}
                    >
                      {this.state.AccessGroupItem.map((item) => (
                        <option key={item.group_id} value={item.group_id}>
                          {item.group_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-3">
                    <button className="form-control">Set Access Group</button>
                  </div>
                  <div className="col"></div>
                </div>
                <div className="row form-group">
                  <div className="col-2">Default Printer</div>
                  <div className="col-8">
                    <select
                      name="DefaultPrinter"
                      className="browser-default custom-select"
                      onChange={this.OnChangeSelect}
                      value={this.state.DefaultPrinter}
                    >
                      {this.state.PrintersItem.map((item) => (
                        <option key={item.printer_id} value={item.printer_id}>
                          {item.printer_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-2">Description</div>
                  <div className="col-8">
                    <input
                      name="description"
                      className="form-control"
                      onChange={this.handleinput}
                      value={this.state.description}
                    ></input>
                    <span style={{ color: 'red' }}>
                      {this.state.errors.description}
                    </span>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-2">Remarks</div>
                  <div className="col-8">
                    <input
                      name="remark"
                      className="form-control"
                      onChange={this.handleinput}
                      value={this.state.remark}
                    ></input>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.HandleSaveUser}>
                {this.state.Buttonname}
              </Button>
            </Modal.Footer>
          </Modal>
          <Jumbotron className="jumbotronpadding" style={{ padding: '1%' }}>
            <h5 className="HeaderText" style={{ textAlign: 'center' }}>
              User Settings
            </h5>
          </Jumbotron>

          <Jumbotron className="jumbotronpadding">
            <Row className="form-group" style={{ padding: '1%' }}>
              <Col md={1}>
                <Button size="sm" onClick={this.ShowAddUser} variant="light">
                  New
                </Button>
              </Col>
              <Col md={1}>
                <Button
                  size="sm"
                  variant="light"
                  onClick={this.EditSelectedUser}
                >
                  Edit
                </Button>
              </Col>
              <Col md={1}>
                <Button
                  size="sm"
                  variant="light"
                  onClick={this.DeleteSelectedUser}
                >
                  Delete
                </Button>
              </Col>
              <Col md={1}>
                <Button size="sm" onClick={this.RefreshData} variant="light">
                  Refresh
                </Button>
              </Col>
              {/* <Col md={1}>
                <div className="float-right">
                  <Button size="sm" variant="light">
                    Exit
                  </Button>
                </div>
              </Col> */}
            </Row>
          </Jumbotron>
          <Row className="form-group">
            <div style={{ height: 525, width: '100%', paddingLeft: '2%' }}>
              <DataGrid
                checkboxSelection
                rows={this.state.rows}
                columns={this.state.columns}
                options={options}
                pageSize={25}
                onSelectionModelChange={(newSelection) => {
                  this.GetSelectedUser(newSelection);
                }}
                selectionModel={this.state.selectionModel}
              />
            </div>
          </Row>
        </div>
      </BlockUi>
    );
  }
}
export default UserSettingsMaster;
