const { Router } = require('express');

const { getBlog, updateBlog, saveBlog, deleteBlog } = require('../controllers/BlogControllers');

const router = Router();

router.get("/get", getBlog);
router.post("/save", saveBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;