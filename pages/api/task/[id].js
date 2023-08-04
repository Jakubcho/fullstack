import Task from "@/models/task";
import dbConnect from "@/utils/dbConnect";

export default async (req,res) => {
    const {method} = req;
    const {id} = req.query;
    await dbConnect();

    if(method==="PUT"){
        try {
            const result = await Task.findByIdAndUpdate(
                id,
                {task:req.body.task},
                {new:true}
            );
            res.status(200).json({data:result, message:"Todo updated Success"}
        )} catch(error){
            res.status(500).json({message:"Internal Server Error"})
            console.log(error);
        }
    }
    if(method==="DELETE"){
        try {
            await Task.findByIdAndDelete(id);
            res.status(200).json({message:"Task deleted Successfully"})
        } catch(error){
            res.status(200).json({message: "Internal Server Error"});
        }
    }
}