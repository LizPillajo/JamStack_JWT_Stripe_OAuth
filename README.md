# Laboratorio de Conceptos Web Modernos
### Programación Web - Universidad Central del Ecuador (UCE)

Este proyecto es una aplicación desarrollada en **Vite + React** que demuestra la implementación práctica y teórica de arquitecturas web modernas.

## 🚀 Tecnologías y Conceptos Abordados

El proyecto implementa una navegación SPA (Single Page Application) para demostrar los siguientes módulos:

1.  **JWT (JSON Web Token):**
    * Simulación de generación de tokens (Header, Payload, Signature).
    * Implementación de flujo de Autenticación y Autorización.
    * Manejo de **Refresh Tokens** y expiración de sesión.

2.  **OAuth 2.0:**
    * Implementación del flujo de "Consent Screen" simulado con Google.
    * Demostración de delegación de autenticación.

3.  **Headless CMS & BaaS (Jamstack):**
    * Conceptos de desacople Frontend/Backend.
    * Consumo de APIs externas (simulando **Strapi** o **Firebase**) usando `fetch`.

4.  **Pasarelas de Pago (Stripe):**
    * Simulación del flujo de tokenización de tarjetas (PCI Compliance).
    * Comunicación asíncrona cliente-pasarela.

## 🛠️ Instalación y Ejecución

1.  Clonar el repositorio:
    git clone https://github.com/LizPillajo/JamStack_JWT_Stripe_OAuth.git

2.  Instalar dependencias:
    npm install

3.  Correr el servidor de desarrollo:
    npm run dev


## 📂 Estructura del Proyecto

El código está organizado modularmente:
* `/src/pages`: Contiene los componentes de cada ejercicio (Jwt.jsx, OAuth.jsx, etc.).
* `/src/App.jsx`: Manejo de rutas y navegación.