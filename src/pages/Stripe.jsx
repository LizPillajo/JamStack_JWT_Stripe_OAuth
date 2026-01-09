import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';

// Tu clave pública de prueba
const stripePromise = loadStripe('pk_test_51SnluY3hZrEwECaZMWcnDpHMns3R2kDnDsDfBoLGAHh919zKDpG9Ryo2qWyr49PS542DQJfll0dIM4l1sUoNGkuQ005H0lh6f0');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMensaje('');

    if (!stripe || !elements) return;

    // Stripe busca todos los datos en los inputs separados automáticamente
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement), // Basta con pasar uno de los elementos
    });

    setLoading(false);

    if (error) {
      setMensaje(`❌ Error: ${error.message}`);
    } else {
      setMensaje(`✅ ¡Pago Exitoso! Token recibido: ${paymentMethod.id}`);
      console.log(paymentMethod); // Aquí verías el objeto real en consola
    }
  };

  // Estilos compartidos para que los inputs se vean iguales
  const inputContainerStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '12px',
    backgroundColor: 'white',
    marginBottom: '15px'
  };

  const stripeElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a' }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: 'auto', background: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'left'}}>
      
      {/* Cabecera con Logos */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#eef2f6', padding: '10px', borderRadius: '5px'}}>
        <h3 style={{margin: 0, color: '#333'}}>Tarjeta de crédito</h3>
        <div style={{display: 'flex', gap: '5px'}}>
           {/* Imágenes de logos usando links directos seguros */}
           <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" width="35" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width="35" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" width="35" />
        </div>
      </div>

      <p style={{marginBottom: '20px', color: '#666', fontSize: '0.9em'}}>
        Paga con tu tarjeta de crédito a través de Stripe (Modo Prueba).
      </p>

      {/* 1. NÚMERO DE TARJETA */}
      <label style={{fontWeight: 'bold', color: '#444', display: 'block', marginBottom: '5px'}}>Número de tarjeta *</label>
      <div style={inputContainerStyle}>
        <CardNumberElement options={{...stripeElementOptions, showIcon: true}} />
      </div>

      {/* 2. FECHA Y CVC (En la misma fila) */}
      <div style={{display: 'flex', gap: '20px'}}>
        <div style={{flex: 1}}>
          <label style={{fontWeight: 'bold', color: '#444', display: 'block', marginBottom: '5px'}}>Fecha de caducidad *</label>
          <div style={inputContainerStyle}>
             <CardExpiryElement options={stripeElementOptions} />
          </div>
        </div>
        
        <div style={{flex: 1}}>
          <label style={{fontWeight: 'bold', color: '#444', display: 'block', marginBottom: '5px'}}>CVC *</label>
          <div style={inputContainerStyle}>
             <CardCvcElement options={stripeElementOptions} />
          </div>
        </div>
      </div>

      {/* BOTÓN DE PAGAR */}
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
        {loading ? 'Procesando...' : 'Pagar $15.00'}
      </button>

      {/* MENSAJES DE ESTADO */}
      {mensaje && <div style={{marginTop: '20px', padding: '10px', borderRadius: '5px', background: mensaje.includes('Error') ? '#ffebee' : '#e8f5e9', color: '#333', textAlign: 'center'}}>
        {mensaje}
      </div>}
      
      <div style={{marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#999'}}>
        🔒 Pagos seguros encriptados por Stripe
      </div>
    </form>
  );
};

const StripePage = () => {
  return (
    <div style={{padding: '20px'}}>
      <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Pasarela de Pagos</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripePage;