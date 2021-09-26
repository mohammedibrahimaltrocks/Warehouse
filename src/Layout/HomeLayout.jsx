import React, { Component } from "react";
import Menu from "../Home/Menu";
class HomeLayout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-sm-2">
          <div className="card menubody cardboder">
            <div className="card-header">
              <div>
                <h5 className="menuheader">Sea-Air Logistic (H.K.) Ltd</h5>
              </div>
            </div>
            <div className="card-body">
              <div>
                <h5 className="card-title">Warehouse DataCollection</h5>
              </div>
              <div id="menu">
                <Menu.MainMenu></Menu.MainMenu>
              </div>
            </div>
          </div>
        </div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default HomeLayout;
