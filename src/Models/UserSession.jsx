import data from "../Config/data.json";
import Cookies from "js-cookie";
var UserProfile = (function () {
  var full_name = "";
  var test = "";
  var settest = function (name) {
    test = name;
  };
  var gettest = function () {
    return test;
  };
  var getName = function () {
    return full_name; // Or pull this from cookie/localStorage
  };

  var getUrlToken = function () {
    return data.Token;
  };
  var getUrl = function () {
    return data.Url;
  };
  var setName = function (name) {
    window.full_name = name;
    Cookies.set("full_name", name);
    //full_name = name;
    // Also set this in cookie/localStorage
  };
  var setuserid = function (_userid) {
    window.userid = _userid;
    Cookies.set("userid", _userid);
    //userid = _userid;
  };

  var getuserid = function () {
    var userid = Cookies.get("userid");
    if (userid === undefined) {
      return window.userid;
    } else {
      return Cookies.get("userid");
    }
  };

  var setusertoken = function (token) {
    window.usertoken = token;
    Cookies.set("usertoken", token);
    //usertoken = token;
  };
  var getusertoken = function () {
    var usertoken = Cookies.get("usertoken");
    if (usertoken === undefined) {
      return window.usertoken;
    } else {
      return Cookies.get("usertoken");
    }
  };

  var SetUserPrinter = function (printer) {
    window.userprinter = printer;
    Cookies.set("userprinter", printer);
    //userprinter = printer;
  };
  var SetUserAccessGroup = function (accessgroup) {
    window.useraccessgroup = accessgroup;
    Cookies.set("useraccessgroup", accessgroup);
    //useraccessgroup = accessgroup;
  };
  var SetUserDepartment = function (department) {
    window.userdepartment = department;
    Cookies.set("userdepartment", department);
    //userdepartment = department;
  };
  var getuserprinter = function () {
    var userprinter = Cookies.get("userprinter");
    if (userprinter === undefined) {
      return window.userprinter;
    } else {
      return Cookies.get("userprinter");
    }
  };
  var setUserAcessGroup = function () {
    var useraccessgroup = Cookies.get("useraccessgroup");
    if (useraccessgroup === undefined) {
      return window.useraccessgroup;
    } else {
      return Cookies.get("useraccessgroup");
    }
  };

  var setuserdeparment = function () {
    var userdepartment = Cookies.get("userdepartment");
    if (userdepartment === undefined) {
      return window.userdepartment;
    } else {
      return Cookies.get("userdepartment");
    }
  };

  var setLoginMessage = function (Message) {
    window.ErrorMessage = Message;
    Cookies.set("ErrorMessage", Message);
  };
  var GetLoginMessage = function () {
    var ErrorMessage = Cookies.get("ErrorMessage");
    if (ErrorMessage === undefined) {
      return window.ErrorMessage;
    } else {
      return Cookies.get("ErrorMessage");
    }
  };

  var setErroMessage = function (Message) {
    window.ResponseErrorMessage = Message;
    Cookies.set("ResponseErrorMessage", Message);
  };
  var GetErroMessage = function () {
    var ErrorMessage = Cookies.get("ResponseErrorMessage");
    if (ErrorMessage === undefined) {
      return window.ResponseErrorMessage;
    } else {
      return Cookies.get("ResponseErrorMessage");
    }
  };
  function ClearData() {
    Cookies.remove("full_name");
    Cookies.remove("userid");
    Cookies.remove("usertoken");
    Cookies.remove("userprinter");
    Cookies.remove("userdepartment");
    Cookies.remove("useraccessgroup");
    Cookies.remove("ErrorMessage");
    Cookies.remove("ResponseErrorMessage");
    window.full_name = "";
    window.userid = "";
    window.usertoken = "";
    window.userprinter = "";
    window.userdepartment = "";
    window.useraccessgroup = "";
    window.ErrorMessage = "";
    window.ResponseErrorMessage = "";
  }
  return {
    getName: getName,
    setName: setName,
    setuserid: setuserid,
    getuserid: getuserid,
    setusertoken: setusertoken,
    getusertoken: getusertoken,
    getUrlToken: getUrlToken,
    getUrl: getUrl,
    SetUserPrinter: SetUserPrinter,
    SetUserAccessGroup: SetUserAccessGroup,
    SetUserDepartment: SetUserDepartment,
    getuserprinter: getuserprinter,
    setUserAcessGroup: setUserAcessGroup,
    setuserdeparment: setuserdeparment,
    ClearData: ClearData,
    setLoginMessage: setLoginMessage,
    GetLoginMessage: GetLoginMessage,
    setErroMessage: setErroMessage,
    GetErroMessage: GetErroMessage,
  };
})();

export default UserProfile;
