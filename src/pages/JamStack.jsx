import { useEffect, useState } from 'react';

const Jamstack = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <div>
      <h2>Tema 1: JamStack</h2>
      <p>Este contenido es estático (HTML) y se hidrata con una API externa.</p>
      <ul>
        {usuarios.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
};

export default Jamstack;