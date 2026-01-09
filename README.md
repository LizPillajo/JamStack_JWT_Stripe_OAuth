# Modern Web Concepts Lab
### Web Programming - Universidad Central del Ecuador (UCE)

This project is a small Vite + React application created to demonstrate practical and theoretical implementations of modern web architectures.

## 🚀 Technologies & Concepts Covered

The app is a Single Page Application (SPA) showcasing the following modules and concepts:

1. **JWT (JSON Web Token)**
   - Simulation of token creation (Header, Payload, Signature).
   - Authentication and authorization flows.
   - Handling refresh tokens and session expiration.

2. **OAuth 2.0**
   - Simulated consent screen flow (example with Google).
   - Demonstration of delegated authentication.

3. **Headless CMS & BaaS (Jamstack)**
   - Decoupling frontend and backend concepts.
   - Consuming external APIs (simulating Strapi or Firebase) using `fetch`.

4. **Payment Gateways (Stripe)**
   - Simulated card tokenization flow (PCI compliance concepts).
   - Asynchronous client-to-gateway communication.

## 🛠️ Installation & Run

1. Clone the repository:

```bash
git clone https://github.com/LizPillajo/JamStack_JWT_Stripe_OAuth.git
cd JamStack_JWT_Stripe_OAuth
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open the app at the address shown by Vite (usually http://localhost:5173).

## 📂 Project Structure

- `src/pages` : Components for each exercise (`Jwt.jsx`, `OAuth.jsx`, etc.)
- `src/App.jsx` : Routes and navigation
- `src/main.jsx` : App entry
- `index.html` and `public/` : Static files

## 🔧 Available Scripts

- `npm run dev` : Start development server
- `npm run build` : Build production bundle
- `npm run serve` : Serve production build locally (if configured)

## 📝 Notes / Improvements

- This repository simulates flows and does not perform real authentication with third-party providers unless you integrate real credentials and backend services.
- Replace simulated APIs with real services (Strapi, Firebase, or your own backend) to test fully.
