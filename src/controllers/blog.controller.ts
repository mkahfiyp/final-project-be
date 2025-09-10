import { Request, Response } from 'express';
import { BlogService } from '../services/blog.services';

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  // GET /blog - Get all published blogs with pagination
  getBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.blogService.getAllBlogs(page, limit);

      res.status(200).json({
        success: true,
        message: 'Blogs retrieved successfully',
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve blogs',
        error: error.message,
      });
    }
  };

  // GET /blog/:slug - Get blog by slug
  getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;

      const blog = await this.blogService.getBlogBySlug(slug);

      if (!blog) {
        res.status(404).json({
          success: false,
          message: 'Blog not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Blog retrieved successfully',
        data: blog,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve blog',
        error: error.message,
      });
    }
  };

  // POST /blog - Create new blog (admin only)
  createBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content, excerpt, featured_image, published, slug } = req.body;
      
      // Get author_id from authenticated user (assumes user info is in req.user)
      const author_id = (req as any).user?.user_id;
      
      if (!author_id) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
        return;
      }

      if (!title || !content) {
        res.status(400).json({
          success: false,
          message: 'Title and content are required',
        });
        return;
      }

      const blog = await this.blogService.createBlog({
        title,
        content,
        excerpt,
        featured_image,
        author_id,
        published: published || false,
        slug,
      });

      res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: blog,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Failed to create blog',
        error: error.message,
      });
    }
  };

  // PUT /blog/:id - Update blog (admin only)
  updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, content, excerpt, featured_image, published, slug } = req.body;

      const blog = await this.blogService.updateBlog(id, {
        title,
        content,
        excerpt,
        featured_image,
        published,
        slug,
      });

      res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: blog,
      });
    } catch (error: any) {
      if (error.message === 'Blog not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Failed to update blog',
          error: error.message,
        });
      }
    }
  };

  // DELETE /blog/:id - Delete blog (admin only)
  deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      await this.blogService.deleteBlog(id);

      res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
      });
    } catch (error: any) {
      if (error.message === 'Blog not found') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to delete blog',
          error: error.message,
        });
      }
    }
  };

  // GET /blog/admin/all - Get all blogs including unpublished (admin only)
  getAllBlogsAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.blogService.getAllBlogsAdmin(page, limit);

      res.status(200).json({
        success: true,
        message: 'All blogs retrieved successfully',
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve blogs',
        error: error.message,
      });
    }
  };

  // GET /blog/admin/:id - Get blog by ID (admin only)
  getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const blog = await this.blogService.getBlogById(id);

      if (!blog) {
        res.status(404).json({
          success: false,
          message: 'Blog not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Blog retrieved successfully',
        data: blog,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve blog',
        error: error.message,
      });
    }
  };
}
