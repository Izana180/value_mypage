"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

const withAuth = (Component) => {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/login'); // 未認証ならログインページへリダイレクト
        }
      });

      return () => unsubscribe(); // クリーンアップ
    }, [router]);

    return <Component {...props} />;
  };
};

export default withAuth;
