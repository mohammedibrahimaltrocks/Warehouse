import { Base64 } from "js-base64";
const RequestType = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};
var HTTPRequest = (function () {
  function GetToken(key) {
    return Base64.encode(key);
  }

  async function GetHttpRequest(
    token,
    url,
    meth,
    header,
    body = null,
    islogin = false
  ) {
    try {
      if (body == null) {
        body = {};
        if (islogin) {
          body = {
            credentials: token,
          };
        } else {
          body = {
            token: token,
          };
        }
      } else {
        body.token = token;
      }
      var response = await fetch(url, {
        method: meth,
        mode: "cors",
        headers: header,
        body: JSON.stringify(body),
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
      var respobj = {};
      respobj.status = false;
      return respobj;
    }
  }
  function GetLoginHeader(Authorizationtoken) {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Authorizationtoken,
    };
    return headers;
  }

  return {
    GetHttpRequest: GetHttpRequest,
    GetToken: GetToken,
    GetLoginHeader: GetLoginHeader,
    RequestType: RequestType,
  };
})();
export default HTTPRequest;
