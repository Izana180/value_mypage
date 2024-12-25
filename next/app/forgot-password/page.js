"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { auth } from '../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import '../styles/styles.css';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [lastRequestTime, setLastRequestTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const nowTime = new Date().getTime();

    if(lastRequestTime && nowTime - lastRequestTime < 1 * 60 * 1000){
      setError('メールは1分以内に再送信できません。しばらくしてからもう一度お試しください。');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('パスワードリセット用のメールを送信しました。メールボックスを確認してください。');
      setLastRequestTime(nowTime);
    } catch (error) {
      console.error(error);
      if(error.code == 'auth/uset-not-found'){
        setError('登録が確認できません。メールアドレスを確認してください。');
      }
      else{
        setError('メールの送信に失敗しました。メールアドレスを再確認してください。');
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>パスワードリセット</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <p>パスワードをリセットするためのリンクを送信するメールアドレスを入力してください。</p>
        <input
          type="email"
          placeholder="登録済みのメールアドレス"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="reset-button">リセット用メールを送信</button>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/login')} className="back-to-login-button">
          ログインページに戻る
        </button>
      </div>
    </div>
  );
}
