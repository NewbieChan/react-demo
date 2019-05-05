import React, { Component } from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';
import './login.css';
import { connect } from 'react-redux';
import { loginFn } from '../../store/user/actions'; 

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props.login(username, password);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginForm-wrapper">
         <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
     
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(loginFn(username, password)),
})

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default connect(null, mapDispatchToProps)(LoginForm);
