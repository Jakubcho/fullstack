import Task from "@/models/task";
import dbConnect from "@/utils/dbConnect";
import { createRouter } from "next-connect";

const router = createRouter();

router
    .put(findAndUpdate)
    .delete(deleteTask)

async function findAndUpdate(req,res){
    const {id} = req.query;
    await dbConnect();

    try {
        const result = await Task.findByIdAndUpdate(
            id,
            {task:req.body.task},
            {new:true}
        );
        res.status(200).json({data:result, message:"Todo update Success"})
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
        console.log(error);
    }
}
async function deleteTask(req,res){
    const {id} = req.query;
    try {
        dbConnect();
        await Task.findByIdAndDelete(id);
        res.status(200).json({message: "Task deleted Successfully"})
    } catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}
export default router.handler();
