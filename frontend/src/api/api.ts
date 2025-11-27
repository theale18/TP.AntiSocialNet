import axios from 'axios';
import type {
  User,
  Post,
  Comment,
  Tag,
  PostImage,
  CreatePostData,
  CreateCommentData,
  CreatePostImageData
} from '../types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


//____________________________LOS USUARIOS_______________________________________________________________________

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (nickName: string, email: string): Promise<User> => {
  const response = await api.post<User>('/users', { nickName, email });
  return response.data;
};


//_____________________________LAS PUBLICACIONES_________________________________________________________________________

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/posts?userId=${userId}`);
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: CreatePostData): Promise<Post> => {
  const response = await api.post<Post>('/posts', data);
  return response.data;
};

//_____________________________LOS COMENTARIOS_________________________________________________________________________


export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/comments/post/${postId}`);
  return response.data;
};

export const createComment = async (data: CreateCommentData): Promise<Comment> => {
  const response = await api.post<Comment>('/comments', data);
  return response.data;
};

//_____________________________LAS ETIQUETAS_________________________________________________________________________


export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get<Tag[]>('/tags');
  return response.data;
};

//_____________________________LAS IMAGENES_________________________________________________________________________


export const getImagesByPostId = async (postId: number): Promise<PostImage[]> => {
  const response = await api.get<PostImage[]>(`/postimages/post/${postId}`);
  return response.data;
};

export const createPostImage = async (data: CreatePostImageData): Promise<PostImage> => {
  const response = await api.post<PostImage>('/postimages', data);
  return response.data;
};

export default api;