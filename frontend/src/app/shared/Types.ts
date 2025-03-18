export interface Article {
  _id?: string;
  title: string;
  body: string;
  author?: string;
  image: string;
  category: string;
  publishDate?: string;
  lastUpdate?: string;
  comments?: Comment[];
  likes?: number;
  readingTime: string;
  posts?: Article[];
}

export interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email: string | null | undefined;
  mobile?: string | null | undefined;
  password: string | null | undefined;
  avatar?: string;
  savedPosts?: Article[];
  likedPosts?: Article[];
  comments?: Comment[];
  replies?: Reply[];
  posts:[]
}

export interface Comment {
  _id?: string ;
  likes: number;
  dislikes: number;
  replys: Comment[];
  publishDate: Date;
  body: string;
  writer: string;
}

export interface Reply {
  id?: string | null | undefined;
  commentId: string;
  userId: string;
  reply: string;
  date: string;
  likes: number;
}
