/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
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
  Button,
  Jumbotron,
  FormLabel,
  FormControl,
  Form,
} from 'react-bootstrap';
// getThemePaletteMode
import { makeStyles, darken, lighten } from '@material-ui/core/styles';
import { CSVLink } from 'react-csv';
import { withAlert } from 'react-alert';
import ReactToPrint from 'react-to-print';
import { DataGrid } from '@material-ui/data-grid';
import UserProfile from '../Models/UserSession';
import OrderModel from '../Models/OrderModel';
import OrderDetailsModel from '../Models/OrderDetailsModel';
import PrinterModel from '../Models/PrinterModel';
import LabelPrint from './LabelPrint';
import ReportModel from '../Models/ReportModel';
import TwoDLabelPrint from './TwoDLabelPrint';
import { types, getWindowDimensions, order_type } from '../Common/Common';

const options = {
  filterType: 'checkbox',
};

// const columns: GridColDef[] = OrderModel.OrderDisplayColumn();
const headers = [
  { label: 'Customer', key: 'customer_name' },
  { label: 'SO Number', key: 'so_id' },
  { label: 'PartNumber', key: 'part_number' },
  { label: 'Master Serial Number', key: 'master_serial' },
];
const pageStyles = `
  @page {
    size: 5in 4in;
  }
  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, 120px);
    grid-row-gap: .5em;
    grid-column-gap: 1em;
  }
`;
// const useStyles = makeStyles((theme) => {
//   const getBackgroundColor = (color) =>
//     getThemePaletteMode(theme.palette) === 'dark'
//       ? darken(color, 0.6)
//       : lighten(color, 0.6);
//   return {
//     root: {
//       '& .super-app-theme--pending': {
//         backgroundColor: getBackgroundColor(theme.palette.info.main),
//       },
//     },
//   };
// });
class OrderRender extends Component {
  constructor({
    SelectItemevent,
    blockingUI,
    UnblockUI,
    title,
    EditOrder,
    selecteditems,
    PrintData,
    alert,
  }) {
    super();
    this.myPrintRef = React.createRef();
    this.TDmyPrintRef = React.createRef();
    this.ExportDataClick = React.createRef();
    this.state = {
      rows: [],
      selectionOrder: [],
      Printers: [],
      DefaultPrinter: UserProfile.getuserprinter(),
      blockingUI: blockingUI,
      UnblockUI: UnblockUI,
      Title: title,
      CSVData: [],
      Headertext: '',
      PalletNumber: '',
      Partnumber: '',
      MasterSerial: [],
      TwoDPrint: false,
      SPrintData: PrintData,
      SearchCustomer: '',
      SearchSOID: '',
      searchCustomerwithSN: '',
      ExportOrderIds: [],
      columns: [],
    };

    this.Printlabels = React.createRef();
    this.blockingUI = blockingUI;
    this.UnblockUI = UnblockUI;
    this.SelectItem = selecteditems;
    this.GetSelectedOrder = SelectItemevent;
    this.LoadOrders = this.LoadOrders.bind(this);
    this.onChangeOfInput = this.onChangeOfInput.bind(this);
    this.Refresh = this.Refresh.bind(this);
    this.ExportData = this.ExportData.bind(this);
    this.EditOrder = EditOrder;
    this.Paramfunc = this.Paramfunc.bind(this);
    this.LabelBarPrint = this.LabelBarPrint.bind(this);
    this.sleep = this.sleep.bind(this);
    this.printlabel = this.printlabel.bind(this);
    this.TWODprintlabel = this.TWODprintlabel.bind(this);
    this.SearchData = this.SearchData.bind(this);
    this.SearchReset = this.SearchReset.bind(this);
    this.RowEvent = this.RowEvent.bind(this);
    this.Alert = alert;
  }

  componentWillReceiveProps(newProps) {
    this.setState({ SPrintData: newProps.PrintData });
  }

  componentDidMount() {
    this.LoadOrders();
  }

