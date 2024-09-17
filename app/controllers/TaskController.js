import mongoose from "mongoose";
import TasksModel from "../model/TasksModel.js";
export const CreateTask = async (req, res) => {
  try {
    let reqBody = req.body;
    let user_id = req.headers["user_id"];
    reqBody.user_id = user_id;
    let data = await TasksModel.create(reqBody);
    return res.json({ status: "created", data: data });
  } catch (err) {
    return res.json({ status: "fail", message: err.toString() });
  }
};

export const UpdateTaskStatus = async (req, res) => {
  try {
    let id = req.params.id;
    let status = req.params.status;
    let user_id = req.headers["user_id"];

    let data = await TasksModel.updateOne(
      { _id: id, user_id: user_id },
      { status: status }
    );
    return res.json({ status: "updated successfully", data: data });
  } catch (err) {
    return res.json({ status: "fail", message: err.toString() });
  }
};

export const TaskListByStatus = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    let status = req.params.status;
    let data = await TasksModel.find({ user_id: user_id, status: status });
    return res.json({
      status: "success",
      message: "Task List by status",
      data: data,
    });
  } catch (err) {
    return res.json({ status: "fail", message: e.toString() });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    let user_id = req.headers["user_id"];
    await TasksModel.deleteOne({ _id: id, user_id: user_id });
    return res.json({ status: "success", message: "Task deleted" });
  } catch (e) {
    return res.json({ status: "fail", message: e.toString() });
  }
};

export const CountTask = async (req, res) => {
  try {
    let ObjectId = mongoose.Types.ObjectId;
    let user_id = new ObjectId(req.headers["user_id"]);
    let data = await TasksModel.aggregate([
      { $match: { user_id: user_id } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);

    return res.json({
      status: "success",
      message: "Count successfully",
      data: data,
    });
  } catch (e) {
    return res.json({ status: "fail", message: e.toString() });
  }
};
