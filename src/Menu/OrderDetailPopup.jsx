/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";
import UserProfile from "../Models/UserSession";
import { DataGrid } from "@material-ui/data-grid";
import OrderDetailsModel from "../Models/OrderDetailsModel";
import OrderModel from "../Models/OrderModel";
import BlockUi from "react-block-ui";
import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from "../Common/Common";
import { withAlert } from "react-alert";

const options = {
  filterType: "checkbox",
};
const OrderStatus = [
  "select",
  "processing",
  "Completed",
  "onhold",
  "cancelled",
];

const OrderDetailPopup = ({
  show,
  handleClose,
  GetSelectedOrder,
  Orderid,
  title,
  columns,
  handleShow,
  alert,
}) => {
  const [orderobj, setorderobj] = useState();
  const [Orderstate, setOrderstate] = useState();
  const [soid, setsoid] = useState();
  const [Remarks, setRemarks] = useState();
  const [customername, setcustomername] = useState();
  const [orderid, setorderid] = useState();
  const [id, setid] = useState();
  const [rows, setrows] = useState([]);
  const SaveButtonClick = () => {};
  const ResetButtonClick = () => {};
  const [showd, setshowd] = useState();
  const [Nshow, setNshow] = useState();
  const [blocking, setblocking] = useState();
  const [SelectedOrderDetails, setSelectedOrderDetails] = useState();
  const [palletno, setpalletno] = useState();
  const [partno, setpartno] = useState();
  const [noprint, setnoprint] = useState();
  const [Screehheight, setScreenheight] = useState();

  useEffect(() => {
    handleClose();
    // Update the document title using the browser API
    if (show) {
      LoadGridData();
      setshowd(show);
      setid(Orderid);
      var size = getWindowDimensions();
      size.height /= 2;
      setScreenheight(size.height);
    } else {
      CleanFields();
    }
  }, [Orderid]);
  //

  const LoadGridData = async () => {
    handleClose();
    var response = "sucess";
    if (Orderid !== "") {
      CleanFields();
      var objorderdet = await OrderModel.GetAllOrdersById(Orderid);
      if (objorderdet.checked === "0") {
        response = await OrderModel.UpdateOrderstatus(Orderid);
        objorderdet.status = "Completed";
        objorderdet.checked = 1;
      }
      if (response !== "") {
        handleShow();
        setorderobj(objorderdet);
        setorderid(objorderdet.order_id);
        setOrderstate(objorderdet.status);
        setsoid(objorderdet.so_id);
        setcustomername(objorderdet.customer_name);
        setRemarks(objorderdet.remarks);
        var res = await OrderDetailsModel.GetOrderDetailsByOrderId(objorderdet);
        setrows(res);
      } else {
        handleClose();
        DisplayAlert(UserProfile.GetErroMessage(), types.ERROR);
      }
    }
  };
  const CleanFields = function () {
    setorderobj("");
    setorderid("");
    setOrderstate("select");
    setsoid("");
    setcustomername("");
    setRemarks("");
    setrows([]);
  };
  const DeleteOrderdetails = async function () {
    setshowd(true);
    await OrderDetailsModel.DeleteOrderByIds(GetSelectedOrder.toString());
    setshowd(false);
  };

  const printSetStatusEvent = async () => {
    printStatusEvent(true);
  };
  const noprintSetStatusEvent = async () => {
    printStatusEvent(false);
  };

  const printStatusEvent = async (status) => {
    setshowd(true);
    await OrderDetailsModel.SetprintOrderdetails(status, id);
    setshowd(false);
  };
  const NesterOrderDetailEdit = async () => {
    if (rows.length > 0) {
      setpalletno(rows[0].pallet_number);
      setpartno(rows[0].part_number);
      setnoprint(rows[0].no_print);
    }
    setNshow(true);
    setblocking(true);
    handleClose();
  };
  const NhandleClose = async () => {
    setNshow(false);
    setblocking(false);
    handleShow();
  };

  const GetOrderDetailsID = async (ids) => {
    GetSelectedOrder(ids);
    setSelectedOrderDetails(ids);
  };
  const SaveOrderDetails = async () => {
    setNshow(false);
    setblocking(true);
    var rowobj = [];
    for (var i = 0; i < rows.length; i++) {
      rowobj.push(rows[i].id);
    }
    await OrderDetailsModel.UpdateOrderdetails(
      noprint,
      palletno,
      partno,
      rowobj.toString()
    );
    await LoadGridData();
    setblocking(false);
    handleShow();
  };
  const DisplayAlert = function (msg, type) {
    alert.show(msg, {
      timeout: 5000, // custom timeout just for this one alert
      type: type,
    });
  };
  return (
    <div>
      <Modal
        show={Nshow}
        onHide={NhandleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header className="text-center" closeButton>
          <Modal.Title>
            <h3>Edit Order Details</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <FormLabel>pallet_number</FormLabel>
              <FormControl
                value={palletno}
                onChange={(e) => setpalletno(e.target.value)}
               />
            </Row>
            <Row>
              <FormLabel>part_number</FormLabel>
              <FormControl
                value={partno}
                onChange={(e) => setpartno(e.target.value)}
               />
            </Row>
            <Row>
              <FormLabel>no_print</FormLabel>
              <select
                className="form-control"
                onChange={(e) => setnoprint(e.target.value)}
                value={noprint}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </Row>
            <Row style={{ paddingTop: "10px" }}>
              <Col md={3}>
                <Button onClick={SaveOrderDetails}>Save</Button>
              </Col>
              <Col md={3}>
                <Button onClick={NhandleClose}>Cancel</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <BlockUi tag="div" blocking={blocking} className="col-lg-10">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header className="text-center" closeButton>
            <Modal.Title>
              <span>{title}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Container>
                <Row className="align-items-start">
                  <Col md={2}>
                    <Button size="sm" variant="light" onClick={SaveButtonClick}>
                      Save
                    </Button>{" "}
                  </Col>
                  <Col md={2}>
                    <Button
                      size="sm"
                      variant="light"
                      onClick={ResetButtonClick}
                    >
                      Reset
                    </Button>{" "}
                  </Col>
                  {/* <Col md={3}>
                  <Button size="sm" variant="light" onClick={handleClose}>
                    Exit
                  </Button>{" "}
                </Col> */}
                </Row>
              </Container>
              <Row className="popuprowpad">
                <Col md={4}>
                  <h4>Order Information</h4>{" "}
                </Col>
              </Row>
              <Row className="popuprowpad">
                <Col md={1}>
                  <FormLabel size="sm">OrderID</FormLabel>
                </Col>
                <Col md={3}>
                  <FormControl
                    type="text"
                    value={orderid}
                    disabled
                    size="sm"
                   />
                </Col>
                <Col md={1}>
                  <FormLabel size="sm">Order Status</FormLabel>
                </Col>
                <Col md={3}>
                  <FormControl
                    as="select"
                    name="Orderstate"
                    value={Orderstate}
                    size="sm"
                    onChange={(e) => setOrderstate(e.target.value)}
                    disabled
                  >
                    {OrderStatus.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </FormControl>
                </Col>
              </Row>
              <Row className="popuprowpad">
                <Col md={1}>
                  <FormLabel size="sm">SO Num</FormLabel>
                </Col>
                <Col md={3}>
                  <FormControl size="sm" type="text" value={soid} />
                </Col>
                {/* </Row>
              <Row style={{ paddingTop: "1%" }}> */}
                <Col md={1}>
                  <FormLabel size="sm">Customer</FormLabel>
                </Col>
                <Col md={3}>
                  <FormControl
                    size="sm"
                    type="text"
                    value={customername}
                   />
                </Col>
              </Row>
              <Row className="popuprowpad">
                <Col md={1}>
                  <FormLabel size="sm">Remarks</FormLabel>
                </Col>
                <Col md={3}>
                  <FormControl
                    size="sm"
                    type="text"
                    value={Remarks}
                   />
                </Col>
              </Row>
              <Row className="popuprowpad">
                <Col md={2}>
                  <FormLabel size="sm">Pallet Item</FormLabel>{" "}
                </Col>
              </Row>
              <Row className="popuprowpad">
                <Col md={1}>
                  <FormLabel size="sm">Search SN:</FormLabel>
                </Col>
                <Col md={2}>
                  <FormControl size="sm" type="text" />
                </Col>
                <Col>
                  <Button size="sm" variant="light">
                    OK
                  </Button>
                </Col>
                <Col>
                  <Button size="sm" variant="light">
                    Reset
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={printSetStatusEvent}
                  >
                    Set Print
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={noprintSetStatusEvent}
                  >
                    Set no Print
                  </Button>
                </Col>
                <Col>
                  <Button size="sm" variant="light">
                    New
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={NesterOrderDetailEdit}
                  >
                    Edit
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={DeleteOrderdetails}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </div>
            <div>
              <div
                style={{
                  height: Screehheight,
                  width: "100%",
                  paddingTop: "1%",
                }}
              >
                <DataGrid
                  checkboxSelection
                  rows={rows}
                  columns={columns}
                  options={options}
                  pageSize={25}
                  onSelectionModelChange={(newSelection) => {
                    GetOrderDetailsID(newSelection.selectionModel);
                  }}
                />
              </div>
            </div>
            <div className="form-group form-groupmb">
              <span>Number of Records Load : {rows.length}</span>
            </div>
          </Modal.Body>
        </Modal>
      </BlockUi>
    </div>
  );
};

export default withAlert()(OrderDetailPopup);
