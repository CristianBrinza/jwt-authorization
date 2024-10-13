import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e: any) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await authContext?.login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.msg || 'Login failed');
    }
  };

  return (
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={onSubmit}>
          <input
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              required
          />
          <input
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
          />
          <button type="submit">Login</button>
        </form>
      </div>
  );
};

export default Login;
