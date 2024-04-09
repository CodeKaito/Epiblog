const { Router } = require('express');

const { getBlogs, detailBlogs, updateBlogs, saveBlogs, deleteBlogs } = require('../controllers/BlogControllers');

const router = Router();

router.get("/get", getBlogs);
router.get("/get/:id", detailBlogs);
router.post("/save", saveBlogs);
router.put("/update/:id", updateBlogs);
router.delete("/delete/:id", deleteBlogs);

module.exports = router;