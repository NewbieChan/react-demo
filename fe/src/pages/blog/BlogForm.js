import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import {
  addBlog,
  getBlogDetail,
  updateBlog,
} from '../../store/blog/actions'; // 3. 引入 actionCreators
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const { TextArea } = Input;

class FormBlog extends Component {

  state = {
    title: '新增博客'
  }

  componentWillMount() {
    const id = this.props.match.params.id || '';
    if (id) {
      this.setState(() => ({
        title: '编辑博客'
      }))
      this.props.getBlogInfo(id);
    } else {
      this.setState(() => ({
        title: '新增博客'
      }))
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id || '';
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { title, content } = values;
        if (id) {
          this.props.updateBlog(id, title, content);
        } else {
          this.props.addBlog(title, content);
        }
        this.props.form.resetFields();
      }
    });
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    this.props.getBlogInfo();
    this.props.history.go(-1);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { blog } = this.props;
    const styleClass = {
      padding: '30px 40px',
    }
    return (
      <div style={styleClass}>
        <h2>{ this.state.title }</h2>
        <Form>
          <Form.Item
            label="标题">
            {getFieldDecorator('title', {
              initialValue: blog ? blog.title : '',
              rules: [{ required: true, message: 'Please input blog title!' }],
            })(
              <Input placeholder="title" />
            )}
          </Form.Item>
          <Form.Item
            label="内容">
            {getFieldDecorator('content', {
              initialValue: blog ? blog.content : '',
              rules: [{ required: true, message: 'Please input blog content!' }],
            })(
              <TextArea rows={5} placeholder="博客内容" />
            )}
          </Form.Item>
          <Form.Item>
            <Button style={ {'marginRight': '20px'} }
              onClick={this.cancel}>
              取消
            </Button>
            <Button type="primary" onClick={this.handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const BlogForm = Form.create({ name: 'FormBlog' })(FormBlog);

const mapStateToProps = state => ({
  blog: state.blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
  getBlogInfo: (id) => dispatch(getBlogDetail(id)),
  addBlog: (title, content) => dispatch(addBlog(title, content)),
  updateBlog: (id, title, content) => dispatch(updateBlog(id, title, content)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogForm));
