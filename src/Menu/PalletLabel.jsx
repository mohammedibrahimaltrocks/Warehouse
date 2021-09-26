/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-bitwise */
/* eslint-disable radix */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-access-state-in-setstate */
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
  Button,
  FormLabel,
  FormControl,
  Jumbotron,
} from 'react-bootstrap';
import BlockUi from 'react-block-ui';
import ReactToPrint from 'react-to-print';
import { withAlert } from 'react-alert';
import PrinterModel from '../Models/PrinterModel';
import PalletNumberPrint from '../Print/PalletLabelPrint';
import OrderModel from '../Models/OrderModel';
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from '../Common/Common';

//  @page {
// size: 5in 4in;
// }
const pageStyles = `
  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

class PalletLabel extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myPrintRef = React.createRef();
    this.Printbtn = React.createRef();
    this.state = {
      Printers: [],
      Printer: '',
      blocking: true,
      BarcodePrefix: 'GP',
      Lstprintnumber: 0,
      txtfrom: '',
      Printersfrom: '',
      txtto: '',
      Printersto: '',
      IsprintQty: '',
      PrintIsprintQty: '',
      PrintLstnumber: 0,
      barcodedate:
        new Date().getFullYear().toString() +
        (new Date().getMonth() + 1 >= 10
          ? new Date().getMonth()
          : `0${new Date().getMonth() + 1}`
        ).toString() +
        (new Date().getDate() > 10
          ? new Date().getDate()
          : '0' + new Date().getDate().toString()
        ).toString(),
      PrintLabellst: [],
    };
    this.Alert = props.alert;
    this.onPageLoad = this.onPageLoad.bind(this);
    this.onChangeOfInput = this.onChangeOfInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleselect = this.handleselect.bind(this);
    this.printLabel = this.printLabel.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.handleApplicationExit = this.handleApplicationExit.bind(this);
    this.LabelPrintTrigger = this.LabelPrintTrigger.bind(this);
    this.zeroPad = this.zeroPad.bind(this);
    this.PalletLabelData = this.PalletLabelData.bind(this);
    this.onPageLoad();
    this.Alert = alert;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.IsprintQty !== undefined &&
        this.state.IsprintQty !== '' &&
        this.state.IsprintQty !== '0' &&
        prevState.IsprintQty !== this.state.IsprintQty) ||
      (this.state.txtfrom !== undefined &&
        this.state.txtfrom !== '' &&
        this.state.txtfrom !== '0' &&
        prevState.txtfrom !== this.state.txtfrom &&
        this.state.txtto !== undefined &&
        this.state.txtto !== '' &&
        this.state.txtto !== '0' &&
        prevState.txtto !== this.state.txtto)
    ) {
      this.PalletLabelData();
      // console.log('test' + this.state.IsprintQty);
    }
  }
  printLabel = () => {
    console.log('print button triggered');
  };

  onPageLoad = async function () {
    const printd = await PrinterModel.GetAllPrinter();
    this.setState({
      Printers: printd,
    });
    this.UnBlockUI();
    this.setState({
      Lstprintnumber: await OrderModel.GetLastPalletNo(),
    });
  };

  onChangeOfInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // do whatever you want with isChecked value
  }

  handleselect(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  handleApplicationExit() {
    // remote.getCurrentWindow().close();
  }

  BlockUI() {
    this.setState({ blocking: true });
  }

  UnBlockUI() {
    this.setState({ blocking: false });
  }

  renderButton = () => {
    return (
      <Button
        variant="light"
        size="sm"
        className="form-control"
        ref={this.myPrintRef}
      >
        Print Label
      </Button>
    );
  };

  LabelPrintTrigger() {
    this.BlockUI();
    // this.PalletLabelData();
    this.myPrintRef.current.click();
    this.UnBlockUI();
  }
  PalletLabelData() {
    var canvasd = [];
    var from = this.state.Printersfrom;
    var to = this.state.Printersto;
    if ((this.state.IsprintQty > 0) | (this.state.IsprintQty !== '')) {
      from = parseInt(this.state.Lstprintnumber);
      to = parseInt(this.state.IsprintQty);
    }
    if (to !== 0 && from !== '') {
      for (var i = from; i <= to; i++) {
        var ele = this.zeroPad(i).toString();
        var BarcodeData =
          this.state.BarcodePrefix + this.state.barcodedate + ele;
        canvasd.push(BarcodeData);
      }
    }
    this.setState({
      PrintLabellst: canvasd,
    });
  }
  zeroPad = (num, places = 4) => {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  };

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-lg-10">
        <Jumbotron className="jumbotronpadding ">
          <h4 style={{ textAlign: 'center' }}>Pallet Number Print</h4>
        </Jumbotron>
        <Jumbotron className="jumbotronpadding">
          <div>
            <div className="row form-group form-groupmb">
              <div className="Col-2 col-md-4">
                <Button
                  className="form-control"
                  variant="light"
                  size="sm"
                  ref={this.Printbtn}
                  onClick={this.LabelPrintTrigger}
                >
                  Print Label
                </Button>
                <div style={{ display: 'none' }}>
                  <ReactToPrint
                    pageStyle={pageStyles}
                    trigger={() => (
                      <Button
                        ref={this.myPrintRef}
                        variant="light"
                        size="sm"
                        className="form-control"
                      >
                        Print Label
                      </Button>
                    )}
                    content={() => this.componentRef}
                  />
                </div>
              </div>
              <div className="Col-2 col-md-4">
                <Button className="form-control" variant="light" size="sm">
                  Reset
                </Button>
              </div>
              {/* <div className="Col-2 col-md-4">
                <Link to="/">
                  <Button className="form-control" variant="light">
                    Exit
                  </Button>
                </Link>
              </div> */}
            </div>
          </div>
        </Jumbotron>
        <div className="row form-group">
          <div className="col-3">
            <FormLabel>Printer :</FormLabel>
          </div>
          <div className="col-6">
            <select
              className="browser-default custom-select"
              name="Printer"
              onChange={this.onChangeOfInput}
            >
              {this.state.Printers.map((item) => (
                <option key={item.printer_id} value={item.printer_id}>
                  {item.printer_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col" />
          <div className="col" />
        </div>
        <div className="row form-group">
          <div className="col-3">Printer Type</div>
          <div className="col-3">
            <FormLabel name="PrinterType" className="form-control" />
          </div>
          <div className="col-2" />
          <div className="col-3" />
        </div>
        <div className="row form-group">
          <div className="col-3">Barcode Prefix :</div>
          <div className="col-3">
            <input
              name="BarcodePrefix"
              className="form-control"
              onChange={this.onChangeOfInput}
              value={this.state.BarcodePrefix}
            />
          </div>
          <div className="col-1">
            <FormControl
              type="checkbox"
              className="form-control"
              id="customize"
              name="customize"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-3">Customize</div>
        </div>
        <div className="row form-group">
          <div className="col-3">Barcode Date</div>
          <div className="col-3">
            <FormLabel
              name="barcodedate"
              className="form-control"
              id="barcodedate"
            >
              {this.state.barcodedate}
            </FormLabel>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-3">Last Print number</div>
          <div className="col-3">
            <FormControl
              type="text"
              className="form-control"
              name="Lstprintnumber"
              id="Lstprintnumber"
              onChange={this.onChangeOfInput}
              value={this.state.Lstprintnumber}
              disabled
            />
          </div>
          <div className="col-1">
            <FormControl
              type="checkbox"
              className="form-control"
              name="chkreprint"
              id="chkreprint"
              onChange={this.handleChange}
            />
          </div>
          <div className="col">
            <FormLabel>Reprint</FormLabel>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-3">Qty to print</div>
          <div className="col-8">
            <FormControl
              type="text"
              className="form-control"
              name="IsprintQty"
              id="IsprintQty"
              onChange={this.onChangeOfInput}
              value={this.state.IsprintQty}
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-3">
            <span>Label Print</span>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-3">From</div>
          <div className="col-3">
            <FormControl
              type="text"
              className="form-control"
              name="txtfrom"
              id="txtfrom"
              onChange={this.onChangeOfInput}
              value={this.state.txtfrom}
            />
          </div>
          <div className="col-1">To</div>
          <div className="col-3">
            <FormControl
              type="text"
              className="form-control"
              name="txtto"
              id="txtto"
              onChange={this.onChangeOfInput}
              value={this.state.txtto}
            />
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div
            id="printdiv"
            style={{
              width: 424,
              height: 528,
              borderStyle: 'solid',
            }}
          >
            <PalletNumberPrint
              PrintLabel={this.state.PrintLabellst}
              viewheader="false"
              ref={(el) => (this.componentRef = el)}
            />
          </div>
        </div>
      </BlockUi>
    );
  }
}
export default withAlert()(PalletLabel);
