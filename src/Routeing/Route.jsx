/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { createHashHistory } from "history";
import Home from '../Home/Home';
import CreateUser from '../User/CreateUser';
import forgetpassword from '../User/ForgetPassword';
import HomeLayout from '../Layout/HomeLayout';
import LoginLayout from '../Layout/LoginLayout';
import PalletLabel from '../Menu/PalletLabel';
import PalletResult from '../Menu/PalletResult';
import UserSettingsMaster from '../Menu/UserSettingsMaster';
import BulkOrder from '../Menu/BulkOrder';
import Ontheshelf from '../Menu/Ontheshelf';
import SystemConfiguraton from '../Menu/SystemConfiguration';
import Customer from '../Menu/Customer';
import AccessGroup from '../Menu/AccessGroup';
import Printer from '../Menu/Printer';
import Department from '../Menu/Department';
import Locations from '../Menu/Locations';

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale',
};
const history = createHashHistory()
const AppLayout = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <Layout>
        <Component {...matchProps} />
      </Layout>
    )}
  />
);
export default class Routes extends Component {
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Router history={history}>
          <Switch>
            <AppLayout
              path="/"
              exact
              component={Home}
              layout={LoginLayout}
              {...this.props}
            />
            <AppLayout
              path="/CreateUser"
              component={CreateUser}
              layout={LoginLayout}
              {...this.props}
            />
            <AppLayout
              path="/forgetpassword"
              component={forgetpassword}
              layout={LoginLayout}
              {...this.props}
            />
            <AppLayout
              path="/PalletLabel"
              component={PalletLabel}
              layout={HomeLayout}
              {...this.props}
            />
            <AppLayout
              path="/PalletResult"
              component={PalletResult}
              layout={HomeLayout}
              {...this.props}
            />
            <AppLayout
              path="/UserSettingsMaster"
              component={UserSettingsMaster}
              layout={HomeLayout}
              {...this.props}
            />
            <AppLayout
              path="/BulkOrder"
              component={BulkOrder}
              layout={HomeLayout}
            />
            <AppLayout
              path="/Ontheshelf"
              component={Ontheshelf}
              layout={HomeLayout}
            />
            <AppLayout
              path="/SystemConfiguraton"
              component={SystemConfiguraton}
              layout={HomeLayout}
            />
            <AppLayout
              path="/Customer"
              component={Customer}
              layout={HomeLayout}
            />
            <AppLayout
              path="/AccessGroup"
              component={AccessGroup}
              layout={HomeLayout}
            />
            <AppLayout
              path="/Printer"
              component={Printer}
              layout={HomeLayout}
            />
            <AppLayout
              path="/Department"
              component={Department}
              layout={HomeLayout}
            />
            <AppLayout
              path="/Location"
              component={Locations}
              layout={HomeLayout}
            />
          </Switch>
        </Router>
      </AlertProvider>
    );
  }
}