  LoadOrders = async function () {
    var type;
    var GridCoumn = OrderModel.OrderDisplayColumn();
    this.setState({
      columns: GridCoumn,
    });
    if (this.state.Title.includes('Pallet')) {
      type = order_type.pallet;
    } else if (this.state.Title.includes('Bulk')) {
      type = order_type.bulk;
    } else {
      type = order_type.location;
    }
    var order = await OrderModel.GetAllOrders(type);
    await PrinterModel.GetAllPrinters();
    var Printerdata = await PrinterModel.GetAllPrinter();
    if (order === '') {
      order = [];
    }
    this.setState({
      rows: order,
      Printers: Printerdata,
    });
    this.UnblockUI();
  };

  Refresh = async function () {
    this.blockingUI();
    await this.LoadOrders();
    this.setState({ selectionOrder: [] });
  };
  onChangeOfInput = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  RowEvent = async function (selectedid) {
    this.EditOrder(selectedid);
  };
  // GetSelectedOrder = function (selectedorder) {
  //   this.setState({ SelectItem: selectedorder });
  // };
  ExportData = async function () {
    var items = this.SelectItem();
    var Orderid = [];
    items.forEach((item) => {
      var fitem = this.state.rows.find((row) => {
        return row.id === item;
      });
      Orderid.push(fitem.order_id);
    });

    this.blockingUI();
    // console.log("Export Data Clicked");
    var Resdata = await ReportModel.GetReport(Orderid);
    if (Resdata.length <= 0) {
      if (UserProfile.GetErroMessage().includes('not allow')) {
        this.DisplayAlert(UserProfile.GetErroMessage(), types.ERROR);
      }
    } else {
      this.setState({ CSVData: Resdata });
      this.ExportDataClick.current.link.click();
    }
    this.UnblockUI();
  };
  SearchData = async function () {
    this.blockingUI();
    console.log(this.state.SearchCustomer);
    console.log(this.state.SearchSOID);
    var order = await OrderModel.GetAllOrders();
    if (this.state.SearchSOID !== '') {
      order = order.filter((item) => {
        if (this.state.SearchSOID === item.so_id) return item;
      });
    } else if (this.state.SearchCustomer !== '') {
      order = order.filter((item) => {
        if (this.state.SearchCustomer === item.customer_name) return item;
      });
    }
    this.setState({
      rows: order,
    });
    this.UnblockUI();
  };
  SearchReset = function () {
    this.setState({
      SearchCustomer: '',
      SearchSOID: '',
      searchCustomerwithSN: '',
    });
  };
  printlabel = (e) => {
    // console.log(e);
    this.LabelBarPrint(false);
  };
  TWODprintlabel = (e) => {
    // console.log(e);
    this.LabelBarPrint(true);
  };
  LabelBarPrint = async (is2dprint) => {
    this.blockingUI();
    this.setState({ TwoDPrint: is2dprint });
    // console.log("selected item");
    // console.log(this.SelectItem());
    var objorderdet = await OrderModel.GetAllOrdersById(this.SelectItem()[0]);
    var res = await OrderDetailsModel.GetOrderDetailsByOrderId(objorderdet);
    if (res !== '' && res.length > 0) {
      var multipleserial = [];
      for (var i = 0; i < res.length; i++) {
        multipleserial.push(res[i].master_serial);
      }
      this.setState({
        PalletNumber: res[0].pallet_number,
        Partnumber: res[0].part_number,
        MasterSerial: multipleserial,
      });
    }
    if (is2dprint) {
      this.TDmyPrintRef.current.click();
    } else {
      this.myPrintRef.current.click();
    }

    // this.myPrintRef = React.createRef();
    this.UnblockUI();
  };
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  Paramfunc = function (param) {
    if (param === 'pending') return 'super-app-theme--Amber';
    else return '';
  };
  DisplayAlert(msg, type) {
    this.Alert.show(msg, {
      timeout: 5000, // custom timeout just for this one alert
      // eslint-disable-next-line object-shorthand
      type: type,
    });
  }
  render() {
    return (
      <div>
        <Jumbotron
          style={{ marginbottom: '.5rem !important', textAlign: 'center' }}
          className="jumbotronpadding"
        >
          <span className="HeaderText">{this.state.Title}</span>
        </Jumbotron>
        <Jumbotron className="jumbotronpadding">
          <Container fluid="sm">
            <Row className="form-group form-groupmb">
              <Col>
                <Button size="sm" variant="light" onClick={this.EditOrder}>
                  Edit
                </Button>
              </Col>
              <Col>
                <Button size="sm" variant="light" onClick={this.Refresh}>
                  Refresh
                </Button>
              </Col>
              <Col>
                <Button size="sm" variant="light">
                  Delete
                </Button>
              </Col>
              <Col>
                <Button size="sm" variant="light" onClick={this.ExportData}>
                  Export Excel Report
                </Button>
                <CSVLink
                  style={{ display: 'none' }}
                  data={this.state.CSVData}
                  // eslint-disable-next-line react/jsx-boolean-value
                  asyncOnClick={true}
                  headers={headers}
                  target="_blank"
                  className="CSVLink"
                  filename="ExportData.csv"
                  ref={this.ExportDataClick}
                  onClick={async (event, done) => {
                    // done(false);
                    // var items = this.SelectItem();
                    // var Orderid = [];
                    // items.forEach((item) => {
                    //   var fitem = this.state.rows.find((row) => {
                    //     return row.id === item;
                    //   });
                    //   Orderid.push(fitem.order_id);
                    // });
                    // this.blockingUI();
                    // //console.log("Export Data Clicked");
                    // var Resdata = await ReportModel.GetReport(Orderid);
                    // this.setState({ CSVData: Resdata });
                    // this.UnblockUI();
                    // eslint-disable-next-line no-console
                    console.log('You click the link'); // 👍🏻 Your click handling logic
                    // done(true);
                  }}
                >
                  Export Excel Report
                </CSVLink>
              </Col>
              {/* <Col>
                <Button size="sm" variant="light">
                  Export Excel Report(Combine)
                </Button>
              </Col> */}
              <Col>
                <Button size="sm" variant="light">
                  checked
                </Button>
              </Col>
              {/* <Col>
                <Button size="sm" variant="light">
                  Exit
                </Button>
              </Col> */}
            </Row>
          </Container>
        </Jumbotron>

        <Jumbotron style={{ padding: '1%' }}>
          <Row className="form-group">
            <Col md={1}>
              <FormLabel size="sm">Filter</FormLabel>
            </Col>
            <Col md={1}>
              <FormLabel size="sm">SO ID</FormLabel>
            </Col>
            <Col md="auto">
              <FormLabel size="sm">---</FormLabel>
            </Col>
            <Col xs lg="2">
              <FormControl
                size="sm"
                name="SearchSOID"
                onChange={this.onChangeOfInput}
                value={this.state.SearchSOID}
              ></FormControl>
            </Col>
            <Col md={1}>
              <FormLabel size="sm" style={{ display: 'none' }}>
                Others
              </FormLabel>
            </Col>
            <Col xs lg="2">
              <Form.Control
                as="select"
                value=""
                onChange={this.onChangeOfInput}
                style={{ display: 'none' }}
              ></Form.Control>
            </Col>
            <Col md="auto">
              <FormLabel size="sm" style={{ display: 'none' }}>
                ---
              </FormLabel>
            </Col>
            <Col xs lg="2">
              <FormControl size="sm" style={{ display: 'none' }}></FormControl>
            </Col>
            <Col md="auto">
              <Button size="sm" variant="light" onClick={this.SearchData}>
                OK
              </Button>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={1}>
              <FormLabel size="sm"></FormLabel>
            </Col>
            <Col md={1} className="justify-content-md-center">
              <FormLabel size="sm">Customer</FormLabel>
            </Col>
            <Col md="auto">
              <FormLabel size="sm">---</FormLabel>
            </Col>
            <Col xs lg="2">
              <FormControl
                size="sm"
                name="SearchCustomer"
                onChange={this.onChangeOfInput}
                value={this.state.SearchCustomer}
              ></FormControl>
            </Col>
            <Col md={1}>
              <FormLabel size="sm"></FormLabel>
            </Col>
            <Col xs lg="2">
              <Form.Control
                size="sm"
                as="select"
                value=""
                onChange={this.onChangeOfInput}
                style={{ display: 'none' }}
              ></Form.Control>
            </Col>
            <Col md="auto">
              <FormLabel size="sm" style={{ display: 'none' }}>
                ---
              </FormLabel>
            </Col>
            <Col xs lg="2">
              <FormControl size="sm" style={{ display: 'none' }}></FormControl>
            </Col>
            <Col md={1}>
              <Button size="sm" variant="light" onClick={this.SearchReset}>
                Reset
              </Button>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={3}>
              <FormLabel size="sm">Find order with SN as below :</FormLabel>
            </Col>
          </Row>
          <Row className="rowmargin form-group form-groupmb">
            <Col md={1}>
              <FormLabel size="sm"></FormLabel>
            </Col>
            <Col md={1} className="justify-content-md-center">
              <FormLabel size="sm">Customer</FormLabel>
            </Col>
            <Col md="auto">
              <FormLabel size="sm">---</FormLabel>
            </Col>
            <Col xs lg="2">
              <FormControl
                size="sm"
                name="SearchCustomerwithSN"
                onChange={this.onChangeOfInput}
              ></FormControl>
            </Col>
          </Row>
        </Jumbotron>
        {this.state.SPrintData ? (
          <Row className="form-group form-groupmb">
            <Col md={1}>
              <FormLabel size="sm">Printer :</FormLabel>
            </Col>
            <Col md={7}>
              <Form.Control
                size="sm"
                as="select"
                value={this.state.DefaultPrinter}
                onChange={this.onChangeOfInput}
                name="DefaultPrinter"
              >
                {this.state.Printers.map((item) => (
                  <option key={item.printer_id} value={item.printer_id}>
                    {item.printer_name}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button
                size="sm"
                ref={this.Printlabels}
                variant="light"
                onClick={this.printlabel}
              >
                Print Label
              </Button>
              <div style={{ display: 'none' }}>
                <ReactToPrint
                  pageStyle={pageStyles}
                  trigger={() => (
                    <Button ref={this.myPrintRef} variant="light">
                      Print Label
                    </Button>
                  )}
                  content={() => this.componentRef}
                  onAfterPrint={() => console.log('after print')}
                />
              </div>
            </Col>
            <Col md={2}>
              <Button size="sm" variant="light" onClick={this.TWODprintlabel}>
                Print Labels (2D)
              </Button>
              <div style={{ display: 'none' }}>
                <ReactToPrint
                  pageStyle={pageStyles}
                  trigger={() => (
                    <Button ref={this.TDmyPrintRef} variant="light">
                      Print Labels (2D)
                    </Button>
                  )}
                  content={() => this.componentRef}
                />
              </div>
            </Col>
          </Row>
        ) : (
          ''
        )}
        <Row className="form-group form-groupmb">
          <div style={{ height: 380, width: '100%', paddingTop: '0.5%' }}>
            <DataGrid
              checkboxSelection
              rows={this.state.rows}
              columns={this.state.columns}
              options={options}
              pageSize={25}
              sortmodel={[
                {
                  field: 'create_time',
                  sort: 'desc',
                },
              ]}
              onSelectionModelChange={(newSelection) => {
                this.GetSelectedOrder(newSelection);
                console.log(newSelection);
              }}
              selectionModel={this.state.selectionOrder}
              getRowClassName={(params) =>
                this.Paramfunc(`${params.row.status}`)
              }
              onRowClick={(params, event) => {
                if (!event.ignore) {
                  console.log('push -> /roles/' + params.row.id);
                  this.RowEvent(params.row.id);
                }
              }}
            />
          </div>
        </Row>
        <Row className="form-group form-groupmb">
          <span>Number of Records Load : {this.state.rows.length}</span>
        </Row>
        <div style={{ display: 'none' }}>
          <div
            style={{
              width: 424,
              height: 528,
              borderStyle: 'solid',
            }}
          >
            <LabelPrint
              Headertext={this.state.Headertext}
              PalletNumber={this.state.PalletNumber}
              Partnumber={this.state.Partnumber}
              MasterSerial={this.state.MasterSerial}
              ref={(el) => (this.componentRef = el)}
              TwoDPrint={this.state.TwoDPrint}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(OrderRender);
