import HTTPRequest from "../Config/HTTPRequest";
import UserProfile from "./UserSession";
var PrinterModel = (function () {
  const Printerurl = "printers/";
  var Printers = [];
  var GetAllPrinter = async function () {
    if (Printers.length <= 0) {
      await GetAllPrinters();
    }
    return Printers;
  };
  var PrinterGridHeader = () => {
    return [
      {
        headerName: "Printer Id",
        field: "printer_id",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
      },
      {
        headerName: "Printer Name",
        field: "printer_name",
        options: {
          filter: true,
          sort: true,
        },
        width: 220,
      },
      {
        headerName: "ip address",
        field: "ip_address",
        options: {
          filter: true,
          sort: true,
        },
        width: 130,
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
  var GetAllPrinters = async function () {
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Printerurl,
      "POST",
      header
    );
    if (response.status) {
      Printers = response.data;
    }
  };
  var UCPrinter = async function (bodydata, Pid) {
    var body = {};
    body = bodydata;
    var id = Pid === "" || Pid === undefined ? "" : Pid;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Printerurl + id,
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
  var DeletePrinterById = async function (Printer_id) {
    var body = {};
    //body.ids = Customer_ids;
    var header = HTTPRequest.GetLoginHeader(UserProfile.getUrlToken());
    var response = await HTTPRequest.GetHttpRequest(
      HTTPRequest.GetToken(
        UserProfile.getuserid() + ":" + UserProfile.getusertoken()
      ),
      UserProfile.getUrl() + Printerurl + Printer_id,
      HTTPRequest.RequestType.DELETE,
      header,
      body
    );
    if (response.status) {
      return response.message;
    } else {
      UserProfile.setErroMessage(response.message);
      if (response.message === null || response.message === "")
        return "Failed to delete Printer";
      else return response.message;
    }
  };
  return {
    GetAllPrinter: GetAllPrinter,
    GetAllPrinters: GetAllPrinters,
    UCPrinter: UCPrinter,
    DeletePrinterById: DeletePrinterById,
    PrinterGridHeader: PrinterGridHeader,
  };
})();
export default PrinterModel;
