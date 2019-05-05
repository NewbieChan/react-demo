import fetch from '../utils/fetch';

class BlogFetch {
  api = {
    getBlogList: '/blog/list',
    getBlogDetail: '/blog/detail',
    addBlog: '/blog/add',
    updateBlog: '/blog/update',
    deleteBlog: '/blog/delete',
  }
  // 获取博客列表
  async getBlogList() {
    const res = await fetch.get(this.api.getBlogList);
    return res;
  }
  // 获取博客详情
  async getBlogDetail(id = '') {
    const res = await fetch.get(this.api.getBlogDetail, { params: { id } });
    return res;
  }
  // 添加博客
  async addBlog(data = {}) {
    const res = await fetch.post(this.api.addBlog, data);
    return res;
  }
  // 更新博客
  async updateBlog(data = {}) {
    const res = await fetch.post(this.api.updateBlog, data);
    return res;
  }
  // 删除博客
  async deleteBlog(data = {}) {
    const res = await fetch.post(this.api.deleteBlog, data);
    return res;
  }
}

export default new BlogFetch();
