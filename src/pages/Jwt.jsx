import { useState, useEffect } from 'react';

const mockBackendGenerator = (username) => {
  // 1. HEADER: Algorit
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  
  // 2. PAYLOAD: Data
  const payloadData = { 
    sub: "1234567890", 
    name: username, 
    role: "admin", 
    exp: Date.now() + 30000 
  };
  const payload = btoa(JSON.stringify(payloadData));
  
  // 3. SIGNATURE
  const signature = "FIRMA_ENCRIPTADA_SUPER_SECRETA_XYZ";

  const accessToken = `${header}.${payload}.${signature}`;
  const refreshToken = `REFRESH_TOKEN_LARGA_DURACION_${Date.now()}`;

  return { accessToken, refreshToken };
};

const Jwt = () => {  
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [protectedView, setProtectedView] = useState(false);
  const [menssageData, setMenssageData] = useState('');

  useEffect(() => {
    if (accessToken) setProtectedView(true);
  }, [accessToken]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (user === 'admin' && pass === '1234') {
      const tokens = mockBackendGenerator(user);

      localStorage.setItem('access_token', tokens.accessToken);
      localStorage.setItem('refresh_token', tokens.refreshToken);
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      
      alert("Login successful. Redirecting to secure area...");
      setProtectedView(true);
    } else {
      alert("Incorrect credentials (Use: admin / 1234)");
    }
  };

  const consultService = () => {
    try {
      const payloadBase64 = accessToken.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      
      if (Date.now() > payload.exp) {
        setMenssageData("❌ ERROR 401: The Access Token has expired. You need to refresh it.");
      } else {
        setMenssageData(`✅ DATA RECEIVED: Welcome ${payload.name}. You have access to the Dashboard.`);
      }
    } catch (error) {
      setMenssageData("❌ Invalid Token.");
    }
  };

  const handleRefresh = () => {
    if (!refreshToken) {
      alert("There is no refresh token. You must log in again.");
      handleLogout();
      return;
    }

    alert("Sending Refresh Token to the server to request a new Access Token...");

    const nuevosTokens = mockBackendGenerator("admin");
    
    localStorage.setItem('access_token', nuevosTokens.accessToken);
    setAccessToken(nuevosTokens.accessToken);
    setMenssageData("🔄 Token refreshed. Please try accessing the service again.");
  };

  const handleLogout = () => {
    localStorage.clear();
    setAccessToken(null);
    setRefreshToken(null);
    setProtectedView(false);
    setMenssageData('');
    setUser('');
    setPass('');
  };

  if (!protectedView) {
    return (
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Authentication Module (JWT)</h2>
        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <label>User (admin):</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
          <label>Password (1234):</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button type="submit" style={{ width: '100%', background: '#646cff', color: 'white' }}>
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Protected Zone (Dashboard)</h2>
      <div style={{ background: '#333', padding: '15px', borderRadius: '10px', wordBreak: 'break-all', fontSize: '0.8rem', textAlign: 'left', marginBottom: '20px' }}>
        <p><strong style={{color: '#88f'}}>Access Token (Expires in 30s):</strong> {accessToken}</p>
        <p><strong style={{color: '#4f8'}}>Refresh Token (Long life):</strong> {refreshToken}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={consultService}>📡 Consult Services</button>
        <button onClick={handleRefresh} style={{ background: '#e69138' }}>🔄 Refresh Token</button>
        <button onClick={handleLogout} style={{ background: '#cc3333' }}>🚪 Exit</button>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', border: '1px dashed #555' }}>
        <h3>Service Response:</h3>
        <p style={{ fontSize: '1.2rem' }}>{menssageData || "..."}</p>
      </div>
    </div>
  );
};

export default Jwt;