const BlogModel = require("../models/BlogModel");

module.exports.getBlogs = async (req, res) => {
    const blog = await BlogModel.find();
    res.send(blog);
}

module.exports.detailBlogs = async (req, res) => {
    const { id } = req.params;

    const blog = await BlogModel.findById(id);
    res.send(blog);
};

module.exports.saveBlogs = (req, res) => {
    const blog = req.body;

    BlogModel.create(blog)
        .then((data) => {
            console.log("Saved successfully");
            res.status(201).send(data);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(500).send({ error: error.message, msg: "Something went wrong!" });
        });
}

module.exports.updateBlogs = (req, res) => {
    const { id } = req.params;
    const { blog } = req.body;

    BlogModel.findByIdAndUpdate(id, {blog})
        .then(() => res.send("Updated successfully"))
        .catch((error) => {
            console.log(error.message);
            res.send({error: error.message, msg: "Something went wrong!"});
        });
}

module.exports.deleteBlogs = (req, res) => {
    const { id } = req.params;

    BlogModel.findByIdAndDelete(id)
        .then(() => res.send("Deleted successfully"))
        .catch((error) => {
            console.log(error.message);
            res.send({error: error.message, msg: "Something went wrong!"});
        });
}
