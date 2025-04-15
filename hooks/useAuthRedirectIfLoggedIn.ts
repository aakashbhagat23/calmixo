import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // adjust the path as needed
import { useRouter } from 'expo-router';

export function useAuthRedirectIfLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/'); // Home screen or dashboard
      }
    });

    return unsubscribe;
  }, []);
}
