import React, { Component } from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';
import './register.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerFn } from '../../store/user/actions'; 

class NormalRegisterForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password, realname } = values;
        this.props.register(username, password, realname);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const passwordValidator = (rule, value, callback) => {
      if (value && value !== getFieldValue('password')) {
        callback('两次输入的密码不一致！')
      }
      callback();
    }
    return (
      <div className="registerForm-wrapper">
        <Form onSubmit={this.handleSubmit} className="register-form">
          <Form.Item>
            <h2>注 册</h2>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('realname', {
              rules: [{ required: true, message: '请输入真实姓名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="realname" />
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
            {getFieldDecorator('againPassword', {
              rules: [
                { required: true, message: '请再次输入密码!' },
                { validator: passwordValidator }
              ],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="again Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注 册
            </Button>
            <div className="register-form-user">已注册用户  <Link to="/login"> 请登录 </Link></div>
          </Form.Item>
        </Form>
      </div>
     
    );
  }
}

const mapDispatchToProps = dispatch => ({
  register: (username, password, realname) => dispatch(registerFn(username, password, realname)),
})

const RegisterForm = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default withRouter(connect(null, mapDispatchToProps)(RegisterForm));
