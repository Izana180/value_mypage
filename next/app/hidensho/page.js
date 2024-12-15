"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/navigation";
import withAuth from "../hoc/withAuth";

const loading_time_max=5000;

const HidenshoPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    const confirm = window.confirm("ログアウトしますか？");
    if (!confirm) return;
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, loading_time_max);
    return () => clearTimeout(timeout);
  }, []);

  const handleIframeLoad = () => {
    console.log("iframe successfully loaded");
    setIsLoading(false);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* ログアウトボタン */}
      <button
        onClick={handleLogout}
        className="logout-button"
      >
        ログアウト
      </button>

      {/* ローディング表示 */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #ccc",
              borderTop: "4px solid #333",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 10px",
            }}
          />
          <p>loading...</p>
        </div>
      )}

      {/* Alist iframe */}
      <iframe
        src={process.env.NEXT_PUBLIC_ALIST_URL}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Hidensho Alist"
        onLoad={handleIframeLoad}
        onError={() => {
          console.error("iframe failed to load");
          setIsLoading(false);
        }}
      />

      {/* スピナー */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .logout-button {
          position: fixed;
          top: 10px;
          right: 20px;
          background-color: #f5f5f5;
          padding: 8px 16px;
          border-radius: 4px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
          border: 1px solid #ccc;
        }

        @media (max-width: 768px) {
          .logout-button {
            top: auto;
            bottom: 10px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default withAuth(HidenshoPage);


