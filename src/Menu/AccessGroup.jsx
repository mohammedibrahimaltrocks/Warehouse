/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
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
import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';
import { withAlert } from 'react-alert';
import UserProfile from '../Models/UserSession';
import AccessGroupModel from '../Models/AccessGroupModel';
import { types } from '../Common/Common';

// const columns: GridColDef[] = AccessGroupModel.AccessGroupGridHeader();

const options = {
  filterType: 'checkbox',
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const stylecode = {
  bordercolor: 'none',
};
const Invalidstylecode = {
  bordercolor: 'red',
};

class AccessGroup extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      Groupname: '',
      Description: '',
      id: '',
      // eslint-disable-next-line react/no-unused-state
      buttonDisabled: false,
      // eslint-disable-next-line react/no-unused-state
      status: true,
      rows: [],
      ScreenHeight: '',
      selectionOrder: [],
      errors: {},
      AccGrpnamestylecss: {},
      AccGrpDesstylecss: {},
      columns: [],
    };
    this.state.columns = AccessGroupModel.AccessGroupGridHeader();
    this.onChangeOfInput = this.onChangeOfInput.bind(this);
    this.SaveAccessGroup = this.SaveAccessGroup.bind(this);
    this.GetSelectedOrder = this.GetSelectedOrder.bind(this);
    this.ValidTextBox = this.ValidTextBox.bind(this);
    this.ClearData = this.ClearData.bind(this);
    // eslint-disable-next-line react/prop-types
    this.Alert = props.alert;
    this.DisplayAlert = this.DisplayAlert.bind(this);
    this.EditAccessGroup = this.EditAccessGroup.bind(this);
    this.DeleteAccessGroup = this.DeleteAccessGroup.bind(this);
    this.LoadGridData = this.LoadGridData.bind(this);
    this.ClearData = this.ClearData.bind(this);
  }

  componentDidMount = async () => {
    await this.LoadGridData();
    const size = getWindowDimensions();
    // eslint-disable-next-line operator-assignment
    size.height = size.height / 2;
    this.setState({ ScreenHeight: size.height });
    this.ValidTextBox();
  };

  LoadGridData = async () => {
    const data = await AccessGroupModel.GetAllAccessGroups();
    this.setState({
      rows: data,
    });
  };

  EditAccessGroup = async () => {
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        'Not Possible to Edit more than one Access Group!!',
        types.INFO
      );
      return;
    }
    if (this.state.selectdata.length < 1) {
      this.DisplayAlert('Select a Access Group to Edit', types.INFO);
      return;
    }
    const AccessGroup = this.state.rows.find((f) => {
      return f.group_id === this.state.selectdata[0];
    });

    this.setState({
      Groupname: AccessGroup.group_name,
      Description: AccessGroup.description,
      id: AccessGroup.group_id,
    });
  };

  DeleteAccessGroup = async () => {
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        'Not Possible to Edit more than one Access Group!!',
        types.INFO
      );
      return;
    }
    if (this.state.selectdata.length < 1) {
      this.DisplayAlert('Select a AccessGroup to Edit', types.INFO);
      return;
    }
    this.BlockUI();
    const res = await AccessGroupModel.DeleteAccessGroupById(
      this.state.selectdata[0]
    );
    if (!res.toLowerCase().includes('failed')) {
      this.ClearData();
      this.DisplayAlert(res, types.SUCCESS);
    } else {
      this.DisplayAlert(res, types.ERROR);
    }
    this.UnBlockUI();
  };

  ValidTextBox() {
    this.setState({
      AccGrpnamestylecss: stylecode,
      AccGrpDesstylecss: stylecode,
    });
  }

  onChangeOfInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  ClearData() {
    this.setState({
      Groupname: '',
      Description: '',
      errors: {},
      id: '',
    });
  }

  SaveAccessGroup = async () => {
    this.BlockUI();
    const error = {};
    let iserror = true;
    if (this.state.Groupname === '') {
      error.Groupname = 'Group Name cannot be empty';
      iserror = false;
      this.UnBlockUI();
    }
    if (this.state.Description === '') {
      error.Description = 'Description cannot be empty';
      iserror = false;
      this.UnBlockUI();
    }
    this.setState({ errors: error });
    if (iserror) {
      const bodyobj = {
        group_name: this.state.Groupname,
        description: this.state.Description,
      };
      const res = await AccessGroupModel.UCAccessGroup(bodyobj, this.state.id);

      if (!res.includes('failed')) {
        this.ClearData();
        this.DisplayAlert(res, types.SUCCESS);
      } else {
        this.DisplayAlert(res, types.ERROR);
      }
    }
    await this.LoadGridData();
    this.ClearData();
    this.UnBlockUI();
  };

  DisplayAlert(msg, type) {
    this.Alert.show(msg, {
      timeout: 5000,
      type,
    });
  }

  BlockUI() {
    this.setState({ blocking: true });
  }

  UnBlockUI() {
    this.setState({ blocking: false });
  }

  GetSelectedOrder(selectdata) {
    this.setState({ selectdata });
  }

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-md-10">
        <Jumbotron
          style={{ marginbottom: '.5rem !important' }}
          className="jumbotronpadding"
        >
          <h5 className="HeaderText" style={{ textAlign: 'center' }}>
            Customer
          </h5>
        </Jumbotron>
        <Jumbotron className="jumbotronpadding">
          <Row className="form-group form-groupmb">
            <Col md={2}>
              <FormLabel size="sm">AccessGroup Name</FormLabel>
            </Col>
            <Col md={3}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="Groupname"
                value={this.state.Groupname}
                size="sm"
                style={this.state.AccGrpnamestylecss}
              />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.Groupname}</span>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={2}>
              <FormLabel>Description</FormLabel>
            </Col>
            <Col md={3}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="Description"
                value={this.state.Description}
                style={this.state.AccGrpDesstylecss}
              />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.Description}</span>
            </Col>
          </Row>

          <Row className="rowmargin form-group form-groupmb">
            <Col md={2}>
              <Button variant="light" onClick={this.SaveAccessGroup}>
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
            <Button onClick={this.EditAccessGroup} variant="light">
              Edit
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={this.DeleteAccessGroup}>
              Delete
            </Button>
          </Col>
        </Row>
        <Row className="form-group form-groupmb">
          <div
            style={{
              height: this.state.ScreenHeight,
              width: '100%',
              paddingTop: '1%',
            }}
          >
            <DataGrid
              checkboxSelection
              rows={this.state.rows}
              columns={this.state.columns}
              options={options}
              getRowId={(r) => r.group_id}
              pageSize={25}
              onSelectionModelChange={(newSelection) => {
                this.GetSelectedOrder(newSelection);
              }}
              selectionModel={this.state.selectionOrder}
              onRowClick={(params, event) => {
                if (!event.ignore) {
                  console.log(`push -> /roles/${params.row.group_id}`);
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
export default withAlert()(AccessGroup);
