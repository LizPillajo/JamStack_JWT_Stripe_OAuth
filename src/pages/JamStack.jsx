import { useEffect, useState } from "react";

const Jamstack = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Topic 1: JamStack, Headless CMS & BaaS</h2>
      <div
        style={{
          textAlign: "left",
          background: "#333",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <p>
          In this architecture, the frontend (Vite/React) is separated from the content. The data could come from:
        </p>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>Headless CMS:</strong> Strapi, Contentful (Pure content management).
          </li>
          <li>
            <strong>BaaS (Backend as a Service):</strong> Firebase, Supabase
            (Database + Auth).
          </li>
        </ul>
        <hr style={{ borderColor: "#555" }} />
        <p>
          <strong>Demonstration:</strong> Next, we consume an external API simulating Strapi's response:
        </p>
      </div>

      <ul style={{ marginTop: "20px" }}>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jamstack;
