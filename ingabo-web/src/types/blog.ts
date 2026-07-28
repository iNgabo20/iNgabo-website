export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  tags: string[];
  category: string;
  published: boolean;
  publishedAt: string;
  viewsCount?: number;
  commentsCount?: number;
  readTimeMinutes?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  _id: string;
  blogId: string;
  name: string;
  email: string;
  message: string;
  isApproved: boolean;
  createdAt: string;
}
