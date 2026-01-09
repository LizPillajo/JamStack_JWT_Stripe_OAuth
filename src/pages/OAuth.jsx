import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCE4gqUrUFT1Q1aJlysV4VOnOhUYpa2x3U",
  authDomain: "web-programming-practice-5c962.firebaseapp.com",
  projectId: "web-programming-practice-5c962",
  storageBucket: "web-programming-practice-5c962.firebasestorage.app",
  messagingSenderId: "1086496782344",
  appId: "1:1086496782344:web:bb34938288adb86cf179bd",
  measurementId: "G-GC4T3WNNM1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const OAuth = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
      alert("Error logging in: " + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  }

  return (
    <div>
      <h2>OAuth 2.0 (Firebase)</h2>
      
      {!user ? (
        <button 
          onClick={handleGoogleLogin}
          style={{background: 'white', color:'#444', display: 'flex', alignItems: 'center', gap: '10px', margin: 'auto', padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer'}}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="G" />
          Sign in with Google
        </button>
      ) : (
        <div style={{marginTop: '20px'}}>
          <img src={user.photoURL} alt="Avatar" style={{borderRadius: '50%', width: '80px'}} />
          <h3>Welcome, {user.displayName}</h3>
          <p>Email verified: {user.email}</p>
          <p style={{fontSize: '12px', color: '#888'}}>UID: {user.uid}</p>
          <button onClick={handleLogout} style={{background: '#d32f2f', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', marginTop: '10px', cursor: 'pointer'}}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default OAuth;