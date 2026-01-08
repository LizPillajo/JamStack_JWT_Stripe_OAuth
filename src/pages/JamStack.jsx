import { useEffect, useState } from 'react';

const Jamstack = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Topic 1: JamStack</h2>
      <p>This content is static (HTML) and hydrated with an external API.</p>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
};

export default Jamstack;