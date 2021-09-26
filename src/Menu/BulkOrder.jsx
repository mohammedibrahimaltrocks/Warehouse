/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable spaced-comment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import BlockUi from 'react-block-ui';
import { Container } from 'react-bootstrap';
import { GridColDef } from '@material-ui/data-grid';
import UserProfile from '../Models/UserSession';
import OrderRender from './OrderRender';
import OrderDetailsModel from '../Models/OrderDetailsModel';
import OrderDetailPopup from './OrderDetailPopup';

//const columns: GridColDef[] = OrderDetailsModel.BulkOrderDisplayColumn();

class BulkOrder extends Component {
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

    this.GetSelectedOrder = this.GetSelectedOrder.bind(this);
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.GetPopupSelectedOrder = this.GetPopupSelectedOrder.bind(this);
    this.EditOrder = this.EditOrder.bind(this);
    this.Getselecteditems = this.Getselecteditems.bind(this);
    this.Alert = props.alert;
  }

  GetSelectedOrder = async function (selectedorder) {
    this.setState({ selectionOrder: selectedorder });
    //var orderid = OrderModel.GetAllOrderData(selectedorder[0]);
    //await OrderDetailsModel.GetOrderDetailsByOrderId(orderid[0]);
  };

  componentDidMount() {
    const col = OrderDetailsModel.BulkOrderDisplayColumn();
    this.setState({
      columns: col,
    });
  }

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
          Orderid={this.state.selectionOrderid}
          title="Bulk Label Detail"
          columns={this.state.columns}
          handleShow={this.handleShow}
          alert={this.Alert}
        />
        <OrderRender
          blockingUI={this.BlockUI}
          UnblockUI={this.UnBlockUI}
          SelectItemevent={this.GetSelectedOrder}
          title="Bulk Order"
          EditOrder={this.EditOrder}
          selecteditems={this.Getselecteditems}
          PrintData
          alert={this.Alert}
        />
      </BlockUi>
    );
  }
}

export default BulkOrder;
