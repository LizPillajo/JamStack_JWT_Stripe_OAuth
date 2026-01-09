import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { createClient } from '@supabase/supabase-js';

const stripePromise = loadStripe('pk_test_51SnluY3hZrEwECaZMWcnDpHMns3R2kDnDsDfBoLGAHh919zKDpG9Ryo2qWyr49PS542DQJfll0dIM4l1sUoNGkuQ005H0lh6f0');

const supabaseUrl = 'https://lvclnjmqbyugxrpqctzc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Y2xuam1xYnl1Z3hycHFjdHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5ODU2OTQsImV4cCI6MjA4MzU2MTY5NH0.HmH7S5m2Cj1U8Kmq0WevbxHYgSyxwy98uIrHHzcHMXw';
const supabase = createClient(supabaseUrl, supabaseKey);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      let { data, error } = await supabase.from('wallet').select('balance').eq('id', 2).single();
      if (data) setBalance(data.balance);
      if (error) console.error("Error fetching balance:", error.message);
    };
    fetchBalance();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setMessage(`❌ Card Error: ${error.message}`);
      setLoading(false);
    } else {
      const productPrice = 15.00;
      const newBalance = balance - productPrice;

      const { error: errorUpdate } = await supabase
        .from('wallet')
        .update({ balance: newBalance })
        .eq('id', 2);

      if (errorUpdate) {
        setMessage('✅ Payment approved, but failed to update wallet balance.');
      } else {
        setBalance(newBalance); // Update UI
        setMessage(`✅ Payment Successful! Token: ${paymentMethod.id}. Balance updated.`);
      }
      setLoading(false);
    }
  };

  const inputContainerStyle = {
    border: '1px solid #ccc', borderRadius: '5px', padding: '12px', backgroundColor: 'white', marginBottom: '15px'
  };
  const stripeElementOptions = {
    style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: 'auto', background: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'left'}}>
      
      <div style={{textAlign: 'right', marginBottom: '20px'}}>
        <span style={{background: '#222', color: '#4f8', padding: '5px 10px', borderRadius: '15px', fontSize: '14px'}}>
          Available Balance: <strong>${balance.toFixed(2)}</strong>
        </span>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#eef2f6', padding: '10px', borderRadius: '5px'}}>
        <h3 style={{margin: 0, color: '#333'}}>Credit Card</h3>
        <div style={{display: 'flex', gap: '5px'}}>
           <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" width="35" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width="35" />
        </div>
      </div>

      <p style={{marginBottom: '20px', color: '#666', fontSize: '0.9em'}}>
        Total amount: <strong>$15.00</strong>
      </p>

      <label style={{fontWeight: 'bold', color: '#444', display: 'block', marginBottom: '5px'}}>Card Number *</label>
      <div style={inputContainerStyle}><CardNumberElement options={{...stripeElementOptions, showIcon: true}} /></div>

      <div style={{display: 'flex', gap: '20px'}}>
        <div style={{flex: 1}}>
          <label style={{fontWeight: 'bold', color: '#444', display: 'block', marginBottom: '5px'}}>Expiration Date *</label>
          <div style={inputContainerStyle}><CardExpiryElement options={stripeElementOptions} /></div>
        </div>
        <div style={{flex: 1}}>
          <label style={{fontWeight: 'bold', color: '#444', display: 'block', marginBottom: '5px'}}>CVC *</label>
          <div style={inputContainerStyle}><CardCvcElement options={stripeElementOptions} /></div>
        </div>
      </div>

      <button type="submit" disabled={!stripe || loading} style={{
        width: '100%', 
        background: loading ? '#ccc' : '#5469d4', 
        color: 'white', 
        padding: '15px', 
        borderRadius: '5px', 
        border: 'none', 
        fontSize: '16px', 
        fontWeight: 'bold', 
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s'
      }}>
        {loading ? 'Processing...' : 'Pay $15.00'}
      </button>

      {message && <div style={{marginTop: '20px', padding: '10px', borderRadius: '5px', background: message.includes('Error') ? '#ffebee' : '#e8f5e9', color: '#333', textAlign: 'center'}}>
        {message}
      </div>}

      <div style={{marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#999'}}>
        🔒 Secure Payment via Stripe
      </div>
    </form>
  );
};

const StripePage = () => {
  return (
    <div style={{padding: '20px'}}>
      <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Payment Gateway with Wallet Integration</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripePage;