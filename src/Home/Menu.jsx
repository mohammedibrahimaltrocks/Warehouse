import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserProfile from "../Models/UserSession";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  FormLabel,
  FormControl,
  Modal,
  Jumbotron,
  Form,
} from "react-bootstrap";
class LoginInMenu extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header" style={{ padding: "1% 1% 1% 1%" }}>
          <h5 className="card-title">User Login</h5>
        </div>
        <div className="card-body">
          <Link to="/">log in</Link>
          &nbsp;
          <Link to="/" className="disabled">
            Log out
          </Link>
          &nbsp;
          <Link to="/">Exit</Link>
        </div>
      </div>
    );
  }
}
class LoginoutMenu extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }
  logout() {
    UserProfile.ClearData();
  }
  render() {
    return (
      <div className="card">
        <div className="card-header" style={{ padding: "1% 1% 1% 1%" }}>
          <h5 className="card-title">User Login</h5>
        </div>
        <div className="card-body">
          <a href="/" className="disabled">
            log in
          </a>
          &nbsp;
          <Link to="/" className="rlink" onClick={this.logout}>
            Log out
          </Link>
          &nbsp;
          <Link to="/" className="rlink">
            Exit
          </Link>
        </div>
      </div>
    );
  }
}
class MainMenu extends Component {
  render() {
    return (
      // eslint-disable-next-line react/style-prop-object
      <div className="clsover">
        <div className="card">
          <div className="card-header" style={{ padding: "1% 1% 1% 1%" }}>
            <h5 className="card-title">Operation</h5>
          </div>
          <div className="card-body">
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/PalletLabel" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    Pallet Label
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/PalletResult" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    Pallet Result
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/BulkOrder" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    Bulk Order
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/Ontheshelf" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    上架 的版面
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
        <div className="card">
          <div className="card-header" style={{ padding: "1% 1% 1% 1%" }}>
            <h5 className="card-title">System Setting</h5>
          </div>
          <div className="card-body">
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/UserSettingsMaster" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    System User
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/Customer" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    Customer
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/AccessGroup" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    AccessGroup
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/Printer" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    Printer
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/Department" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    Department
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 menuccol">
                <Link to="/Location" className="rlink">
                  <Button className="form-control" size="sm" variant="light">
                    Location
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
        <LoginoutMenu />
      </div>
    );
  }
}
const Menu = { LoginoutMenu, LoginInMenu, MainMenu };
export default Menu;
