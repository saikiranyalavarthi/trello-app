// components/CreateTask.tsx
import { useForm } from 'react-hook-form';
import axios from 'axios';

type FormData = {
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: Date;
};

const CreateTask = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/tasks', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Fetch and update tasks after creation
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} placeholder="Title" />
      <textarea {...register('description')} placeholder="Description" />
      <select {...register('status', { required: true })}>
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Under Review">Under Review</option>
        <option value="Completed">Completed</option>
      </select>
      <select {...register('priority')}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="Urgent">Urgent</option>
      </select>
      <input {...register('deadline')} type="date" />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
