# <p align="center">⚡ SkillForge</p>

<p align="center">
  <strong>The Next-Generation AI-Powered Career Preparation & Agentic Learning Ecosystem</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/REACT-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19.2" />
  <img src="https://img.shields.io/badge/VITE-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8.0" />
  <img src="https://img.shields.io/badge/TAILWIND%20CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/REDUX%20TOOLKIT-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/NODE.JS-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 20+" />
  <img src="https://img.shields.io/badge/EXPRESS.JS-5.2-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js 5.2" />
  <img src="https://img.shields.io/badge/ARCHITECTURE-MICROSERVICES-FF6B6B?style=for-the-badge" alt="Microservices Architecture" />
  <img src="https://img.shields.io/badge/MONGODB-MONGOOSE%209-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Mongoose 9" />
  <img src="https://img.shields.io/badge/REDIS-UPSTASH-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis Upstash" />
  <img src="https://img.shields.io/badge/AI%20AGENT-LANGCHAIN%20%26%20LANGGRAPH-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white" alt="LangChain & LangGraph" />
  <img src="https://img.shields.io/badge/LLM-GROQ%20%7C%20LLAMA%203.3-F05A28?style=for-the-badge" alt="Groq LLaMA 3.3" />
  <img src="https://img.shields.io/badge/VISION%20%26%20GENAI-GOOGLE%20GEMINI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/VECTOR%20DB-QDRANT-C82D78?style=for-the-badge" alt="Qdrant Vector DB" />
  <img src="https://img.shields.io/badge/AUTH-FIREBASE%20ADMIN-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Admin" />
  <img src="https://img.shields.io/badge/PAYMENTS-RAZORPAY-0C2340?style=for-the-badge&logo=razorpay&logoColor=white" alt="Razorpay" />
  <img src="https://img.shields.io/badge/CODE%20EDITOR-MONACO-1E1E1E?style=for-the-badge&logo=visualstudiocode&logoColor=007ACC" alt="Monaco Editor" />
</p>

---

## 📖 Table of Contents

