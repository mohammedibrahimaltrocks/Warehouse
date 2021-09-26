import HTTPRequest from "../Config/HTTPRequest";
import UserProfile from "./UserSession";
var DepartmentModel = (function () {
  const Departmenturl = "departments/";
  var Departments = [];
  var GetAllDepartment = function () {
    return Departments;
  };
  var DepartmentGridHeader = () => {
    return [
      {
        headerName: "Department Id",
        field: "department_id",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Department Name",
        field: "department_name",
        options: {
          filter: true,
          sort: true,
        },
        width: 180,
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
  var GetAllDepartments = async function () {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Departmenturl,
      "POST",
      header
    );
    if (response.status) {
      Departments = response.data;
      return response.data;
    }
  };

  var DeleteDepartmentById = async (DepartmentId) => {
    var body = {};
    //body.ids = Customer_ids;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Departmenturl + DepartmentId,
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
  var UCDepartment = async function (bodydata, Departmentid) {
    var body = {};
    body = bodydata;
    var id =
      Departmentid === "" || Departmentid === undefined ? "" : Departmentid;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Departmenturl + id,
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
    GetAllDepartments: GetAllDepartments,
    GetAllDepartment: GetAllDepartment,
    DepartmentGridHeader: DepartmentGridHeader,
    DeleteDepartmentById: DeleteDepartmentById,
    UCDepartment: UCDepartment,
  };
})();
export default DepartmentModel;
