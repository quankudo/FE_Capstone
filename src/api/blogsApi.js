import axiosClient from './axiosClient';

 const  blogsApi =  {
     getAllBlogs: () => axiosClient.get('/blogs'),
     getAllBlogsForAdmin: (params) => axiosClient.get('/blogs/admin', {params}),
     getAllTags: () => axiosClient.get('/blogs/tags'),
     getAllComments: (blogId) => axiosClient.get(`/blogs/${blogId}/comments`),
     addComment: (data) => axiosClient.post('/blogs/addComment', data),
     getEmojis: (blogId) => axiosClient.get(`/blogs/${blogId}/emojis`),
     addEmoji: (data) => axiosClient.post('/blogs/addEmoji', data),

}
export default blogsApi;
