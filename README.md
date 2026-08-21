# SkillForge

SkillForge is an AI-powered career preparation and learning platform built with a modern microservices architecture. It provides users with intelligent tools to analyze resumes, generate personalized learning roadmaps, and practice mock interviews using cuttingedge Generative AI and agentic workflows.

## 🚀 Features

- **🤖 AI Mock Interviews**: Practice technical and behavioral interviews tailored to your skills. Powered by Langchain, LangGraph, and Groq LLMs.
- **📄 AI Resume Analyzer**: Upload your resume (PDF) and get deep analysis and recommendations. Uses Google Gemini, Qdrant (Vector DB), and Langchain.
- **🗺️ Personalized Roadmaps**: Generate custom, step-by-step learning paths using LangGraph and Tavily web search integration to fetch the latest resources.
- **💳 Subscription & Billing**: Seamless Razorpay integration for premium feature tiers.
- **🔐 Secure Authentication**: Firebase Authentication integrated with a custom auth microservice.
- **💻 Interactive Code Editor**: Embedded Monaco Editor for live coding practice during technical interviews.
- **📊 Interactive Dashboards**: Beautiful progress tracking and metrics visualized using Recharts and TailwindCSS.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Visualizations**: Recharts, React Circular Progressbar
- **Utilities**: Firebase (Auth), Monaco Editor, html2canvas & jsPDF (Exporting resumes/roadmaps)

### Backend (Microservices)
- **Architecture**: Node.js & Express (Managed via npm workspaces)
- **Databases**: MongoDB (Mongoose), Redis (Caching/Rate Limiting)
- **AI & NLP Ecosystem**: Langchain, LangGraph
- **LLM Providers**: Groq API, Google Generative AI
- **Vector Database**: Qdrant
- **Search API**: Tavily
- **Payments**: Razorpay

## 📂 Project Structure

```text
SkillForge/
├── frontend/                 # React + Vite application
│   ├── src/                  # React Components, Redux slices, Pages
│   └── package.json          
│
└── backend/                  # Node.js Microservices Monorepo
    ├── package.json          # Workspace root (single npm install for all services)
    ├── gateway/              # API Gateway (Request routing & load balancing)
    │
    └── services/
        ├── auth-service/     # User Management & Firebase Integration
        ├── billing-service/  # Razorpay Subscriptions & Invoicing
        ├── interview-service/# AI Mock Interview generation & evaluation
        ├── resume-service/   # PDF Parsing & Qdrant/Gemini Resume Analysis
        └── roadmap-service/  # LangGraph Agent for Dynamic Roadmaps
```

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **Databases**: MongoDB and Redis
- **API Keys**: Firebase, Razorpay, Groq, Google GenAI, Tavily, Qdrant

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SkillForge.git
   cd SkillForge
   ```

2. **Backend Setup**
   The backend uses npm workspaces, so you only need to install dependencies once at the backend root!
   ```bash
   cd backend
   npm install
   ```
   *Note: Ensure you copy the `.env.example` file to `.env` inside each service and fill in your API keys.*

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is licensed under the ISC License.

---
*Built with ❤️ to supercharge career growth.*
