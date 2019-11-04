import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout'; // 默认布局
import routes from './routes';

// 登录路由
const loginRoute = routes.find(({ path }) => path === '/login');
// 注册路由
const registerRoute = routes.find(({ path }) => path === '/register');

class App extends Component {
  componentDidMount() {
    const username = localStorage.getItem('username') || '';
    const token = localStorage.getItem('token') || '';
    if (username && token) {
      this.props.testLogin(username, token);
    }
  }

  render() {
    const { auth } = this.props; // 登录凭证
    return (
      <Switch>
        <Route exact path={registerRoute.path} component={registerRoute.component} />
        <Route exact path={loginRoute.path} render={({ history }) => {
          const Login = loginRoute.component
          if (auth) {
            return <Redirect to="/blog" />
          } else {
            return <Login history={history} />
          }
        }} />
        <Route path="/" render={() => auth ? <DefaultLayout/> : <Redirect to="/login"/>}/>
      </Switch>
    )
  }
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.user.token !== '',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testLogin: (username, token) => dispatch({
      type: 'IS_LOGIN',
      payload: {
        username: username,
        token: token,
      },
    }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
