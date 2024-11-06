import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost, toggleDislikePost, toggleLikePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);

router.post('/like/:postId', verifyToken, toggleLikePost);
router.post('/dislike/:postId', verifyToken, toggleDislikePost);


export default router;