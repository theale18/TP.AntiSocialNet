export interface User {
  id: number;
  nickName: string;
  email: string;
  createdAt?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  description: string;
  userId: number;
  createdAt: string;
  User?: User;
  Tags?: Tag[];
  PostImages?: PostImage[];
  commentCount?: number;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  visible: boolean;
  createdAt: string;
  User?: User;
}

export interface PostImage {
  id: number;
  url: string;
  postId: number;
}

export interface AuthContextType {
  user: User | null;
  login: (nickName: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (nickName: string, email: string) => Promise<{ success: boolean; message?: string }>;
  isAuthenticated: boolean;
}

export interface CreatePostData {
  description: string;
  userId: number;
  tagIds?: number[];
}

export interface CreateCommentData {
  content: string;
  userId: number;
  postId: number;
}

export interface CreatePostImageData {
  url: string;
  postId: number;
}