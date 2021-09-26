/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
import HTTPRequest from '../Config/HTTPRequest';
import UserProfile from './UserSession';

const OrderModel = (function () {
  const Orderurl = 'orders/';
  let OrderData = [];
  const GetAllOrderData = function (id) {
    return OrderData.filter((order) => order.id === id).map((order) => {
      return order.order_id;
    });
  };
  const GetAllOrders = async function (ordertype) {
    const body = {};
    body.order_type = ordertype;
    const header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    const response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        `${UserProfile.getuserid()}:${UserProfile.getusertoken()}`
      ),
      UserProfile.getUrl() + Orderurl,
      'POST',
      header,
      body
    );
    if (response.status) {
      OrderData = response.data;
      return OrderData;
    }
    return '';
  };
  const UpdateOrderstatus = async function (orderid) {
    UserProfile.setErroMessage('');
    const requestbody = {};
    requestbody.checked = 1;
    requestbody.status = 'completed';
    const header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    const response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        `${UserProfile.getuserid()}:${UserProfile.getusertoken()}`
      ),
      UserProfile.getUrl() + Orderurl + orderid,
      'PUT',
      header,
      requestbody
    );
    if (response.status) {
      return response;
    }
    UserProfile.setErroMessage(response.message);
    return '';
  };
  const GetAllOrdersById = async function (orderid) {
    const header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    const response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        `${UserProfile.getuserid()}:${UserProfile.getusertoken()}`
      ),
      UserProfile.getUrl() + Orderurl + orderid,
      'POST',
      header
    );
    if (response.status) {
      return response.data[0];
    }
    return '';
  };
  // pallet_serial

  const GetLastPalletNo = async function (orderid) {
    const header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    const response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        `${UserProfile.getuserid()}:${UserProfile.getusertoken()}`
      ),
      `${UserProfile.getUrl() + Orderurl}pallet_serial`,
      'POST',
      header
    );
    if (response.status) {
      return response.data.serial;
    }
    return '';
  };
  const OrderDisplayColumn = function () {
    return [
      {
        headerName: 'order_id',
        field: 'order_id',
        width: 135,
      },
      {
        headerName: 'status',
        field: 'status',
        width: 80,
      },
      {
        headerName: 'checked',
        field: 'checked',
        width: 105,
      },
      {
        headerName: 'handler',
        field: 'handler',
        width: 90,
      },
      {
        headerName: 'so_id',
        field: 'so_id',
        width: 130,
      },
      {
        headerName: 'Customer',
        field: 'customer_name',
        width: 120,
      },
      {
        headerName: 'Remarks',
        field: 'remarks',
        width: 100,
      },
      {
        headerName: 'OrderType',
        field: 'order_type',
        width: 100,
      },
      //
      {
        headerName: 'Create_By',
        field: 'create_by',
        width: 100,
      },
      {
        headerName: 'Create_Date',
        field: 'create_time',
        width: 140,
      },
      {
        headerName: 'Modify_By',
        field: 'modify_by',
        width: 110,
      },
      {
        headerName: 'Modify_Date',
        field: 'modify_time',
        width: 140,
      },
    ];
  };

  return {
    GetAllOrders,
    OrderDisplayColumn,
    GetAllOrdersById,
    GetAllOrderData,
    UpdateOrderstatus,
    GetLastPalletNo,
  };
})();
export default OrderModel;
