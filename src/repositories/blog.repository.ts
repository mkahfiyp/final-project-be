import { prisma } from '../config/prisma';
import { Blog } from '../../prisma/generated/client';

export class BlogRepository {
  // Get all published blogs
  async findAllBlogs(limit?: number, offset?: number): Promise<Blog[]> {
    return prisma.blog.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            user_id: true,
            username: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: limit,
      skip: offset,
    });
  }

  // Get blog by slug
  async findBlogBySlug(slug: string): Promise<Blog | null> {
    return prisma.blog.findUnique({
      where: {
        slug: slug,
        published: true,
      },
      include: {
        author: {
          select: {
            user_id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  // Get all blogs (including unpublished) for admin
  async findAllBlogsAdmin(limit?: number, offset?: number): Promise<Blog[]> {
    return prisma.blog.findMany({
      include: {
        author: {
          select: {
            user_id: true,
            username: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: limit,
      skip: offset,
    });
  }

  // Create a new blog
  async createBlog(data: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image?: string;
    author_id: number;
    published?: boolean;
  }): Promise<Blog> {
    return prisma.blog.create({
      data,
      include: {
        author: {
          select: {
            user_id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  // Update blog
  async updateBlog(
    id: string,
    data: {
      title?: string;
      slug?: string;
      content?: string;
      excerpt?: string;
      featured_image?: string;
      published?: boolean;
    }
  ): Promise<Blog> {
    return prisma.blog.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            user_id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  // Delete blog
  async deleteBlog(id: string): Promise<Blog> {
    return prisma.blog.delete({
      where: { id },
    });
  }

  // Get blog by ID (for admin operations)
  async findBlogById(id: string): Promise<Blog | null> {
    return prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            user_id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  // Check if slug exists
  async findBlogBySlugAdmin(slug: string): Promise<Blog | null> {
    return prisma.blog.findUnique({
      where: { slug },
    });
  }

  // Count total blogs
  async countBlogs(): Promise<number> {
    return prisma.blog.count({
      where: {
        published: true,
      },
    });
  }

  // Count total blogs admin
  async countBlogsAdmin(): Promise<number> {
    return prisma.blog.count();
  }
}
