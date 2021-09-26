import HTTPRequest from "../Config/HTTPRequest";
import UserProfile from "./UserSession";
var CustomerModel = (function () {
  var GetCustomerurl = "Customers/";

  var CustomerGridHeader = () => {
    return [
      {
        headerName: "Customer Id",
        field: "customer_id",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Customer Name",
        field: "customer_name",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Category",
        field: "category: ",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Status",
        field: "isActive",
        options: {
          filter: true,
          sort: true,
        },
        width: 120,
      },

      {
        headerName: "Create By",
        field: "create_by",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Create time",
        field: "create_time",
        options: {
          filter: true,
          sort: true,
        },
        width: 170,
      },
      {
        headerName: "Modify By",
        field: "modify_by",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Modify Time",
        field: "modify_time",
        options: {
          filter: true,
          sort: true,
        },
        width: 170,
      },
    ];
  };
  var GetAllCustomers = async function () {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + GetCustomerurl,
      "POST",
      header
    );
    if (response.status) {
      return response.data;
    }
  };
  var UCCustomer = async function (bdata, Cid) {
    var body = {};
    body = bdata;
    var id = Cid === "" || Cid === undefined ? "" : Cid;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + GetCustomerurl + id,
      HTTPRequest.RequestType.PUT,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      return response.message;
    }
  };
  var DeleteCustomerById = async function (Customer_id) {
    var body = {};
    //body.ids = Customer_ids;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + GetCustomerurl + Customer_id,
      HTTPRequest.RequestType.DELETE,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      if (response.message === null || response.message === "")
        return "Failed to delete Customer";
      else return response.message;
    }
  };
  return {
    GetAllCustomers: GetAllCustomers,
    CustomerGridHeader: CustomerGridHeader,
    UCCustomer: UCCustomer,
    DeleteCustomerById: DeleteCustomerById,
  };
})();
export default CustomerModel;
