import UserProfile from "./UserSession";
import HTTPRequest from "../Config/HTTPRequest";

var UserLoginModel = (function () {
  const userlogin = "users/login/";
  async function UserLogin(username, password) {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = {};
    response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(username + ":" + password),
      UserProfile.getUrl() + userlogin,
      "POST",
      header,
      null,
      true
    );
    if (response.status) {
      UserProfile.setusertoken(response.data.token);
      UserProfile.setuserid(response.data.user_id);
      UserProfile.setName(response.data.user_name);
      UserProfile.SetUserPrinter(response.data.default_printer_id);
      UserProfile.setuserdeparment(response.data.department_id);
      UserProfile.setUserAcessGroup(response.data.access_groups);
      UserProfile.setLoginMessage(response.message);
      return true;
    } else {
      if (response.message === undefined) {
        response.message = "Login Failed";
      }
      UserProfile.setLoginMessage(response.message);
    }
    return false;
  }

  return {
    UserLogin: UserLogin,
  };
})();
export default UserLoginModel;
