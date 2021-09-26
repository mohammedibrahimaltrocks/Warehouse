import HTTPRequest from "../Config/HTTPRequest";
import UserProfile from "./UserSession";

var OrderDetailsModel = (function () {
  var OrderDetails = "orders/details/orderid/";
  var orderdetailsbyid = "orders/details/groupby";
  var orderdetailsdeletebyid = "orders/details/rowid";
  var Orderdetailsbyid = "orders/details";
  var PalletResorderDetails = [];
  var PalletOrderDetailsDisplayColumn = function () {
    return [
      {
        headerName: "status",
        field: "status",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "Pallet Number",
        field: "pallet_number",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Part Number",
        field: "part_number",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Master Serial",
        field: "master_serial",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Handler",
        field: "handler",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Scan Time",
        field: "scan_time",
        options: {
          filter: true,
          sort: true,
        },
        width: 170,
      },
      {
        headerName: "No Print",
        field: "no_print",
        options: {
          filter: true,
          sort: true,
        },
        width: 120,
      },
      {
        headerName: "Create User",
        field: "create_by",
        options: {
          filter: true,
          sort: true,
        },
        width: 120,
      },
      {
        headerName: "Create Time",
        field: "create_time",
        options: {
          filter: true,
          sort: true,
        },
        width: 170,
      },
    ];
  };
  var BulkOrderDisplayColumn = function () {
    return [
      {
        headerName: "status",
        field: "status",
        options: {
          filter: true,
          sort: true,
        },
        width: 120,
      },
      {
        headerName: "Line",
        field: "line",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "Part Number",
        field: "part_number",
        options: {
          filter: true,
          sort: true,
        },
        width: 140,
      },
      {
        headerName: "Master Serial",
        field: "master_serial",
        options: {
          filter: true,
          sort: true,
        },
        width: 140,
      },
      {
        headerName: "Handler",
        field: "handler",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Scan Time",
        field: "scan_time",
        options: {
          filter: true,
          sort: true,
        },
        width: 140,
      },
      {
        headerName: "No Print",
        field: "no_print",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Create User",
        field: "create_by",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Create Time",
        field: "create_time",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
    ];
  };

  var SetprintOrderdetails = async function (isprint, orderid) {
    var body = {};
    if (body === true) {
      body.no_print = 1;
    } else {
      body.no_print = 0;
    }
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + OrderDetails + orderid,
      HTTPRequest.RequestType.PUT,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      return "Failed to Update Print status";
    }
  };
  var UpdateOrderdetails = async function (isprint, palletnum, partnum, ids) {
    var body = {};
    body.no_print = isprint;
    body.pallet_number = palletnum;
    body.part_number = partnum;
    body.ids = ids;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + orderdetailsdeletebyid,
      HTTPRequest.RequestType.PUT,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      return "Failed to Update Print status";
    }
  };
  var DeleteOrderByIds = async function (order_ids) {
    var body = {};
    body.ids = order_ids;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + orderdetailsdeletebyid,
      HTTPRequest.RequestType.DELETE,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      return "Failed to delete data";
    }
  };
  var GetOrderDetailsByIds = async function (order_id, rowdata) {
    var objPalletResOrderDet = [];
    var Reqbody = {};
    Reqbody.groupby = "id";
    Reqbody.ids = order_id.toString();
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + orderdetailsbyid,
      HTTPRequest.RequestType.POST,
      header,
      Reqbody
    );
    if (response.status) {
      if (response.data !== null) {
        for (var i = 0; i < response.data.length; i++) {
          var objparalleldata = {};
          objparalleldata.part_number = response.data[i].part_number;
          objparalleldata.master_serial = response.data[i].master_serial;
          objparalleldata.so_id = rowdata.find(
            (f) => f.id === response.data[i].id
          ).so_id;
          objparalleldata.Customer = rowdata.find(
            (f) => f.id === response.data[i].id
          ).customer_name;
          objPalletResOrderDet.push(objparalleldata);
        }
      }
    } else {
      UserProfile.setErroMessage(response.message);
    }
    return objPalletResOrderDet;
  };

  var GetOrderDetailsByOrderId = async function (orderdetails) {
    var objPalletResOrderDet = [];
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + OrderDetails + orderdetails.order_id,
      HTTPRequest.RequestType.POST,
      header
    );
    if (response.status) {
      // var k = 0;
      // for (var i = 0; i < response.data.length; i++) {
      //   var meterialdetails = response.data[i].master_serial
      //     .substring(1, response.data[i].master_serial.length - 1)
      //     .replace(/["']/g, "")
      //     .split(",");
      //   for (var j = 0; j < meterialdetails.length; j++) {
      //     var objorderdet = {};
      //     objorderdet.id = k++;
      //     objorderdet.create_by = response.data[i].create_by;
      //     objorderdet.create_time = response.data[i].create_time;
      //     objorderdet.line = response.data[i].line;
      //     objorderdet.handler = response.data[i].handler;
      //     objorderdet.line = response.data[i].line;
      //     objorderdet.master_serial = meterialdetails[j];
      //     objorderdet.no_print = response.data[i].no_print;
      //     objorderdet.order_id = response.data[i].order_id;
      //     objorderdet.pallet_number = response.data[i].pallet_number;
      //     objorderdet.part_number = response.data[i].part_number;
      //     objorderdet.scan_time = response.data[i].scan_time;
      //     objorderdet.status = orderdetails.status;
      //     objPalletResOrderDet.push(objorderdet);
      //   }
      // }
      //PalletResorderDetails = objPalletResOrderDet;
      return response.data;
    } else {
      UserProfile.setErroMessage(response.message);
      return objPalletResOrderDet;
    }
  };
  var PalletResultorder = function () {
    return PalletResorderDetails;
  };

  return {
    GetOrderDetailsByOrderId: GetOrderDetailsByOrderId,
    PalletOrderDetailsDisplayColumn: PalletOrderDetailsDisplayColumn,
    PalletResultorder: PalletResultorder,
    BulkOrderDisplayColumn: BulkOrderDisplayColumn,
    GetOrderDetailsByIds: GetOrderDetailsByIds,
    DeleteOrderByIds: DeleteOrderByIds,
    SetprintOrderdetails: SetprintOrderdetails,
    UpdateOrderdetails: UpdateOrderdetails,
  };
})();

export default OrderDetailsModel;
