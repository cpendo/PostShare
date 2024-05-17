const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth") 
const postController = require("../controllers/postsControllers");

router.get('/', postController.getPosts);
router.get('/search', postController.getPostsByQuery );
router.post('/', auth,postController.createPost);
router.patch('/:id', auth,postController.updatePost);
router.delete('/:id', auth,postController.deletePost);
router.patch('/:id/likePost', auth,postController.likePost);

module.exports = router;