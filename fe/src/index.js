import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import history from './utils/history';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from './store';
import './index.css';
import App from './App';

moment.locale('zh-cn');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <LocaleProvider locale={zh_CN}><App /></LocaleProvider>
    </Router>
  </Provider>,
  document.getElementById('root'));
