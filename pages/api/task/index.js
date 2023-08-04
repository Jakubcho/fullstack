import Task from "@/models/task";
import dbConnect from "@/utils/dbConnect";
import { getToken } from "next-auth/jwt";

export default async (req,res) => {
    let {method} = req;

    const token = await getToken({ req });
    await dbConnect();

    if(method==="POST"){
        try {
            const newTask = await new Task({
                task: req.body.data.task,
                user: req.body.data.userId,
            }).save();
            res.status(200).json({data:newTask, message:"Todo added success"});
        } catch(error){
            res.status(500).json({message:"Internal Server Error"});
            console.log(error);
        }
    }
    if(method==="GET"){
      try {
        const tasks = await Task.find({ user: token.user._id });
        res.status(200).json({ data: tasks });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
      }
    }
}