import Task from "@/models/task";
import dbConnect from "@/utils/dbConnect";
import { getToken } from "next-auth/jwt";
import {createRouter} from 'next-connect';

const router = createRouter();
router 
 .post(newTask)
 .get(getTasks)

async function newTask(req, res){
  try {
    await dbConnect();
    const newTask = await new Task({
      task:req.body.data.task,
      user:req.body.data.userId,
    }).save();
    res.status(200).json({data:newTask, message:"Todo added success"})
  } catch(error){
    console.error("New error: ", error);
  }
}
async function getTasks(req,res){
  try {
    dbConnect();
    const token = await getToken({ req });
    const tasks = await Task.find({user: token.user._id});
    res.status(200).json({data:tasks});
  } catch(error){
    res.status(500).json({message:"Internal Server Error"});
    console.log(error);
  }
}

export default router.handler();