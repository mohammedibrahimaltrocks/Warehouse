import UserProfile from "./UserSession";
import HTTPRequest from "../Config/HTTPRequest";
import AccessGroupModel from "./AccessGroupModel";
import DepartmentModel from "./DepartmentModel";
import PrinterModel from "./PrinterModel";
import Enumerable from "linq";

const Getuser = "users/";

var SystemUserModel = (function () {
  var UserDetails = [];
  var GetUserDetail = async function () {
    await GetUserDetails();
    return UserDetails;
  };

  var CheckUserId = function (userid) {
    var result = Enumerable.from(UserDetails)
      .where((w) => w.user_id === userid)
      .toArray();
    if (result.length > 0) {
      return true;
    }
    return false;
  };

  var AddByUpdateUser = async function (id, userobj) {
    var response;
    var body = {
      user_id: userobj.userId,
      user_name: userobj.username,
      password: userobj.Password,
      department_id:
        userobj.Department === ""
          ? userobj.DepartmentItem[0].department_id
          : userobj.Department,
      access_groups: userobj.AccessGroup,
      default_printer_id:
        userobj.DefaultPrinter === ""
          ? userobj.PrintersItem[0].printer_id
          : userobj.DefaultPrinter,
      description: userobj.description,
      remarks: userobj.remark,
      isActive: userobj.Active,
    };
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    if (id === 0) {
      response = await HTTPRequest.GetHttpRequest(
        HTTPRequest.GetToken(
          UserProfile.getuserid() + ":" + UserProfile.getusertoken()
        ),
        UserProfile.getUrl() + Getuser,
        "PUT",
        header,
        body
      );
    } else {
      // eslint-disable-next-line no-unused-vars
      response = await HTTPRequest.GetHttpRequest(
        HTTPRequest.GetToken(
          UserProfile.getuserid() + ":" + UserProfile.getusertoken()
        ),
        UserProfile.getUrl() + Getuser + id,
        "PUT",
        header,
        body
      );
    }
    if (response.status) {
      return response.message;
    }
    if (id === 0) {
      return "Failed to Add user";
    } else {
      return "Failed to update user";
    }
  };
  var DeleteUserDetailbyId = async function (id) {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Getuser + id,
      "DELETE",
      header
    );
    if (response.status) {
      return response.message;
    }
    return "Falied to delete the user";
  };
  var GetUserDetailbyId = async function (id) {
    // var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    // var response = await HTTPRequest.GetHttpRequest(
    //   HTTPRequest.GetToken(
    //     UserProfile.getuserid() + ":" + UserProfile.getusertoken()
    //   ),
    //   UserProfile.getUrl() + Getuser + id,
    //   "POST",
    //   header
    // );
    // if (response.status) {
    // }
    // return "";
    var result = Enumerable.from(UserDetails)
      .where((w) => w.id === id)
      .toArray();

    return result[0];
  };
  var GetUserDetails = async function () {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Getuser,
      "POST",
      header
    );
    if (response.status) {
      var userdet = response.data;
      await AccessGroupModel.GetAllAccessGroups();
      await DepartmentModel.GetAllDepartments();
      await PrinterModel.GetAllPrinters();
      var AccessGroupd = await AccessGroupModel.GetAllAccessGroups();
      var departmentd = await DepartmentModel.GetAllDepartment();
      var Printerd = await PrinterModel.GetAllPrinter();
      var result = Enumerable.from(userdet)
        .join(
          Enumerable.from(AccessGroupd),
          (pk) => pk.access_groups,
          (fk) => fk.group_id,
          (userdetails, AccessGroup) => ({
            ...userdetails,
            AccessGroup,
          })
        )
        .join(
          Enumerable.from(departmentd),
          (pk1) => pk1.department_id,
          (fk1) => fk1.department_id,
          (userdetails, department) => ({
            ...userdetails,
            department,
          })
        )
        .join(
          Enumerable.from(Printerd),
          (pk1) => pk1.default_printer_id,
          (fk1) => fk1.printer_id,
          (userdetails, Printers) => ({
            ...userdetails,
            Printers,
          })
        )
        .select((s) => ({
          id: s.id,
          user_id: s.user_id,
          user_name: s.user_name,
          password: s.password,
          last_login: s.last_login,
          departmentid: s.department_id,
          Access_groupId: s.access_groups,
          Printerid: s.default_printer_id,
          department_Name: s.department.department_name,
          access_group: s.AccessGroup.group_name,
          printer_name: s.Printers.printer_name,
          description: s.description,
          remarks: s.remarks,
          isActive: s.isActive,
        }))
        .toArray();
      UserDetails = result;
      //UserDetails
    }
  };
  var UserSettingDisplayColumn = function () {
    return [
      {
        headerName: "user_id",
        field: "user_id",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "user_name",
        field: "user_name",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "password",
        field: "password",
        options: {
          filter: true,
          sort: true,
        },
        width: 120,
      },
      {
        headerName: "last_login",
        field: "last_login",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "department_Name",
        field: "department_Name",
        options: {
          filter: true,
          sort: true,
        },
        width: 140,
      },
      {
        headerName: "access_group",
        field: "access_group",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "printer_name",
        field: "printer_name",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "description",
        field: "description",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "remarks",
        field: "remarks",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "isActive",
        field: "isActive",
        options: {
          filter: true,
          sort: true,
        },
        width: 110,
      },
    ];
  };
  return {
    GetUserDetail: GetUserDetail,
    GetUserDetails: GetUserDetails,
    UserSettingDisplayColumn: UserSettingDisplayColumn,
    CheckUserId: CheckUserId,
    AddByUpdateUser: AddByUpdateUser,
    GetUserDetailbyId: GetUserDetailbyId,
    DeleteUserDetailbyId: DeleteUserDetailbyId,
  };
})();
export default SystemUserModel;
