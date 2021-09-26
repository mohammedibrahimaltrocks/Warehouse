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
import PrinterModel from '../Models/PrinterModel';
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from '../Common/Common';

//const columns: GridColDef[] = PrinterModel.PrinterGridHeader();
const options = {
  filterType: 'checkbox',
};

class Printer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      id: '',
      Printername: '',
      printerip: '',
      status: true,
      rows: [],
      ScreenHeight: '',
      selectionOrder: [],
      errors: {},
      printernamestylecss: {},
      Printeripstylecss: {},
      selectdata: [],
      columns: [],
    };

    this.Alert = props.alert;
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
    this.EditPrinter = this.EditPrinter.bind(this);
    this.SavePrinter = this.SavePrinter.bind(this);
    this.onChangeOfInput = this.onChangeOfInput.bind(this);
    this.DeletePrinter = this.DeletePrinter.bind(this);
    this.ValidTextStyle = this.ValidTextStyle.bind(this);
    this.ClearData = this.ClearData.bind(this);
  }

  ValidTextStyle() {
    this.setState({
      printernamestylecss: stylecode,
      Printeripstylecss: stylecode,
    });
  }

  ClearData() {
    this.setState({
      printerip: '',
      Printername: '',
      id: '',
    });
  }

  componentDidMount = async () => {
    this.BlockUI();
    this.setState({
      columns: PrinterModel.PrinterGridHeader(),
    });
    await this.LoadGridData();
    const size = getWindowDimensions();
    size.height = size.height / 2 + 80;
    this.setState({ ScreenHeight: size.height });
    this.ValidTextStyle();
    this.UnBlockUI();
  };

  LoadGridData = async () => {
    await PrinterModel.GetAllPrinters();
    const griddata = await PrinterModel.GetAllPrinter();
    this.setState({
      rows: griddata,
    });
  };

  DeletePrinter = async () => {
    this.BlockUI();
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        'Not Possible to Delete more than one Printer!!',
        types.INFO
      );
    } else if (this.state.selectdata.length < 1) {
      this.DisplayAlert('Select a Printer to delete', types.INFO);
    }

    const res = await PrinterModel.DeletePrinterById(this.state.selectdata[0]);
    if (!res.toLowerCase().includes('failed')) {
      this.ClearData();
      await this.LoadGridData();
      this.DisplayAlert(res, types.SUCCESS);
    } else {
      this.DisplayAlert(res, types.ERROR);
    }
    this.UnBlockUI();
  };

  EditPrinter = async () => {
    this.BlockUI();
    if (this.state.selectdata.length > 1) {
      this.DisplayAlert(
        'Not Possible to Edit more than one Printer!!',
        types.INFO
      );
    } else if (this.state.selectdata.length < 1) {
      this.DisplayAlert('Select a Printer to Edit', types.INFO);
    }
    const PrinterData = this.state.rows.find((f) => {
      return f.printer_id === this.state.selectdata[0];
    });

    this.setState({
      Printername: PrinterData.printer_name,
      printerip: PrinterData.ip_address,
      id: PrinterData.printer_id,
    });
    this.UnBlockUI();
  };

  SavePrinter = async () => {
    this.BlockUI();
    const error = {};
    let iserror = true;
    if (this.state.Printername === '') {
      error.Printername = 'Printer Name cannot be empty';
      iserror = false;
    } else if (this.state.printerip === '') {
      error.printerip = 'Printer IP cannot be empty';
      iserror = false;
    }

    this.setState({ errors: error });
    if (iserror) {
      this.ValidTextStyle();
      const bodyobj = {
        printer_name: this.state.Printername,
        ip_address: this.state.printerip,
      };
      const res = await PrinterModel.UCPrinter(bodyobj, this.state.id);
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

  GetSelectedOrder(selectdata) {
    this.setState({ selectdata });
  }

  DisplayAlert(msg, type) {
    this.Alert.show(msg, {
      timeout: 5000, // custom timeout just for this one alert
      type,
    });
  }

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-md-10">
        <Jumbotron
          style={{ marginbottom: '.5rem !important' }}
          className="jumbotronpadding"
        >
          <h5 className="HeaderText" style={{ textAlign: 'center' }}>
            Printer
          </h5>
        </Jumbotron>
        <Jumbotron className="jumbotronpadding">
          <Row className="form-group form-groupmb">
            <Col md={2}>
              <FormLabel size="sm">Printer Name</FormLabel>
            </Col>
            <Col md={3}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="Printername"
                value={this.state.Printername}
                size="sm"
                style={this.state.printernamestylecss}
              />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.Printername}</span>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={2}>
              <FormLabel>Printer IP</FormLabel>
            </Col>
            <Col md={3}>
              <FormControl
                onChange={this.onChangeOfInput}
                name="printerip"
                value={this.state.printerip}
                style={this.state.Printeripstylecss}
              />
            </Col>
            <Col md={3}>
              <span className="error">{this.state.errors.printerip}</span>
            </Col>
          </Row>

          <Row className="rowmargin form-group form-groupmb">
            <Col md={2}>
              <Button variant="light" onClick={this.SavePrinter}>
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
            <Button onClick={this.EditPrinter} variant="light">
              Edit
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={this.DeletePrinter}>
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
              getRowId={(r) => r.printer_id}
              pageSize={25}
              onSelectionModelChange={(newSelection) => {
                this.GetSelectedOrder(newSelection);
              }}
              selectionModel={this.state.selectionOrder}
              onRowClick={(params, event) => {
                if (!event.ignore) {
                  console.log(`push -> /roles/${params.row.printer_id}`);
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
export default withAlert()(Printer);
