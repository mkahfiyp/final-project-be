import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();
const blogController = new BlogController();

// Public routes
router.get('/', blogController.getBlogs); // GET /blog
router.get('/:slug', blogController.getBlogBySlug); // GET /blog/:slug

// Admin routes (protected)
router.post('/', verifyToken, blogController.createBlog); // POST /blog
router.put('/:id', verifyToken, blogController.updateBlog); // PUT /blog/:id
router.delete('/:id', verifyToken, blogController.deleteBlog); // DELETE /blog/:id
router.get('/admin/all', verifyToken, blogController.getAllBlogsAdmin); // GET /blog/admin/all
router.get('/admin/:id', verifyToken, blogController.getBlogById); // GET /blog/admin/:id

export { router as blogRouter };
