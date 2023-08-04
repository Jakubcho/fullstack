import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
import handler from '@/utils/handler';
import { createRouter } from 'next-connect';
const router = createRouter();
router
  .post(createUser)

async function createUser(req, res) {
  try {
    const data = req.body;

    const { email, password } = data;

    dbConnect();

    const user = await User.create(req.body)

    res.status(201).json({ message: 'Created user!' });
  } catch(error){
    console.error("New error: ", error);
  }
}

export default router.handler();