const { Router } = require('express');

const { getBlogs, updateBlogs, saveBlogs, deleteBlogs } = require('../controllers/BlogControllers');

const router = Router();

router.get("/get", getBlogs);
router.post("/save", saveBlogs);
router.put("/update/:id", updateBlogs);
router.delete("/delete/:id", deleteBlogs);

module.exports = router;