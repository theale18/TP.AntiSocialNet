export interface User {
  id: number;
  nickName: string;
  name?: string;
  email?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface PostImage {
  id: number;
  imageUrl: string;
  postId: number;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
}

export interface Post {
  id: number;
  description: string;
  userId: number;
  tags?: Tag[];
  images?: PostImage[];
  comments?: Comment[];
}
