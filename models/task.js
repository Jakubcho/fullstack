import mongoose from 'mongoose';

let Task;

try {
  Task = mongoose.model('Task');
} catch {
  const taskSchema = new mongoose.Schema({
    task: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  Task = mongoose.model('Task', taskSchema);
}

export default Task;