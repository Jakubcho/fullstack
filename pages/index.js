import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const url = `${process.env.API_URL}/api/task`;

export default function Home() {
  const [task, setTask] = useState('');
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(session?.user._id){
      axios
       .get(url)
       .then((response) => {
        setTasks(response.data.data);
       })
       .catch((error) => {
        console.error('Error when fetching tasks', error);
       })
    }
  }, [session]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      task: task,
      userId: session?.user?._id,
    };
    try {
      const response = await axios.post(url, { data: newTask });
      setTasks([...tasks, response.data.data]);
    } catch(error){
      console.error("Error when add task", error);
      setTask('');
    }
  }
  const handleDelete = async (id) => {
    console.log('click', id)
    try {     
      const response = await axios.delete(url + '/' + id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch(error){
      console.error('Error when delete task')
    }
  }
  const handleUpdate = async (id) => {
    const {data} = await axios.put(url + '/' + id, {
      task
    });
    console.log(data)
    const orginalTasks = [...tasks];
    const index = orginalTasks.findIndex((t) => t._id === id);
    orginalTasks[index]=data.data;
    setTasks(orginalTasks);
    setTask('');
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Auth</title>
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Hello <br/>{session?.user?.email || ""}</h1>
          {session?.user?.email ?  <></> :
            <Link href="/login"><button onClick={() => signIn()}>
              Sign In</button>
            </Link> }
          {session?.user?.email ? <button onClick={() => signOut()}>Sign Out</button> : <></> }
        </div>
        {session?.user?.email ? 
        <div>
          <form onSubmit={e =>handleSubmit(e)} className={styles.form}>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}/><br/>
              <button type="submit">Add task</button>
          </form>
          <h1>Task list:</h1>
          <ul className={styles.list}>
            {tasks?.map((t) => (
              <li  key={t._id}>
                <strong>{t.task}</strong><br/>
                <button onClick={() => handleDelete(t._id)}>Delete</button>
                <button onClick={() => handleUpdate(t._id)}>Update</button>
              </li>
            ))}
          </ul> 

        </div>: <></>}
      </main>
    </div>
  )
}
