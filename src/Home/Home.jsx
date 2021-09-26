/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import '../renderer/App.css';
import '../renderer/bootstrap.min.css';
import '../renderer/ReactBlockUI.css';
import Alert from 'react-bootstrap/Alert';
import BlockUi from 'react-block-ui';
import { withAlert } from 'react-alert';
import userprofile from '../Models/UserSession';
import UserLoginModel from '../Models/UserLoginModel';

import {
  types,
  getWindowDimensions,
  stylecode,
  Invalidstylecode,
} from '../Common/Common';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      Messge: '',
      show: false,
      setShow: false,
      objuserprofile: userprofile,
      blocking: false,
    };
    this.Alert = props.alert;
    this.handleinput = this.handleinput.bind(this);
    this.BlockUI = this.BlockUI.bind(this);
    this.UnBlockUI = this.UnBlockUI.bind(this);
    this.HandleEnter = this.HandleEnter.bind(this);
  }

  handleinput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  HandleEnter = async (e) => {
    if (e.key === 'Enter') {
      await this.LoginProcess();
    }
  };

  DisplayAlert(msg, type) {
    this.Alert.show(msg, {
      timeout: 5000, // custom timeout just for this one alert
      type,
    });
  }

  LoginProcess = async () => {
    this.BlockUI();
    console.log(this.state);
    if (
      await UserLoginModel.UserLogin(this.state.username, this.state.password)
    ) {
      this.objuserprofile = userprofile;
      this.props.history.push('/PalletLabel');
    } else {
      this.setState({
        Messge: userprofile.GetLoginMessage(),
        username: '',
        password: '',
      });
      this.DisplayAlert(this.state.Messge, types.ERROR);
    }
    this.UnBlockUI();
  };

  BlockUI() {
    this.setState({ blocking: true });
  }

  UnBlockUI() {
    this.setState({ blocking: false });
  }

  render() {
    return (
      <div className="col-md-9">
        <BlockUi tag="div" blocking={this.state.blocking}>
          <div>
            <Alert show={this.state.show} variant="danger">
              <p>{this.state.Messge}</p>
            </Alert>
          </div>
          <div>
            <div className="logincontainer">
              <div className="d-flex justify-content-center h-50">
                <div className="card">
                  <div className="card-header">
                    <h3>Sign In</h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user" />
                          </span>
                        </div>
                        <input
                          type="text"
                          onChange={this.handleinput}
                          name="username"
                          className="form-control"
                          placeholder="username"
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-key" />
                          </span>
                        </div>
                        <input
                          type="password"
                          onChange={this.handleinput}
                          name="password"
                          className="form-control"
                          placeholder="password"
                          onKeyPress={this.HandleEnter}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="button"
                          onClick={this.LoginProcess}
                          value="Login"
                          className="btn float-left login_btn"
                        />
                        <input
                          type="button"
                          value="Exit"
                          className="btn float-right login_btn"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                      Don't have an account?{' '}
                      <Link to="/CreateUser"> Sign Up</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Link to="/forgetpassword"> Forgot your password?</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlockUi>
      </div>
    );
  }
}
export default withAlert()(Home);
