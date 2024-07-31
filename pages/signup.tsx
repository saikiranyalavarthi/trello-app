import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
};

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:3001/signup', data);
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Extract detailed error information from Axios error
        const serverError = error.response?.data?.message || 'Failed to signup. Please try again.';
        setError(serverError);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      {error && <p>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </form>
  );
};

export default Signup;


