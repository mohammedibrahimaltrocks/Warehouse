import React, { Component } from "react";
import Menu from "../Home/Menu";
class LoginLayout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-sm-2">
          <div className="card menubody cardboder">
            <div className="card-header" style={{ padding: "1% 1% 1% 1%" }}>
              <div>
                <h4 className="menuheader">Sea-Air Logistic (H.K.) Ltd</h4>
              </div>
            </div>
            <div className="card-body">
              <div>
                <h4 className="card-title">Warehouse DataCollection</h4>
              </div>
              <div id="menu">
                <Menu.LoginInMenu></Menu.LoginInMenu>
              </div>
            </div>
          </div>
        </div>

        {this.props.children}
      </React.Fragment>
    );
  }
}
export default LoginLayout;
