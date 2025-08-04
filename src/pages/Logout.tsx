import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { setUser } from '../store/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data
    dispatch(setUser(null));
    
    // Redirect to login after a short delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LogoutIcon className="text-red-500" style={{ fontSize: 60 }} />
      <h1 className="text-2xl font-bold mt-4 mb-2 text-gray-900">Logged Out</h1>
      <p className="text-gray-600 text-lg">You have been successfully logged out.</p>
      <p className="text-gray-500 text-sm mt-2">Redirecting to login page...</p>
    </div>
  );
};

export default Logout; 