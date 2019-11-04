import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  getAddTodoItem,
  getTodoList,
  deleteBlog,
} from '../../store/blog/actions'; // 3. 引入 actionCreators
import BlogListUI from './BlogListUI';
import { connect } from 'react-redux';
import { Modal } from 'antd';
const confirm = Modal.confirm;

class BlogList extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
  }
  componentDidMount = () => {
    this.props.getBlogs(this.state.pageNo, this.state.pageSize);
  }

  handleAddItem = () => {
    this.props.addBlog();
  }

  handleDeleteItem = (id) => {
    confirm({
      title: '操作提示',
      content: '确定要删除这个博客吗',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.delBlog(id);
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  handleCurrentChange = (pageNo) => {
    this.setState((prev) => {
      return {
        pageNo,
      }
    });
    this.props.getBlogs(pageNo, this.props.pageSize);
  }

  handleSizeChange = (pageSize) => {
    this.setState((prev) => {
      return {
        pageNo: 1,
        pageSize,
      }
    });
    this.props.getBlogs(1, pageSize);
  }

  render() {
    return (<BlogListUI
        title={this.props.title}
        content={this.props.content}
        todoList={this.props.todoList}
        total={this.props.total}
        pageNo={this.state.pageNo}
        pageSize={this.state.pageSize}
        handleCurrentChange={this.handleCurrentChange}
        handleSizeChange={this.handleSizeChange}
        handleAddItem={this.handleAddItem}
        handleDeleteItem={this.handleDeleteItem}
      />
    );
  }
}

const mapStateToProps = state => ({
  title: state.blog.usertitle,
  content: state.blog.content,
  todoList: state.blog.todoList,
  total: state.blog.total,
})

const mapDispatchToProps = dispatch => ({
  getBlogs: (pageNo, pageSize) =>  dispatch(getTodoList({pageNo, pageSize})),
  addBlog: () => dispatch(getAddTodoItem()),
  delBlog: (id) => dispatch(deleteBlog(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
