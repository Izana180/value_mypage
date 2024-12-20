'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { auth } from '../utils/firebase';
// eslint-disable-next-line no-unused-vars
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../styles/styles.css';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/hidensho');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // rememberDeviceがtrueならローカル永続化、falseならセッション中のみ有効
      const persistence = rememberDevice ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);

      // ログイン
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // eslint-disable-next-line no-unused-vars
      const user = userCredential.user;
      router.push('/hidensho');
    } catch (_error) {
      setError('idかパスワードが間違っています。');
    }
  };

  return (
    <div className="login-container">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VALUE就活 マイページ</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <h1>login with</h1>
      <a href="https://valueshukatsu.com/" className="logo-link">
        <Image src="/logo.png" alt="VALUE就活" className="logo" width={200} height={100} />
      </a>
      <form method="POST" className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="ID"
          name="id"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          name="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* 自動ログイン */}
        <div style={{ margin: '2px 0' }}>
          <label>
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
            />
            デバイスを記憶する
          </label>
        </div>

        <button type="submit" className="login-button">ログイン</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <a href="/forgot-password" className="forgot-password-link">パスワードを忘れた方はこちら</a>
      </form>
    </div>
  );
}

