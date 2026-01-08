import { Routes, Route, Link } from "react-router-dom";

import Jamstack from "./pages/JamStack";
import Jwt from "./pages/Jwt";
import OAuth from "./pages/OAuth";
import Stripe from "./pages/Stripe";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <nav
        style={{
          marginBottom: "20px",
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <h1 style={{ margin: 0 }}> Web Programming Lab</h1>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <Link to="/">Home</Link> |<Link to="/jamstack">JamStack</Link> |
          <Link to="/jwt">JWT</Link> |<Link to="/oauth">OAuth2</Link> |
          <Link to="/stripe">Stripe</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <h3>Select a topic from the menu to view the demo. </h3>
          }
        />
        <Route path="/jamstack" element={<Jamstack />} />
        <Route path="/jwt" element={<Jwt />} />
        <Route path="/oauth" element={<OAuth />} />
        <Route path="/stripe" element={<Stripe />} />
      </Routes>
    </div>
  );
}

export default App;
