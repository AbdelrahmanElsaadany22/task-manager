import { ApiFeatures } from "../../../utils/ApiFeatures.js";
import { catchAsyncError } from "../../../utils/error.handler.js";
import categoryModel from "../../category/model/category.model.js";
import { taskModel } from "../model/task.model.js";
export const addTask=catchAsyncError(async(req,res)=>{
    const { visibility, type,  text, listItems, category } = req.body
    const task=await taskModel.create({
        visibility,type,
        text: type === 'Text' ? text : undefined,
        listItems: type === 'List' ? listItems : undefined,
        category,user:req.user.id})
        await categoryModel.findByIdAndUpdate(category, { $push: { tasks: task._id } })
        res.status(201).json({ message: 'The Task created successfully'})
})

export const getTasks = catchAsyncError(async (req, res) => {
    let query = taskModel.find({ visibility: 'Private' });
    const apiFeatures = new ApiFeatures(query, req.query)
        .paginate()
        .filterByVisibility('Private')
    const publicTasks = await apiFeatures.query
    if (!publicTasks.length) {
        return res.status(404).json({ message: "There are no public tasks to show!" });
    }
    const privateTasks = await taskModel.find({ visibility: 'Private', user: req.user.id })
    if (privateTasks.length !== 0) {
        return res.status(200).json({ publicTasks, privateTasks })
    }
    return res.status(200).json({ publicTasks })
});
export const updateTask=catchAsyncError(async(req,res)=>{
    const { id } = req.params;
    const updateData = req.body;
    const updatedTask = await taskModel.findByIdAndUpdate(id ,updateData, { new: true, runValidators: true });
    if (!updatedTask) {
        return res.status(404).json({ message: "Task not found!" })
    }
    await categoryModel.findByIdAndUpdate(updateData.category, { $addToSet: { tasks: id } })
    res.status(200).json({ message: "Task updated successfully"})
})
export const deleteTask = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
        return res.status(404).json({ message: "Task not found!" })
    }
    await categoryModel.findByIdAndUpdate(deletedTask.category, { $pull: { tasks:id} })

    res.status(200).json({ message: "Task deleted successfully" })
});

