import axiosClient from './axiosClient';

 const  blogsApi =  {
     getAllBlogs: () => axiosClient.get('/blogs'),
     getAllComments: (blogId) => axiosClient.get(`/blogs/${blogId}/comments`),
     addComment: (data) => axiosClient.post('/blogs/addComment', data),
     getEmojis: (blogId) => axiosClient.get(`/blogs/${blogId}/emojis`),
     addEmoji: (data) => axiosClient.post('/blogs/addEmoji', data),

}
export default blogsApi;
