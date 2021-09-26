import HTTPRequest from "../Config/HTTPRequest";
import UserProfile from "./UserSession";
var ReportModel = (function () {
  var ReportUrl = "reports/";

  var GetReport = async (orderids) => {
    UserProfile.setErroMessage("");
    var body = {};
    body.order_ids = orderids.toString();
    body.token = HTTPRequest.GetToken(
      UserProfile.getuserid() + ":" + UserProfile.getusertoken()
    );
    var objOrderDet = [];
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + ReportUrl,
      HTTPRequest.RequestType.POST,
      header,
      body
    );
    if (response.status) {
      return response.data;
    } else {
      UserProfile.setErroMessage(response.message);
      return objOrderDet;
    }
  };
  return {
    GetReport: GetReport,
  };
})();
export default ReportModel;
