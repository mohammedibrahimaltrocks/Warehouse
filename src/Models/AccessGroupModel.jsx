import HTTPRequest from "../Config/HTTPRequest";
import UserProfile from "./UserSession";
var AccessGroupModel = (function () {
  var AccessGroupurl = "groups/";

  var AccessGroupGridHeader = () => {
    return [
      {
        headerName: "Group Id",
        field: "group_id",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Group Name",
        field: "group_name",
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
        width: 150,
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
  var GetAllAccessGroups = async function () {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + AccessGroupurl,
      "POST",
      header
    );
    if (response.status) {
      return response.data;
    }
  };
  var UCAccessGroup = async function (bdata, ACGid) {
    var body = {};
    body = bdata;
    var id = ACGid === "" || ACGid === undefined ? "" : ACGid;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + AccessGroupurl + id,
      HTTPRequest.RequestType.PUT,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      if (response.message === null || response.message === "")
        return "Failed to Add/Update Access Group";
      else return response.message;
    }
  };
  var DeleteAccessGroupById = async function (GroupAccessid) {
    var body = {};
    //body.ids = Customer_ids;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + AccessGroupurl + GroupAccessid,
      HTTPRequest.RequestType.DELETE,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      if (response.message === null || response.message === "")
        return "Failed to delete Access Group";
      else return response.message;
    }
  };
  return {
    GetAllAccessGroups: GetAllAccessGroups,
    AccessGroupGridHeader: AccessGroupGridHeader,
    UCAccessGroup: UCAccessGroup,
    DeleteAccessGroupById: DeleteAccessGroupById,
  };
})();
export default AccessGroupModel;
