import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- UTILIDAD PARA SIMULAR UN BACKEND (Genera Tokens con estructura real) ---
// En la vida real, esto SOLO pasa en el servidor.
const mockBackendGenerator = (username) => {
  // 1. HEADER: Algoritmo
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  
  // 2. PAYLOAD: Datos (Aquí definimos que expira en 30 segundos para probar el refresh)
  const payloadData = { 
    sub: "1234567890", 
    name: username, 
    role: "admin", 
    exp: Date.now() + 30000 // Expira en 30 segundos (simulado)
  };
  const payload = btoa(JSON.stringify(payloadData));
  
  // 3. SIGNATURE: Falsa (porque no tenemos clave secreta real aquí)
  const signature = "FIRMA_ENCRIPTADA_SUPER_SECRETA_XYZ";

  const accessToken = `${header}.${payload}.${signature}`;
  const refreshToken = `REFRESH_TOKEN_LARGA_DURACION_${Date.now()}`;

  return { accessToken, refreshToken };
};

const Jwt = () => {
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  
  // Estados de autenticación
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [vistaProtegida, setVistaProtegida] = useState(false);
  const [mensajeData, setMensajeData] = useState('');

  // Efecto: Si ya hay token, mostramos la vista protegida automáticamente
  useEffect(() => {
    if (accessToken) setVistaProtegida(true);
  }, [accessToken]);

  // --- PASO 1: LOGIN (Autenticación) ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Simular validación de credenciales
    if (user === 'admin' && pass === '1234') {
      const tokens = mockBackendGenerator(user);
      
      // Guardar tokens
      localStorage.setItem('access_token', tokens.accessToken);
      localStorage.setItem('refresh_token', tokens.refreshToken);
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      
      alert("Login Exitoso. Redirigiendo a zona segura...");
      setVistaProtegida(true); // Esto simula la redirección visual
    } else {
      alert("Credenciales incorrectas (Usa: admin / 1234)");
    }
  };

  // --- PASO 2: CONSUMIR SERVICIO (Autorización) ---
  const consultarServicio = () => {
    // Decodificamos el payload para ver si expiró (Simulación de validación de servidor)
    try {
      const payloadBase64 = accessToken.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      
      if (Date.now() > payload.exp) {
        setMensajeData("❌ ERROR 401: El Access Token ha expirado. Necesitas Refrescarlo.");
      } else {
        setMensajeData(`✅ DATOS RECIBIDOS: Bienvenido ${payload.name}. Tienes acceso al Dashboard.`);
      }
    } catch (error) {
      setMensajeData("❌ Token inválido.");
    }
  };

  // --- PASO 3: REFRESH TOKEN ---
  const handleRefresh = () => {
    if (!refreshToken) {
      alert("No hay refresh token. Debes loguearte de nuevo.");
      handleLogout();
      return;
    }

    // Simulamos ir al endpoint /api/refresh-token
    alert("Enviando Refresh Token al servidor para pedir nuevo Access Token...");
    
    // El servidor verifica el refresh token y nos da un nuevo access token
    const nuevosTokens = mockBackendGenerator("admin");
    
    localStorage.setItem('access_token', nuevosTokens.accessToken);
    setAccessToken(nuevosTokens.accessToken);
    setMensajeData("🔄 Token Refrescado. Intenta consultar el servicio de nuevo.");
  };

  const handleLogout = () => {
    localStorage.clear();
    setAccessToken(null);
    setRefreshToken(null);
    setVistaProtegida(false);
    setMensajeData('');
    setUser('');
    setPass('');
  };

  // --- RENDERIZADO ---
  if (!vistaProtegida) {
    return (
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Módulo de Autenticación (JWT)</h2>
        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <label>Usuario (admin):</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
          <label>Contraseña (1234):</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button type="submit" style={{ width: '100%', background: '#646cff', color: 'white' }}>
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Zona Protegida (Dashboard)</h2>
      <div style={{ background: '#333', padding: '15px', borderRadius: '10px', wordBreak: 'break-all', fontSize: '0.8rem', textAlign: 'left', marginBottom: '20px' }}>
        <p><strong style={{color: '#88f'}}>Access Token (Vence en 30s):</strong> {accessToken}</p>
        <p><strong style={{color: '#4f8'}}>Refresh Token (Larga vida):</strong> {refreshToken}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={consultarServicio}>📡 Consultar Servicio</button>
        <button onClick={handleRefresh} style={{ background: '#e69138' }}>🔄 Refrescar Token</button>
        <button onClick={handleLogout} style={{ background: '#cc3333' }}>🚪 Salir</button>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', border: '1px dashed #555' }}>
        <h3>Respuesta del Servicio:</h3>
        <p style={{ fontSize: '1.2rem' }}>{mensajeData || "..."}</p>
      </div>
    </div>
  );
};

export default Jwt;