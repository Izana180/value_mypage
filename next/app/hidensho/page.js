"use client"

import React from 'react';

const HidenshoPage = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* ログアウトボタン（実際にはホームへのリンク） */}
      <a 
        href="/" 
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          backgroundColor: '#f5f5f5',
          padding: '8px 16px',
          borderRadius: '4px',
          textDecoration: 'none',
          color: '#333',
          fontWeight: 'bold',
          border: '1px solid #ccc',
        }}
      >
        ログアウト
      </a>

      {/* Alist iframe */}
      <iframe
        src={process.env.NEXT_PUBLIC_ALIST_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Hidensho Alist"
      />
    </div>
  );
};

export default HidenshoPage;


// "use client"

// import React, { useState, useEffect } from 'react';

// const HidenshoPage = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPath, setCurrentPath] = useState('hidensho'); // 現在のパスを管理

//   const fetchFiles = async (path) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_ALIST_URL}/api/fs/list`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ path: `/${path}` }), // パスの先頭に/を付与
//       });

//       const data = await response.json();
//       console.log('API response data:', data);
//       if (data.code === 200) {
//         setFiles(data.data.content);
//       } else {
//         console.error('Failed to fetch files:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles(currentPath);
//   }, [currentPath]);

//   const handleFolderClick = (folderName) => {
//     // 今のパスにフォルダ名を追加して新しいパスを作成
//     setCurrentPath((prevPath) => `${prevPath}/${folderName}`);
//   };

//   // 親ディレクトリに戻るための関数（必要な場合）
//   const goBack = () => {
//     if (currentPath === 'hidensho') return; // ルートなら戻らない
//     const newPath = currentPath.split('/').slice(0, -1).join('/');
//     setCurrentPath(newPath || 'hidensho');
//   };

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
//       {/* Title in the top-right corner */}
//       <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '24px', fontWeight: 'bold' }}>
//         就活秘伝書
//       </div>

//       {/* Centered folder content */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100%',
//           flexDirection: 'column',
//         }}
//       >
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             {/* 親ディレクトリに戻るリンク（必要に応じて表示） */}
//             {currentPath !== 'hidensho' && (
//               <button onClick={goBack} style={{ marginBottom: '20px' }}>
//                 Back
//               </button>
//             )}
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//               {files.map((file) => (
//                 <li key={file.name} style={{ margin: '10px 0' }}>
//                   {file.type === 'file' ? (
//                     <a
//                       href={`${process.env.NEXT_PUBLIC_ALIST_URL}${file.path}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ textDecoration: 'none', color: '#0070f3' }}
//                     >
//                       {file.name}
//                     </a>
//                   ) : (
//                     <span
//                       onClick={() => handleFolderClick(file.name)}
//                       style={{ textDecoration: 'underline', cursor: 'pointer', color: '#555' }}
//                     >
//                       {file.name} (Folder)
//                     </span>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HidenshoPage;