- [🌟 Overview](#-overview)
- [🥊 Why SkillForge Outperforms Traditional Platforms](#-why-skillforge-outperforms-traditional-platforms)
- [🏛️ System Architecture](#️-system-architecture)
- [🛠️ Deep-Dive Tech Stack](#️-deep-dive-tech-stack)
- [📂 Detailed Project Structure](#-detailed-project-structure)
- [⚙️ Microservices & API Gateway Breakdown](#️-microservices--api-gateway-breakdown)
- [🔑 Firebase serviceAccountKey.json Setup](#-firebase-serviceaccountkeyjson-setup)
- [🔐 Centralized Environment Setup (.env)](#-centralized-environment-setup-env)
- [🚀 Getting Started & Local Execution](#-getting-started--local-execution)
- [📜 License](#-license)

---

## 🌟 Overview

**SkillForge** is an enterprise-grade, agentic career acceleration platform engineered on a resilient **Microservices Architecture**. Unlike standard interview prep sites that provide static question lists and canned feedback, SkillForge integrates autonomous AI agents, semantic retrieval engines, and real-time developer tooling to simulate genuine hiring scenarios.

From live AI-proctored technical coding interviews in Monaco Editor to high-precision ATS resume vector scoring and dynamic internet-augmented roadmaps, SkillForge delivers an end-to-end ecosystem designed to take candidates from preparation to job offers.

---

## 🥊 Why SkillForge Outperforms Traditional Platforms

| Dimension | Traditional Platforms (LeetCode, HackerRank, TopCV) | Standard AI Wrappers (ChatGPT prompts, basic resume tools) | ⚡ **SkillForge Platform** |
| :--- | :--- | :--- | :--- |
| **Interview Experience** | Static problem prompts with fixed test cases; zero conversational or architectural questioning. | Disconnected chat prompts; loses context, no live code editor, no audio/visual simulation. | **Context-Aware AI Mock Interviews**: Autonomous multi-turn agent with live code execution via Monaco Editor, evaluating logic, syntax, edge cases, and soft skills in real time. |
| **Resume Analysis** | Simple keyword regex matching; misses contextual synonyms and modern ATS ranking algorithms. | Generic text dumps without vector embeddings or actionable benchmark metrics. | **Semantic ATS Vector Scoring**: Utilizes **Qdrant Vector DB** + **Google Gemini 2.0** embeddings to cross-reference resumes against real job descriptions and industry taxonomies. |
| **Learning Roadmaps** | Static, outdated PDFs or static articles written years ago that never update. | Unverified LLM text roadmaps with hallucinated or broken external URLs. | **Dynamic Agentic Roadmaps**: Powered by **LangGraph**, verified real-time web search (**Tavily**), and curated video tutorials (**YouTube Data API v3**). |
| **System Architecture** | Legacy monoliths or opaque black-box APIs with high downtime and scaling limits. | Single-file Express servers or fragile serverless functions with cold-start lags. | **Production Microservices**: Independent scalable microservices behind an API Gateway, backed by **Upstash Redis** distributed caching and isolated MongoDB instances. |
| **Monetization & Access** | Expensive monthly recurring subscriptions ($35 - $150/month) with lock-ins. | Clunky manual credit purchasing with fragile payment verifications. | **Transparent Coin Economics**: Powered by **Razorpay** with automated webhook cryptographic signature validation and instant Redis session coin hydration. |

---

## 🏛️ System Architecture

SkillForge uses a distributed microservices pattern orchestrated via an API Gateway with an in-memory Redis session layer and decoupled databases.

```
                                  ┌─────────────────────────────────┐
                                  │      Client (Browser)           │
                                  │  React 19 • Vite • Tailwind v4  │
                                  │   Monaco Editor • Redux Store   │
                                  └────────────────┬────────────────┘
                                                   │
                                                   │ HTTP / REST & Cookies
                                                   ▼
                                  ┌─────────────────────────────────┐
                                  │       API Gateway (:8000)       │
                                  │  Proxy • Auth Check • Logging   │
                                  └───────┬─────────────────┬───────┘
                                          │                 │
                ┌─────────────────────────┘                 └─────────────────────────┐
                │ Validates `session` in < 2ms                                        │ Proxies `x-user-id`
                ▼                                                                     ▼
    ┌───────────────────────┐                                          ┌───────────────────────────────┐
    │     Upstash Redis     │                                          │    Distributed Microservices  │
    │  - Distributed Auth   │                                          └──────────────┬────────────────┘
    │  - Session Cache      │                                                         │
    │  - Response Caching   │                       ┌───────────────────┬─────────────┴──────┬──────────────────┬─────────────────┐
    └───────────────────────┘                       │                   │                    │                  │                 │
                                                    ▼                   ▼                    ▼                  ▼                 ▼
                                            ┌───────────────┐   ┌───────────────┐    ┌───────────────┐  ┌───────────────┐ ┌───────────────┐
                                            │ Auth Service  │   │Billing Service│    │Interview Svc  │  │Resume Service │ │Roadmap Service│
                                            │    (:8001)    │   │    (:8005)    │    │    (:8002)    │  │    (:8003)    │ │    (:8004)    │
                                            └───────┬───────┘   └───────┬───────┘    └───────┬───────┘  └───────┬───────┘ └───────┬───────┘
                                                    │                   │                    │                  │                 │
                                                    ▼                   ▼                    ▼                  ▼                 ▼
                                            ┌───────────────┐   ┌───────────────┐    ┌───────────────┐  ┌───────────────┐ ┌───────────────┐
                                            │ Firebase Admin│   │ Razorpay SDK  │    │LangChain/Groq │  │ Qdrant Vector │ │LangGraph Agent│
                                            │ MongoDB (User)│   │MongoDB(Billing│    │MongoDB(Interv)│  │ Gemini / Mongo│ │Tavily/YouTube │
                                            └───────────────┘   └───────────────┘    └───────────────┘  └───────────────┘ └───────────────┘
```

### Request Flow
1. **Request Ingestion**: Incoming client requests hit the **API Gateway** on port `8000`.
2. **Session Verification**: The Gateway reads the `session` cookie and queries **Upstash Redis** (`session:<id>`) in sub-milliseconds.
3. **Identity Propagation**: The Gateway injects the verified `x-user-id` into request headers and forwards the payload to the corresponding downstream microservice via `express-http-proxy`.
4. **Isolated Processing**: Each microservice runs in its own process, accesses its dedicated MongoDB database, and handles its specialized AI or payment pipelines independently.

---

## 🛠️ Deep-Dive Tech Stack

### Frontend Application
- **Core Framework**: [React 19.2](https://react.dev/) + [Vite 8.0](https://vitejs.dev/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Interactive Code Editor**: [Monaco Editor (`@monaco-editor/react`)](https://github.com/suren-atoyan/monaco-react) for real-time code authoring in technical interviews
- **Global State Management**: [Redux Toolkit 2.12](https://redux-toolkit.js.org/) + `react-redux`
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Data Visualizations & Metrics**: [Recharts 3.8](https://recharts.org/), `react-circular-progressbar`, `react-countdown-circle-timer`
- **Animations & Micro-interactions**: [Motion (Framer Motion 12)](https://motion.dev/)
- **Document Exporting**: `jspdf`, `html2canvas`, `react-to-print` for downloading generated resumes and roadmaps
- **Client Authentication**: Firebase Web Client SDK

### Backend & Microservices
- **Runtime & Framework**: [Node.js 20+](https://nodejs.org/) (ES Modules) with [Express.js 5.2](https://expressjs.com/)
- **Monorepo Architecture**: Managed via **npm Workspaces** (`services/*`, `gateway`, `shared`)
- **API Gateway**: Reverse proxy using `express-http-proxy`, `cors`, `morgan`, and `cookie-parser`
- **Databases & Caching**:
  - **MongoDB (Mongoose 9)**: 5 isolated database tenants (`User`, `interviewStart`, `Resume`, `Roadmaps`, `billing`)
  - **Upstash Redis (ioredis 5)**: Central distributed session management, rate-limiting, and response caching
- **AI / Agentic Workflow & Vector Search**:
  - **LangChain & LangGraph**: Multi-step stateful interview evaluation and dynamic roadmap construction
  - **Groq SDK (LLaMA 3.3 / OSS Models)**: Ultra-low latency inference for live conversational interviews
  - **Google Generative AI (Gemini 2.0)**: Deep document reasoning and ATS resume parsing
  - **Qdrant Vector Database**: High-dimension vector storage and cosine similarity scoring for resume embeddings
  - **Tavily Search API & YouTube Data API v3**: Autonomous internet resource retrieval for live course roadmaps
- **Authentication**: Firebase Admin SDK (`firebase-admin`) with private service credentials
- **Billing & Payments**: Razorpay Node SDK with HMAC-SHA256 signature verification

---

## 📂 Detailed Project Structure

```text
SkillForge/
├── frontend/                               # React 19 Client SPA
│   ├── public/                             # Public static assets
│   ├── src/
│   │   ├── assets/                         # Icons, illustrations, and images
│   │   ├── components/                     # Reusable UI components (Navbar, PricingCard, etc.)
│   │   ├── pages/                          # Application pages
│   │   │   ├── Home.jsx                    # Landing page
│   │   │   ├── Dashboard.jsx               # Candidate command center
│   │   │   ├── Interview.jsx               # AI Interview session & Monaco editor
│   │   │   ├── Resume.jsx                  # Resume builder & ATS scorer
│   │   │   ├── Roadmap.jsx                 # Personalized roadmap view
│   │   │   ├── Pricing.jsx                 # Coin packages & Razorpay checkout
│   │   │   └── Login.jsx                   # Firebase authentication modal
│   │   ├── store/                          # Redux slices and global store
│   │   ├── utils/                          # Axios instance, helpers, and constants
│   │   ├── App.jsx                         # Application router root
│   │   ├── index.css                       # Tailwind CSS v4 design tokens
│   │   └── main.jsx                        # React root entry point
│   ├── .env.example                        # Frontend environment template
│   ├── package.json                        # Frontend dependencies & scripts
│   └── vite.config.js                      # Vite configuration
│
└── backend/                                # Microservices Monorepo
    ├── package.json                        # Monorepo root (npm workspaces coordinator)
    ├── .env                                # Unified environment configuration for all backend services
    ├── .env.example                        # Template for backend environment variables
    ├── .gitignore                          # Git ignore rules (protects secrets & node_modules)
    │
    ├── gateway/                            # Central API Gateway (Port 8000)
    │   ├── controllers/                    # Gateway user resolution
    │   ├── middlewares/                    # isAuth Redis session validator
    │   ├── utils/                          # Proxy header forwarding (x-user-id)
    │   ├── index.js                        # Express gateway server
    │   └── package.json
    │
    ├── shared/                             # Shared Monorepo Utilities
    │   └── redis/
    │       └── redis.js                    # Resilient Upstash Redis singleton
    │
    └── services/                           # Autonomous Microservices
        ├── auth-service/                   # Service: User Authentication (Port 8001)
        │   ├── configs/                    # MongoDB and Firebase Admin configurations
        │   ├── controllers/                # Login, logout, session, coin wallet management
        │   ├── model/                      # Mongoose User model schema
        │   ├── routes/                     # Auth routing endpoints
        │   ├── serviceAccountKey.json      # Firebase private service credentials (SECRET)
        │   ├── serviceAccountKey.example.json # Example template for Firebase credentials
        │   ├── index.js
        │   └── package.json
        │
        ├── interview-service/              # Service: AI Mock Interviews (Port 8002)
        │   ├── configs/                    # MongoDB and Groq/LangChain LLM setup
        │   ├── controllers/                # Interview generation, turn-by-turn evaluation
        │   ├── models/                     # Interview questions & feedback schemas
        │   ├── routes/                     # Mock interview endpoints
        │   ├── index.js
        │   └── package.json
        │
        ├── resume-service/                 # Service: ATS Resume Scorer (Port 8003)
        │   ├── configs/                    # MongoDB, Gemini GenAI, Qdrant Vector DB
        │   ├── controllers/                # PDF text extraction, chunking, vector scoring
        │   ├── models/                     # Resume schema
        │   ├── routes/                     # Upload & analysis endpoints
        │   ├── index.js
        │   └── package.json
        │
        ├── roadmap-service/                # Service: Agentic Roadmaps (Port 8004)
        │   ├── configs/                    # MongoDB, Groq, LangGraph, YouTube API
        │   ├── controllers/                # Step-by-step roadmap creation & resource fetch
        │   ├── models/                     # Roadmap schema
        │   ├── routes/                     # Roadmap endpoints
        │   ├── index.js
        │   └── package.json
        │
        └── billing-service/                # Service: Razorpay Payments (Port 8005)
            ├── configs/                    # MongoDB and Razorpay client initialization
            ├── controllers/                # Order creation & HMAC signature verification
            ├── models/                     # Payment transaction schema
            ├── routes/                     # Order creation & verification endpoints
            ├── index.js
            └── package.json
```

---

## ⚙️ Microservices & API Gateway Breakdown

| Service | Port | Database / State | Key Responsibilities | Primary Endpoints |
| :--- | :--- | :--- | :--- | :--- |
| **API Gateway** | `8000` | Redis (Read-only) | Single entry point, CORS configuration, cookie extraction, session authorization, request routing with `x-user-id` header injection. | `/api/auth/*`<br>`/api/interview/*`<br>`/api/resume/*`<br>`/api/roadmap/*`<br>`/api/billing/*` |
| **Auth Service** | `8001` | MongoDB (`User`) + Redis | Firebase token verification, user profile management, session creation/destruction, and interview coin balance management. | `POST /api/auth/login`<br>`GET /api/auth/logout`<br>`POST /api/auth/add-coins`<br>`POST /api/auth/use-interview-coins` |
| **Interview Service**| `8002` | MongoDB (`interviewStart`) + Redis | Generates technical and behavioral questions tailored to skills, assesses code solutions, evaluates feedback via Groq LLaMA models, and caches interview histories. | `POST /api/interview/start`<br>`POST /api/interview/submit`<br>`GET /api/interview/all` |
| **Resume Service** | `8003` | MongoDB (`Resume`) + Qdrant | Ingests PDF resumes via Multer, splits text chunks, indexes vectors into Qdrant, and runs deep semantic scoring against job roles via Google Gemini. | `POST /api/resume/upload`<br>`GET /api/resume/score`<br>`GET /api/resume/history` |
| **Roadmap Service** | `8004` | MongoDB (`Roadmaps`) + Redis | LangGraph-driven autonomous agent that builds multi-week skill roadmaps, queries the Tavily API for current docs, and queries YouTube for top-rated video guides. | `POST /api/roadmap/generate`<br>`GET /api/roadmap/:id`<br>`GET /api/roadmap/all` |
| **Billing Service** | `8005` | MongoDB (`billing`) | Interacts with Razorpay SDK to create orders, verifies payment cryptographically via SHA256 HMAC signatures, and logs transaction history. | `POST /api/billing/create`<br>`POST /api/billing/verify` |

---

## 🔑 Firebase serviceAccountKey.json Setup

The **Auth Microservice** (`backend/services/auth-service`) uses the official **Firebase Admin SDK** to verify client authentication tokens and validate user credentials securely. To enable this, you need a Firebase Service Account key file.

### Step-by-Step Instructions:

1. **Open Firebase Console**:
   Navigate to [Firebase Console](https://console.firebase.google.com/) and select your project.
2. **Access Project Settings**:
   Click the gear icon (⚙️) next to *Project Overview* in the left sidebar and select **Project settings**.
3. **Generate Private Key**:
   - Go to the **Service accounts** tab.
   - Ensure **Node.js** is selected.
   - Click the **Generate new private key** button.
   - Confirm by clicking **Generate key** in the confirmation modal. A `.json` file will download to your computer.
4. **Place File in Auth Service**:
   - Rename the downloaded file to:
     ```text
     serviceAccountKey.json
     ```
   - Move this file directly into your auth service directory:
     ```text
     SkillForge/backend/services/auth-service/serviceAccountKey.json
     ```
5. **Verify Structure**:
   Your `serviceAccountKey.json` must follow this structure (see [serviceAccountKey.example.json](file:///c:/Users/raman/Desktop/SkillForge/backend/services/auth-service/serviceAccountKey.example.json)):
   ```json
   {
     "type": "service_account",
     "project_id": "your-firebase-project-id",
     "private_key_id": "your_private_key_id",
     "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_RSA_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
     "client_id": "123456789012345678901",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com"
   }
   ```

> [!IMPORTANT]
> `serviceAccountKey.json` contains sensitive administrative credentials. It is already added to [backend/.gitignore](file:///c:/Users/raman/Desktop/SkillForge/backend/.gitignore). **Never** commit this file to public version control!

---

## 🔐 Centralized Environment Setup (.env)

All backend microservices and the API Gateway read from a **single, centralized `.env` file** located at the root of `backend/`:

📁 **File**: `SkillForge/backend/.env` (Reference: [backend/.env.example](file:///c:/Users/raman/Desktop/SkillForge/backend/.env.example))

```env
# ==========================================
# GATEWAY CONFIGURATION
# ==========================================
PORT=8000
GATEWAY_PORT=8000
AUTH_SERVICE_URL=http://localhost:8001
INTERVIEW_SERVICE_URL=http://localhost:8002
RESUME_SERVICE_URL=http://localhost:8003
ROADMAP_SERVICE_URL=http://localhost:8004
BILLING_SERVICE_URL=http://localhost:8005

# ==========================================
# SHARED / REDIS CONFIGURATION
# ==========================================
REDIS_URL="rediss://default:your_password@your-upstash-redis.upstash.io:6379"

# ==========================================
# AUTH SERVICE
# ==========================================
AUTH_PORT=8001
AUTH_MONGODB_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0/User"

# ==========================================
# INTERVIEW SERVICE
# ==========================================
INTERVIEW_PORT=8002
INTERVIEW_MONGODB_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0/interviewStart"
GROQ_API_KEY="gsk_your_groq_api_key"

# ==========================================
# RESUME SERVICE
# ==========================================
RESUME_PORT=8003
RESUME_MONGODB_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0/Resume"
GEMINI_API_KEY="your_google_gemini_api_key"
QDRANT_URL="https://your-cluster.qdrant.tech"
QDRANT_API_KEY="your_qdrant_api_key"

# ==========================================
# ROADMAP SERVICE
# ==========================================
ROADMAP_PORT=8004
ROADMAP_MONGODB_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0/Roadmaps"
YOUTUBE_API_KEY="your_youtube_data_api_v3_key"
TAVILY_API_KEY="tvly-your_tavily_api_key"

# ==========================================
# BILLING SERVICE
# ==========================================
BILLING_PORT=8005
BILLING_MONGODB_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0/billing"
RAZORPAY_KEY_ID="rzp_test_your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
```

📁 **Frontend File**: `SkillForge/frontend/.env` (Reference: `frontend/.env.example`)
```env
VITE_FIREBASE_APIKEY="your_firebase_web_api_key"
VITE_RAZORPAY_KEY_ID="rzp_test_your_razorpay_key_id"
```

---

## 🚀 Getting Started & Local Execution

### Prerequisites
- **Node.js**: v20.x or later installed
- **npm**: v10.x or later
- **MongoDB Atlas** or Local MongoDB instance
- **Upstash Redis** account or Local Redis server
- **API Keys**: Groq, Google Gemini, Razorpay, Firebase, YouTube API

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/ramanrishit448-RR/SkillForge.git
cd SkillForge
```

---

### Step 2: Configure Backend Environment & Firebase
1. Create the backend `.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Open `backend/.env` and paste your actual credentials (MongoDB URLs, Redis URL, Groq API key, Razorpay keys, etc.).
3. Place your `serviceAccountKey.json` inside:
   ```text
   backend/services/auth-service/serviceAccountKey.json
   ```

---

### Step 3: Install Backend Dependencies & Start All Services
Because SkillForge uses **npm Workspaces**, running install from `backend/` installs dependencies for all microservices, shared libraries, and the gateway simultaneously:

```bash
cd backend
npm install
npm run dev
```
> `npm run dev` concurrently launches:
> - `[gateway]` on `http://localhost:8000`
> - `[auth]` on `http://localhost:8001`
> - `[interview]` on `http://localhost:8002`
> - `[resume]` on `http://localhost:8003`
> - `[roadmap]` on `http://localhost:8004`
> - `[billing]` on `http://localhost:8005`

---

### Step 4: Configure and Launch the Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

<p align="center">
  Built with ❤️ by the <strong>SkillForge Team</strong> to empower developers worldwide.
</p>
