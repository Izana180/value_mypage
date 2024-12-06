// "use client";

// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useRouter } from "next/navigation";

// export default function Page() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         // ログイン成功
//         setUser(currentUser);
//       } else {
//         // 未ログインの場合、ログインページへリダイレクト
//         router.push("/login");
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   if (user) {
//     return (
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "center" }}>
//         <h1 style={{ fontSize: "4rem", textAlign: "center" }}>成功！</h1>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
//       <p>認証中…</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState(undefined); // undefined: 判定中、null: 未ログイン確定、object: ログイン済み
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // ログイン済みユーザー
        setUser(currentUser);
      } else {
        // 未ログインユーザーはログインページへリダイレクト
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // user === undefinedの間は認証状態判定中
  if (user === undefined) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p>認証中…</p>
      </div>
    );
  }

  // userが定義されている時点でログイン成功とみなす
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1 style={{ fontSize: "4rem", textAlign: "center" }}>成功！</h1>
    </div>
  );
}


