// pages/login.tsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:3000/login', data);
      localStorage.setItem('token', response.data.token);
      router.push('/board');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
