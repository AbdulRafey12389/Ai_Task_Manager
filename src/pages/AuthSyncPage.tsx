// NODE MODULES...
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

function AuthSyncPage() {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    // REDIRECT TO HOME PAGE WHEN USER IS NOT SIGNED IN...
    if (!isSignedIn) {
      // HANDLE THE CASE CAUSE THE USER IS SIGNED OUT...
      if (localStorage.getItem('clerkUserId')) {
        localStorage.removeItem('clerkUserId');
      }

      navigate('/');
      return;
    }

    // SET THE USERID IN LOCALSTORAGE AND REDIRECT TO THE TODAY PAGE WHEN USER IS SIGNED IN...
    if (isSignedIn) {
      localStorage.setItem('clerkUserId', userId);

      navigate('/app/today');
    }
  }, [userId, isLoaded, isSignedIn, navigate]);

  return <div></div>;
}

export default AuthSyncPage;
