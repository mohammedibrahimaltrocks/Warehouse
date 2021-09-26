/* eslint-disable react/jsx-boolean-value */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import BlockUi from 'react-block-ui';
import { withAlert } from 'react-alert';
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

// const columns: GridColDef[] =
// OrderDetailsModel.PalletOrderDetailsDisplayColumn();

class PalletResult extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      blocking: true,
      // eslint-disable-next-line react/no-unused-state
      rows: [],
      selectionOrder: [],
      show: false,
      // eslint-disable-next-line react/no-unused-state
      PRows: [],
      selectionOrderid: '',
      // eslint-disable-next-line react/no-unused-state
      screenheight: '',
      columns: [],
    };

    this.state.columns = OrderDetailsModel.PalletOrderDetailsDisplayColumn();
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

  // eslint-disable-next-line func-names
  GetSelectedOrder = async function (selectedorder) {
    this.setState({ selectionOrder: selectedorder });
    // var orderid = OrderModel.GetAllOrderData(selectedorder[0]);
    // await OrderDetailsModel.GetOrderDetailsByOrderId(orderid[0]);
  };

  GetPopupSelectedOrder = async function (selectedorder) {
    // this.setState({ selectionOrder: selectedorder });
    // var orderid = OrderModel.GetAllOrderData(selectedorder[0]);
    // await OrderDetailsModel.GetOrderDetailsByOrderId(orderid[0]);
    // this.handleShow();
  };

  // eslint-disable-next-line func-names
  EditOrder = async function (selectedid) {
    this.BlockUI();
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.selectionOrder.length > 0) {
      // eslint-disable-next-line react/destructuring-assignment
      this.setState({ selectionOrderid: this.state.selectionOrder[0] });
      this.handleShow();
    }
    this.UnBlockUI();
  };

  // eslint-disable-next-line react/sort-comp
  BlockUI() {
    this.setState({ blocking: true });
  }

  UnBlockUI() {
    this.setState({ blocking: false });
  }

  // eslint-disable-next-line func-names
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
          Orderid={this.state.selectionOrderid}
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
          PrintData={true}
          alert={this.Alert}
        />
      </BlockUi>
    );
  }
}

export default PalletResult;
