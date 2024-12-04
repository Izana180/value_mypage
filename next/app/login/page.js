import Head from 'next/head';

export default function LoginPage() {
  return (
    <div className="login-container">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VALUE就活 マイページ</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>login with</h1>
      <a href="https://valueshukatsu.com/" className="logo-link">
        <img src="/logo.png" alt="VALUE就活" className="logo" />
      </a>
      <form className="login-form">
        <input type="text" placeholder="ID" name="id" className="input-field" />
        <input type="password" placeholder="パスワード" name="password" className="input-field" />
        <button type="submit" className="login-button">ログイン</button>
        <a href="/forgot-password" className="forgot-password-link">パスワードを忘れた方はこちら</a>
      </form>
    </div>
  );
}