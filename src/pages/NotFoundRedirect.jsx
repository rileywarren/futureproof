import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', {
      replace: true,
      state: {
        toast: {
          tone: 'warning',
          title: 'Route Not Found',
          message: 'The requested page does not exist. Redirected to Dashboard.',
        },
      },
    });
  }, [navigate]);

  return null;
}
