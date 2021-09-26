import React, { Component } from 'react';

import { Container } from 'react-bootstrap';

import BlockUi from 'react-block-ui';
import { withAlert } from 'react-alert';
import { GridColDef } from '@material-ui/data-grid';
import OrderModel from '../Models/OrderModel';
import UserProfile from '../Models/UserSession';
import OrderRender from './OrderRender';
import OrderDetailsModel from '../Models/OrderDetailsModel';
import OrderDetailPopup from './OrderDetailPopup';
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from '../Common/Common';

//const columns: GridColDef[] =
//  OrderDetailsModel.PalletOrderDetailsDisplayColumn();
class Ontheshelf extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      blocking: true,
      rows: [],
      selectionOrder: [],
      show: false,
      PRows: [],
      columns: [],
    };
    this.setState({
      columns: OrderDetailsModel.PalletOrderDetailsDisplayColumn(),
    });
    // eslint-disable-next-line react/prop-types
    this.Alert = props.alert;
    this.GetSelectedOrder = this.GetSelectedOrder.bind(this);
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.GetPopupSelectedOrder = this.GetPopupSelectedOrder.bind(this);
    this.EditOrder = this.EditOrder.bind(this);
    this.Getselecteditems = this.Getselecteditems.bind(this);
  }

  GetSelectedOrder = async function (selectedorder) {
    this.setState({ selectionOrder: selectedorder });
    //var orderid = OrderModel.GetAllOrderData(selectedorder[0]);
    //await OrderDetailsModel.GetOrderDetailsByOrderId(orderid[0]);
  };

  GetPopupSelectedOrder = async function (selectedorder) {
    //this.setState({ selectionOrder: selectedorder });
    //var orderid = OrderModel.GetAllOrderData(selectedorder[0]);
    //await OrderDetailsModel.GetOrderDetailsByOrderId(orderid[0]);
    //this.handleShow();
  };

  EditOrder = async function (selectedid) {
    this.BlockUI();
    if (this.state.selectionOrder.length > 0) {

      this.setState({ selectionOrderid: this.state.selectionOrder[0] });
      this.handleShow();
    }
    this.UnBlockUI();
  };

  BlockUI() {
    this.setState({ blocking: true });
  }

  UnBlockUI() {
    this.setState({ blocking: false });
  }
  Getselecteditems = function () {
    return this.state.selectionOrder;
  };

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking} className="col-lg-10">
        <OrderDetailPopup
          show={this.state.show}
          handleClose={this.handleClose}
          GetSelectedOrder={this.GetPopupSelectedOrder}
          Orderid={this.state.selectionOrder}
          title="Pallet Label Detail"
          columns={this.state.columns}
          handleShow={this.handleShow}
          alert={this.Alert}
        />
        <OrderRender
          blockingUI={this.BlockUI}
          UnblockUI={this.UnBlockUI}
          SelectItemevent={this.GetSelectedOrder}
          title="Pallet Result"
          EditOrder={this.EditOrder}
          selecteditems={this.Getselecteditems}
          PrintData={false}
          alert={this.Alert}
        />
      </BlockUi>
    );
  }
}

export default Ontheshelf;
