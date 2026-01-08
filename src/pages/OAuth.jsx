const OAuth = () => {
    const handleGoogle = () => {

      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=TU_CLIENT_ID&redirect_uri=TU_SITIO&response_type=code&scope=email";

      const width = 500;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      const popup = window.open(
        googleAuthUrl, 
        "Google Auth", 
        `width=${width},height=${height},top=${top},left=${left}`
      );
  
      setTimeout(() => {
        if(popup) popup.close();
        alert("✅ Simulation: Google verified your identity and returned a 'Authorization Code'.\n\nNow the backend would exchange this code for a token.");
      }, 2000);
    };
  
    return (
      <div>
        <h2>OAuth 2.0 Flow</h2>
        <p>Click to start the 'Consent Screen' flow with Google.</p>
        <button 
          onClick={handleGoogle}
          style={{background: 'white', color:'#444', display: 'flex', alignItems: 'center', gap: '10px', margin: 'auto'}}
        >          
          Sign in with Google
        </button>
      </div>
    );
  };
  
  export default OAuth;