const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find();
    res.send(tasks);

    // res.send("Hello, world!");
}

module.exports.saveTasks = (req, res) => {
    const { task } = req.body;

    TaskModel.create({task})
        .then((data) => {
            console.log("Saved successfully");
            res.status(201).send(data);
        })
        .catch((error) => {
            console.log(error.message);
            res.send({error: error.message, msg: "Something went wrong!"});
        });
}

module.exports.updateTasks = (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    TaskModel.findByIdAndUpdate(id, {task})
        .then(() => res.send("Updated successfully"))
        .catch((error) => {
            console.log(error.message);
            res.send({error: error.message, msg: "Something went wrong!"});
        });
}

module.exports.deleteTasks = (req, res) => {
    const { id } = req.params;

    TaskModel.findByIdAndDelete(id)
        .then(() => res.send("Deleted successfully"))
        .catch((error) => {
            console.log(error.message);
            res.send({error: error.message, msg: "Something went wrong!"});
        });
}
