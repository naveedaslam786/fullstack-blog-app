const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const users = require('../data/users.json');
const postsFilePath = path.join(__dirname, '../data/posts.json');
let posts = require('../data/posts.json');

// GET all users
router.get('/users', (req, res) => {
  res.json(users);
});

// GET a single user
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: 'User not found' });
});

// GET posts by a user
router.get('/users/:id/posts', (req, res) => {
  const userPosts = posts.filter(p => p.userId == req.params.id);
  res.json(userPosts);
});

// POST update a post
router.post('/users/:userId/post/:postId', (req, res) => {
  const { userId, postId } = req.params;
  const updatedPost = req.body;

  const index = posts.findIndex(
    (post) => post.userId == userId && post.id == postId
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts[index] = {
    ...posts[index],
    ...updatedPost,
  };

  fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
    if (err) {
      console.error('Failed to write file:', err);
      return res.status(500).json({ message: 'Failed to update post' });
    }

    res.json({
      message: 'Post updated successfully',
      post: posts[index],
    });
  });
});

module.exports = router;
