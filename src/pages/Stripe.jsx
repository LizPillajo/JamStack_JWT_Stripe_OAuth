import { useState } from 'react';

const Stripe = () => {
  const [status, setStatus] = useState('Loading...');

  const pay = () => {
    setStatus('Processing with Stripe (Tokenizing card)...');
    setTimeout(() => {
      setStatus('Payment Successful! The server received a secure ID, not the card.');
    }, 2000);
  };

  return (
    <div>
      <h2>Topic 4: Payment gateways (Stripe)</h2>
      <div style={{border:'1px solid #ddd', padding:'10px'}}>
        <p>Total: $50.00</p>
        <button onClick={pay}>Pay Now</button>
        <p><strong>Status:</strong> {status}</p>
      </div>
    </div>
  );
};

export default Stripe;