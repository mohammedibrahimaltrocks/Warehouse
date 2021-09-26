import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateUser extends Component {
  render() {
    return (
      <div className="container-lg frmusr">
        <div className="row">
          <div className="col align-self-start"></div>
          <div className="col align-self-center">
            <h4>System User Details</h4>
          </div>
          <div className="col align-self-end"></div>
        </div>
        <div className="row form-group">
          <div className="Col-2 col-md-4">
            <button className="form-control">Save</button>
          </div>
          <div className="Col-2 col-md-4">
            <button className="form-control">Reset</button>
          </div>
          <div className="Col-2 col-md-4">
            <Link to="/">
              <button className="form-control">Exit</button>
            </Link>
          </div>
        </div>

        <div className="row form-group">
          <div className="col-2">
            <label>User ID*</label>
          </div>
          <div className="col-3">
            <input name="userId" className="form-control"></input>
          </div>
          <div className="col-2">IsActive</div>
          <div className="col-3">
            <select className="browser-default custom-select">
              <option selected="">Y | Active</option>
              <option value="1">N | InActive</option>
            </select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-2">User name</div>
          <div className="col-3">
            <input name="username" className="form-control"></input>
          </div>
          <div className="col-2">Password Last Update</div>
          <div className="col-3">
            <select className="browser-default custom-select"></select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-2">Password</div>
          <div className="col-3">
            <input name="Password" className="form-control"></input>
          </div>
          <div className="col-2"></div>
          <div className="col-3"></div>
        </div>
        <div className="row form-group">
          <div className="col-2">Department</div>
          <div className="col-3">
            <select className="browser-default custom-select"></select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-2">Access Group *</div>
          <div className="col-3">
            <select className="browser-default custom-select"></select>
          </div>
          <div className="col-2">
            <button className="form-control">Set Access Group</button>
          </div>
          <div className="col"></div>
        </div>
        <div className="row form-group">
          <div className="col-2">Default Printer</div>
          <div className="col-8">
            <select className="browser-default custom-select"></select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-2">Default Printer</div>
          <div className="col-8">
            <select className="browser-default custom-select"></select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-2">Description</div>
          <div className="col-8">
            <input className="form-control"></input>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-2">Remarks</div>
          <div className="col-8">
            <input className="form-control"></input>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateUser;
