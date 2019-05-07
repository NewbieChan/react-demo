import React, { Component } from 'react';
import { Layout, Menu, Button, Icon } from 'antd';
import { withRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutFn } from '../store/user/actions';
import routes from '../routes';
import './defaultLayout.css';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const initRoutes = [];

routes.filter(({path}) => path !== '/login').forEach(({ path, component, children }) => {
  if (children && children.length) {
    children.forEach(child => {
      initRoutes.push({
        path: `${path}${child.path}`,
        component: child.component
      })
    })
  } else {
    initRoutes.push({
      path: path,
      component: component,
    });
  }
});

class DefaultLayout extends Component {
  state = {
    openKeys: [],
    selectedKeys: []
  }
  handleOpenChange = (keys) => {
    let openKeys = []
    if (keys.length) {
      openKeys = keys.slice(-1)
    }
    this.setState({ openKeys })
  }
  // 高亮
  setHighLightKeys = (props) => {
    const { pathname } = props.location
    let selectedKey = ''
    let openKey = ''
    if (pathname) {
      openKey = pathname.substr(1).split('/')[0]
      selectedKey = pathname.substr(1).replace('/', '.')
      if (selectedKey.substr(-1) === '.') {
        selectedKey = selectedKey.substring(0, selectedKey.length - 1)
      }
    }
    this.setState({
      openKeys: [openKey],
      selectedKeys: [selectedKey]
    })
  }

  componentDidMount() {
    this.setHighLightKeys(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setHighLightKeys(nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { match, location } = this.props
    // history 是变化的，这里只判断 match 与 location。参考链接: https://reacttraining.com/react-router/web/api/history/history-is-mutable
    if (!(match === nextProps.match && location === nextProps.location)) {
      return true
    }
    return nextState !== this.state

  }
  render() {
    const { openKeys, selectedKeys } = this.state
    const { username, userLogout } = this.props;
    return (
      <Layout className="layout">
        <Header className="layout-header">
          <h2 className="logo">欢迎你, {username}</h2>
          <Button className="logout-btn" onClick={userLogout}>退出</Button>
        </Header>
        <Layout className="layout-wrapper">
          <Sider width={200}>
            <Menu
              mode="inline"
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              onOpenChange={this.handleOpenChange}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="blog" title={<span><Icon type="user" />博客管理</span>}>
                <Menu.Item key="blog">
                  <NavLink to="/blog">博客列表</NavLink>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ margin: 24, minHeight: 280, backgroundColor: "white" }}>
            <Switch>
              {
                initRoutes.map(item => <Route key={item.path} path={item.path} exact component={item.component} />)
              }
              <Redirect to="/blog" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username
  };
}

const mapDisaptchToProps = dispatch => {
  return {
    userLogout: () => dispatch(logoutFn()),
  }
}

export default withRouter(connect(mapStateToProps, mapDisaptchToProps)(DefaultLayout));
