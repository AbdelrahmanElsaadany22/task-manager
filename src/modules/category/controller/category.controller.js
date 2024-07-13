import { ApiFeatures } from "../../../utils/ApiFeatures.js";
import { catchAsyncError } from "../../../utils/error.handler.js";
import userModel from "../../user/model/user.model.js";
import { categoryModel } from "../model/category.model.js";

export const addCategory=catchAsyncError(async(req,res)=>{
    const {name}=req.body
    const category=await categoryModel.create({name,user:req.user.id})
    const addCategoryToUser=await userModel.findByIdAndUpdate(req.user.id,{$push: { categories:category._id }})
    res.status(200).json({message:"Category Added Successfully"})
})

export const getCategories=catchAsyncError(async(req,res)=>{
    const apiFeature = new ApiFeatures(categoryModel.find(), req.query).filterByCategory().paginate()
    const categories=await apiFeature.query
    if(!categories)
        res.status(404).json({message:"There Is No Categories To Show"})
    res.status(200).json({categories})
})

export const updateCategory=catchAsyncError(async(req,res)=>{
    const { id } = req.params
    const { name } = req.body
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name }, { new: true })
    if (!updatedCategory) {
        return res.status(404).json({ message: "Category Not Found!" })
    }
    res.status(200).json({ message: "Category Updated Successfully!", category: updatedCategory })
})

export const deleteCategory=catchAsyncError(async(req,res)=>{
    const { id } = req.params
    const category = await categoryModel.findByIdAndDelete(id)
    if (!category) {
        return res.status(404).json({ message: "Category Not Found!" })
    }
    await userModel.findByIdAndUpdate(category.user, { $pull: { categories: id } })
    res.status(200).json({ message: "Category Deleted Successfully!" })
})