import HTTPRequest from "../Config/HTTPRequest";
import UserProfile from "./UserSession";
var LocationModel = (function () {
  const Locationurl = "locations/";
  var Departments = [];
  var GetAllDepartment = function () {
    return Departments;
  };
  var LocationGridHeader = () => {
    return [
      {
        headerName: "Location Id",
        field: "location_id",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Location Name",
        field: "location_name",
        options: {
          filter: true,
          sort: true,
        },
        width: 180,
      },
      {
        headerName: "QR Code ",
        field: "qrcode",
        options: {
          filter: true,
          sort: true,
        },
        width: 180,
      },
      {
        headerName: "Occupied ",
        field: "occupied",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
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
        width: 180,
      },
    ];
  };
  var GetAllLocation = async function () {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Locationurl,
      "POST",
      header
    );
    if (response.status) {
      return response.data;
    }
  };

  var DeleteLocationById = async (DepartmentId) => {
    var body = {};
    //body.ids = Customer_ids;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Locationurl + DepartmentId,
      HTTPRequest.RequestType.DELETE,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      if (response.message === null || response.message === "")
        return "Failed to delete Department";
      else return response.message;
    }
  };
  var UCLocation = async function (bodydata, Locationtid) {
    var body = {};
    body = bodydata;
    var id = Locationtid === "" || Locationtid === undefined ? "" : Locationtid;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Locationurl + id,
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
  return {
    GetAllLocation: GetAllLocation,
    LocationGridHeader: LocationGridHeader,
    DeleteLocationById: DeleteLocationById,
    UCLocation: UCLocation,
  };
})();
export default LocationModel;
