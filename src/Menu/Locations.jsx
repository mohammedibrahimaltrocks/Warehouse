/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
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
import LocationModel from '../Models/LocationModel';
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from '../Common/Common';

// const columns: GridColDef[] = LocationModel.LocationGridHeader();
const options = {
  filterType: 'checkbox',
};
class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      id: '',
      LocationName: '',
      Occupied: '',
      QrCode: '',
      status: true,
      rows: [],
      ScreenHeight: '',
      selectionOrder: [],
      errors: {},
      LocationNamestylecss: {},
      LocationOccupiedstylecss: {},
      LocationQRCodestylecss: {},
      selectdata: [],
      columns: [],
    };
    this.Alert = props.alert;
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
    this.EditLocation = this.EditLocation.bind(this);
    this.SaveLocation = this.SaveLocation.bind(this);
    this.onChangeOfInput = this.onChangeOfInput.bind(this);
    this.DeleteLocation = this.DeleteLocation.bind(this);
    this.ValidTextStyle = this.ValidTextStyle.bind(this);
    this.ClearData = this.ClearData.bind(this);
    this.DisplayAlert = this.DisplayAlert.bind(this);
    this.onChangeOfInput = this.onChangeOfInput.bind(this);
  }

  ClearData() {
    this.setState({
      LocationName: '',
      QrCode: '',
      Occupied: '',
      id: '',
    });
  }

  componentDidMount = async () => {
    this.BlockUI();
    this.setState({
      columns: LocationModel.LocationGridHeader(),
    });
    await this.LoadGridData();
    const size = getWindowDimensions();
    size.height = size.height / 2 + 80;
    this.setState({ ScreenHeight: size.height });
    this.ValidTextStyle();
    this.UnBlockUI();
  };

  LoadGridData = async () => {
    const griddata = await LocationModel.GetAllLocation();
    this.setState({
      rows: griddata,
    });
  };

  ValidTextStyle() {
    this.setState({
      LocationNamestylecss: stylecode,
      LocationOccupiedstylecss: stylecode,
      LocationQRCodestylecss: stylecode,
    });
  }

  EditLocation = async () => {
    this.BlockUI();
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        'Not Possible to Edit more than one Location!!',
        types.INFO
      );
    } else if (this.state.selectdata.length < 1) {
      this.DisplayAlert('Select a Location to Edit', types.INFO);
    }
    const LocationData = this.state.rows.find((f) => {
      return f.location_id === this.state.selectdata[0];
    });

    this.setState({
      LocationName: LocationData.location_name,
      id: LocationData.location_id,
      QrCode: LocationData.qrcode,
      Occupied: LocationData.occupied,
    });
    this.UnBlockUI();
  };

  DeleteLocation = async () => {
    this.BlockUI();
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        'Not Possible to Delete more than one Location!!',
        types.INFO
      );
      return;
    }
    if (this.state.selectdata.length < 1) {
      this.DisplayAlert('Select a Location to Location', types.INFO);
    }

    const res = await LocationModel.DeleteLocationById(
      this.state.selectdata[0]
    );
    if (!res.toLowerCase().includes('failed')) {
      this.ClearData();
      await this.LoadGridData();
      this.DisplayAlert(res, types.SUCCESS);
    } else {
      this.DisplayAlert(res, types.ERROR);
    }
    this.UnBlockUI();
  };

  SaveLocation = async () => {
    this.BlockUI();
    const error = {};
    let iserror = true;
    if (this.state.LocationName === '') {
      error.LocationName = 'Location Name cannot be empty';
      iserror = false;
      this.setState({
        LocationNamestylecss: Invalidstylecode,
      });
    }
    if (this.state.Occupied === '') {
      error.Occupied = 'Occupied cannot be empty';
      iserror = false;
      this.setState({
        LocationOccupiedstylecss: Invalidstylecode,
      });
    }
    if (this.state.QrCode === '') {
      error.QrCode = 'QrCode cannot be empty';
      iserror = false;
      this.setState({
        LocationQRCodestylecss: Invalidstylecode,
      });
    }

    this.setState({ errors: error });
    if (iserror) {
      this.ValidTextStyle();
      const bodyobj = {
        location_name: this.state.LocationName,
        occupied: this.state.Occupied,
        qrcode: this.state.QrCode,
      };
      const res = await LocationModel.UCLocation(bodyobj, this.state.id);
      if (!res.includes('failed')) {
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
    this.setState({ selectdata });
  }

  DisplayAlert(msg, type) {
    this.Alert.show(msg, {
      timeout: 5000,
      type,
    });
  }

  BlockUI() {
    this.setState({ blocking: true });
  }

  onChangeOfInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  UnBlockUI() {
    this.setState({ blocking: false });
  }

  onChangeOfInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-md-10">
        <Jumbotron
          style={{ marginbottom: '.5rem !important' }}
          className="jumbotronpadding"
        >
          <h5 className="HeaderText" style={{ textAlign: 'center' }}>
            Location
          </h5>
        </Jumbotron>
        <Jumbotron className="jumbotronpadding">
          <Row className="form-group form-groupmb">
            <Col md={1}>
              <FormLabel size="sm">Name</FormLabel>
            </Col>
            <Col md={3}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="LocationName"
                value={this.state.LocationName}
                size="sm"
                style={this.state.LocationNamestylecss}
              />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.LocationName}</span>
            </Col>
          </Row>
          <Row className="form-group form-groupmb">
            <Col md={1}>
              <FormLabel size="sm">QR Code</FormLabel>
            </Col>
            <Col md={3}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="QrCode"
                size="sm"
                style={this.state.LocationQRCodestylecss}
                value={this.state.QrCode}
              />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.QrCode}</span>
            </Col>
          </Row>
          <Row className="form-group form-groupmb">
            <Col md={1}>
              <FormLabel size="sm">Occupied</FormLabel>
            </Col>
            <Col md={3}>
              <Form.Control
                onChange={this.onChangeOfInput}
                name="Occupied"
                value={this.state.Occupied}
                size="sm"
                as="select"
                style={this.state.LocationOccupiedstylecss}
              >
                <option key="select" value="">
                  select
                </option>
                <option key="Yes" value="1">
                  Yes
                </option>
                <option key="No" value="0">
                  No
                </option>
              </Form.Control>
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.Occupied}</span>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={1}>
              <Button variant="light" onClick={this.SaveLocation}>
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
            <Button onClick={this.EditLocation} variant="light">
              Edit
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={this.DeleteLocation}>
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
              getRowId={(r) => r.location_id}
              pageSize={25}
              onSelectionModelChange={(newSelection) => {
                this.GetSelectedOrder(newSelection);
              }}
              selectionModel={this.state.selectionOrder}
              onRowClick={(params, event) => {
                if (!event.ignore) {
                  console.log(`push -> /roles/${params.row.location_id}`);
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
export default withAlert()(Locations);
