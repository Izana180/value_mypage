"use client";

import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('パスワードリセット用のメールを送信しました。メールボックスを確認してください。');
    } catch (_error) {
      setError('メールの送信に失敗しました。メールアドレスを再確認してください。');
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

      <h1>パスワードを忘れた場合</h1>
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
