import React, { Component, Fragment } from 'react';
import { getBlogDetail } from '../../store/blog/actions';
import { connect } from 'react-redux';
import { Typography, Button } from 'antd';
import './detail.css';

const { Title, Paragraph, Text } = Typography;

class BlogDetail extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.getBlogInfo(id);
  }

  goBack = () => {
    this.props.getBlogInfo();
    this.props.history.go(-1);
  }

  render() {
    const { blog } = this.props;
    return (
      <Fragment>
        {
          blog ? (
            <div className="blog-detail">
              <Title className="blog-title">{ blog.title }</Title>
             <Paragraph>
               { blog.content }
             </Paragraph>
            <Paragraph>
              <Text className="blog-time">创建时间：{ blog.create_at }</Text>
              <Text className="blog-author">作者：{ blog.author }</Text>
            </Paragraph>
            <Button onClick={this.goBack}>返回</Button>
            </div>
          ) : '没有数据'
        }
        
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  blog: state.blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
  getBlogInfo: (id) => dispatch(getBlogDetail(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
