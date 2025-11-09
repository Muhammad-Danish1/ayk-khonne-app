import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/splash');
  }, []);

  return <LoadingSpinner />;
}
