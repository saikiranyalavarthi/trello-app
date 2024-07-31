// components/EditTask.tsx
import { useForm } from 'react-hook-form';
import axios from 'axios';

type FormData = {
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: Date;
};

const EditTask = ({ task }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadline: task.deadline
    }
  });

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:3000/tasks/${task._id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Fetch and update tasks after editing
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
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
