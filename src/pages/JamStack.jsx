import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvclnjmqbyugxrpqctzc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Y2xuam1xYnl1Z3hycHFjdHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5ODU2OTQsImV4cCI6MjA4MzU2MTY5NH0.HmH7S5m2Cj1U8Kmq0WevbxHYgSyxwy98uIrHHzcHMXw'
const supabase = createClient(supabaseUrl, supabaseKey)

const Jamstack = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      let { data, error } = await supabase.from('services').select('*');
      
      if (error) console.log('Error:', error);
      else setServices(data);
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h2>JamStack + BaaS (Supabase)</h2>
      <p>This data comes directly from a PostgreSQL database in the cloud.</p>
      
      {loading ? <p>Loading real data...</p> : (
        <div style={{display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
          {services.map(item => (
            <div key={item.id} style={{background: '#333', padding: '15px', borderRadius: '8px', textAlign: 'left'}}>
              <h3 style={{margin: '0 0 10px 0', color: '#646cff'}}>{item.title}</h3>
              <p style={{fontSize: '0.9em'}}>{item.description}</p>
              <span style={{fontWeight: 'bold', color: '#4f8'}}>${item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jamstack;