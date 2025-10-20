import { BlogRepository } from '../repositories/blog.repository';
import { Blog } from '../../prisma/generated/client';

export class BlogService {
  private blogRepository: BlogRepository;

  constructor() {
    this.blogRepository = new BlogRepository();
  }

  // Helper function to generate slug from title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Get all published blogs with pagination
  async getAllBlogs(page: number = 1, limit: number = 10): Promise<{
    blogs: Blog[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;
    
    const [blogs, total] = await Promise.all([
      this.blogRepository.findAllBlogs(limit, offset),
      this.blogRepository.countBlogs(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      blogs,
      total,
      page,
      limit,
      totalPages,
    };
  }

  // Get blog by slug
  async getBlogBySlug(slug: string): Promise<Blog | null> {
    return this.blogRepository.findBlogBySlug(slug);
  }

  // Create new blog
  async createBlog(data: {
    title: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    author_id: number;
    published?: boolean;
    slug?: string;
  }): Promise<Blog> {
    // Generate slug if not provided
    const slug = data.slug || this.generateSlug(data.title);

    // Check if slug already exists
    const existingBlog = await this.blogRepository.findBlogBySlugAdmin(slug);
    if (existingBlog) {
      throw new Error('Blog with this slug already exists');
    }

    return this.blogRepository.createBlog({
      ...data,
      slug,
    });
  }

  // Update blog
  async updateBlog(
    id: string,
    data: {
      title?: string;
      content?: string;
      excerpt?: string;
      featured_image?: string;
      published?: boolean;
      slug?: string;
    }
  ): Promise<Blog> {
    // Check if blog exists
    const existingBlog = await this.blogRepository.findBlogById(id);
    if (!existingBlog) {
      throw new Error('Blog not found');
    }

    // If title is being updated and no slug provided, generate new slug
    if (data.title && !data.slug) {
      data.slug = this.generateSlug(data.title);
    }

    // If slug is being updated, check if it already exists
    if (data.slug && data.slug !== existingBlog.slug) {
      const slugExists = await this.blogRepository.findBlogBySlugAdmin(data.slug);
      if (slugExists) {
        throw new Error('Blog with this slug already exists');
      }
    }

    return this.blogRepository.updateBlog(id, data);
  }

  // Delete blog
  async deleteBlog(id: string): Promise<void> {
    const existingBlog = await this.blogRepository.findBlogById(id);
    if (!existingBlog) {
      throw new Error('Blog not found');
    }

    await this.blogRepository.deleteBlog(id);
  }

  // Get blog by ID (admin)
  async getBlogById(id: string): Promise<Blog | null> {
    return this.blogRepository.findBlogById(id);
  }

  // Get all blogs including unpublished (admin)
  async getAllBlogsAdmin(page: number = 1, limit: number = 10): Promise<{
    blogs: Blog[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;
    
    const [blogs, total] = await Promise.all([
      this.blogRepository.findAllBlogsAdmin(limit, offset),
      this.blogRepository.countBlogsAdmin(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      blogs,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
