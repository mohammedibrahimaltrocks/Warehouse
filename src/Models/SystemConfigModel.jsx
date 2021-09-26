import UserProfile from "./UserSession";
import HTTPRequest from "../Config/HTTPRequest";

var SystemConfigModel = (function () {
  var SystemConfigDisplayColumn = function () {
    return [
      {
        headerName: "Category",
        field: "Category",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "IsUserEdit",
        field: "IsUserEdit",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "ConfigureID",
        field: "ConfigureID",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Description",
        field: "Description",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Value Type",
        field: "ValueType",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Value",
        field: "Value",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Value Sub 1",
        field: "ValueSub1",
        options: {
          filter: true,
          sort: true,
        },
        width: 200,
      },
      {
        headerName: "Value Sub 2",
        field: "ValueSub2",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "Last Modify User",
        field: "LastModifyUser",
        options: {
          filter: true,
          sort: true,
        },
        width: 100,
      },
      {
        headerName: "Create User",
        field: "CreateUser",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
      {
        headerName: "Create Date",
        field: "CreateDate",
        options: {
          filter: true,
          sort: true,
        },
        width: 150,
      },
    ];
  };
  return {
    SystemConfigDisplayColumn: SystemConfigDisplayColumn,
  };
})();
export default SystemConfigModel;
