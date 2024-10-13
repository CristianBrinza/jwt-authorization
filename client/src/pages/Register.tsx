import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Register = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    try {
      await authContext?.register(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.msg || 'Registration failed');
    }
  };

  return (
      <div>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username')} placeholder="Username" />
          <p>{errors.username?.message}</p>

          <input {...register('email')} placeholder="Email" />
          <p>{errors.email?.message}</p>

          <input
              {...register('password')}
              type="password"
              placeholder="Password"
          />
          <p>{errors.password?.message}</p>

          <select {...register('role')}>
            <option value="">Select Role</option>
            <option value="visitor">Visitor</option>
            <option value="user">User</option>
          </select>
          <p>{errors.role?.message}</p>

          <button type="submit">Register</button>
        </form>
      </div>
  );
};

export default Register;
