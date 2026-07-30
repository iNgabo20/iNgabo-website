import apiClient from "../lib/axios";
import { BlogPost, BlogComment } from "../types/blog";
import { ApiResponse, PaginatedData } from "../types/api";

export const blogService = {
  async getBlogs(params?: { page?: number; limit?: number; search?: string; tag?: string }): Promise<PaginatedData<BlogPost>> {
    const response = await apiClient.get<ApiResponse<PaginatedData<BackendBlog>>>("/blogs", { params });
    return { ...response.data.data, items: response.data.data.items.map(toBlogPost) };
  },
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await apiClient.get<ApiResponse<BackendBlog>>(`/blogs/${encodeURIComponent(slug)}`);
      return response.data.data ? toBlogPost(response.data.data) : null;
    } catch (error: unknown) {
      if (axiosStatus(error) === 404) return null;
      throw error;
    }
  },
  async getComments(blogId: string): Promise<BlogComment[]> {
    const response = await apiClient.get<ApiResponse<BlogComment[]>>("/comments", { params: { blog: blogId } });
    return response.data.data;
  },
  async addComment(data: { blogId?: string; name: string; email: string; message: string }): Promise<BlogComment> {
    const { blogId, ...comment } = data;
    const response = await apiClient.post<ApiResponse<BlogComment>>("/comments", { ...comment, ...(blogId ? { blog: blogId } : {}) });
    return response.data.data;
  },
};

type BackendBlog = Omit<BlogPost, "author" | "category" | "published" | "publishedAt"> & {
  author: { firstName: string; lastName: string };
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string;
};

function toBlogPost(blog: BackendBlog): BlogPost {
  return {
    ...blog,
    category: "Research article",
    published: blog.status === "PUBLISHED",
    publishedAt: blog.publishedAt ?? blog.createdAt,
    author: { name: `${blog.author.firstName} ${blog.author.lastName}`.trim() },
  };
}

function axiosStatus(error: unknown): number | undefined {
  return typeof error === "object" && error !== null && "statusCode" in error
    ? Number((error as { statusCode?: number }).statusCode)
    : undefined;
}
