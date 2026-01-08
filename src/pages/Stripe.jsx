import { useState } from 'react';

const Stripe = () => {
  const [status, setStatus] = useState('Esperando...');

  const pagar = () => {
    setStatus('Procesando con Stripe (Tokenizando tarjeta)...');
    setTimeout(() => {
      setStatus('¡Pago Exitoso! El servidor recibió un ID seguro, no la tarjeta.');
    }, 2000);
  };

  return (
    <div>
      <h2>Tema 4: Pasarelas (Stripe)</h2>
      <div style={{border:'1px solid #ddd', padding:'10px'}}>
        <p>Total: $50.00</p>
        <button onClick={pagar}>Pagar Ahora</button>
        <p><strong>Estado:</strong> {status}</p>
      </div>
    </div>
  );
};

export default Stripe;