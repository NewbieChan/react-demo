import React, { Component } from 'react';
import { Button, Divider, Table, Pagination } from 'antd';
import './blog.css';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class BlogListUI extends Component {

  addBlog = () => {
    this.props.history.push('/blog/add');
  }

  onChange = (pageNo) => {
    this.props.handleCurrentChange(pageNo);
  }

  onShowSizeChange = (pageNo, pageSize) => {
    console.log(pageNo);
    this.props.handleSizeChange(pageSize);
  }
  
  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/blog/${record.id}`}>{text}</Link>,
    }, {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    }, {
      title: '创建时间',
      dataIndex: 'create_at',
      key: 'create_at',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/blog/${record.id}`}>查看详情</Link>
          <Divider type="vertical" />
          <Link to={`/blog/${record.id}/edit`}>编辑</Link>
          <Divider type="vertical" />
          <Button type="danger" size="small" onClick={() => this.props.handleDeleteItem(record.id)}>删除</Button>
        </span>
      ),
    }];

    return (
      <div className="todo">
        <div className="todo-action">
          <Button type="primary" onClick={this.addBlog}>新增博客</Button>
        </div>
        <div className="todo-list">
          <Table columns={columns} dataSource={this.props.todoList} rowKey="id" pagination={false} />
        </div>
        <div className="pagination-box">
          <Pagination 
            defaultPageSize={this.props.pageSize} 
            total={this.props.total}
            onChange={this.onChange}
            pageSizeOptions={['10', '20', '30', '40']}
            // showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            defaultCurrent={this.props.pageNo}
            showTotal={total => `总共 ${total} 条`} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isVisable: state.blog.isVisable,
});

const mapDispatchToProps = dispatch => ({
  handleModalStatus: (status) => dispatch({
    type: 'IS_ADD',
    status,
  }),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogListUI));
