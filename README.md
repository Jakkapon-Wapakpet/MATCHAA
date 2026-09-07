# 🍵 MatchA — Modern Japanese Artisan Streetwear & E-Commerce

> **Full-Stack Minimalist Fashion Platform**  
> React 18 · Vite 5 · Express · MongoDB Atlas · Mongoose · Tailwind CSS v4 · Lenis Smooth Scroll

---

## 🌟 Overview & Highlights

**MatchA** is a premium Japanese streetwear and artisan textile e-commerce web application. Built with high-precision aesthetics and modern full-stack architecture, it combines cutting-edge interactive shopping experiences with robust cloud database pipelines.

### Key Features:
1. **Editorial Magazine Lookbook (Issue No. 04):**
   - Luxury editorial magazine spread layout with **interactive 3D card tilt** and specular glare reflection.
   - **Synchronized Multi-Ring Radar Hotspots:** Click or hover garment pins on lifestyle model photography to instantly highlight the corresponding authentic flatlay garment and trigger 1-click Quick Add to Bag.
   - **Spring Seasonal Filter Pills:** Switch between All Issues, Spring Bloom, Summer Resort, Autumn Earth, and Winter Minimal with staggered entrance animations.
   - **Cinematic Inspection Lightbox:** Fullscreen zoom-lens inspection with keyboard navigation (`←`, `→`, `Esc`).
2. **Mix & Match Studio:**
   - Interactive 4-piece outfit coordinator (Tops, Bottoms, Footwear, Accessories).
   - Real-time mathematical harmony scoring algorithm evaluating tone, contrast, and silhouette balance.
3. **Personal Color Lab:**
   - 4-Season color theory diagnostics (Spring Warm, Summer Cool, Autumn Warm, Winter Cool).
   - Curates custom garment palettes tailored to the customer's natural undertones.
4. **End-to-End E-Commerce Engine:**
   - Unified persistent cart synchronized via `CartContext` and REST API.
   - Multi-step checkout with coupon engine (`MATCHA15`, `WELCOME10`, etc.), shipping method selector, and live order placement into **MongoDB Atlas**.
5. **Admin Management Suite:**
   - Live inventory management, stock adjustments, product creation with strict field validation, and real-time order tracking.

---

## 🏗️ Architecture & Directory Structure

```text
MatchA/
├── app/                              # Primary Application Repository
│   ├── backend/                      # Express REST API & Database Layer
│   │   ├── config/                   # Database connection configuration
│   │   ├── data/                     # Seed catalog database
│   │   ├── models/                   # Mongoose schemas (Product, Cart, Order, User)
│   │   ├── seed.js                   # MongoDB Atlas seeder
│   │   └── server.js                 # Express server & REST CRUD endpoints
│   ├── frontend/                     # React Single Page Application (SPA)
│   │   ├── public/
│   │   │   └── images/
│   │   │       ├── location_lifestyle/ # Curated editorial campaign photography
│   │   │       ├── lookbook_flatlay/   # Authentic flatlay garment PNGs
│   │   │       ├── products/           # Catalog apparel photos (600+ items)
│   │   │       └── studio_white_bg/    # Studio fit reference photography
│   │   └── src/
│   │       ├── components/           # Modular UI components (home, layout, catalog, payment, etc.)
│   │       ├── context/              # Global state (CartContext, AuthContext, ToastContext)
│   │       ├── data/                 # Curated editorial spreads & client fallback catalog
│   │       ├── pages/                # Route containers (Home, Lookbook, MixMatch, Catalog, etc.)
│   │       ├── services/             # API client services
│   │       └── utils/                # Personal color theory & image fallback handlers
│   ├── package.json                  # Workspace runner (Concurrently dev server)
│   └── test_full_system.js           # 25-point automated E2E system verification suite
├── docs/                             # Technical specs, architecture docs, color theory guide
└── Requirement/                      # Sprint backlogs, wireframes, ERDs, and design artifacts
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18+ or v20+ recommended
- **MongoDB**: Active MongoDB Atlas cluster or local MongoDB instance (configured in `backend/.env`)

### 2. Installation
Install root, backend, and frontend dependencies:
```bash
npm run install:all
```

### 3. Environment Setup
Verify `backend/.env` contains your database connection string:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.hak50ja.mongodb.net/MatchA?retryWrites=true&w=majority
```

### 4. Run Development Server
Start both Express backend (`:5000`) and Vite frontend (`:5173`) concurrently:
```bash
npm run dev
```

- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Editorial Lookbook:** [http://localhost:5173/lookbook](http://localhost:5173/lookbook)
- **Mix & Match Studio:** [http://localhost:5173/mix-match](http://localhost:5173/mix-match)

---

## 🧪 Testing & Verification

Run the automated full-stack E2E audit suite:
```bash
npm test
```
**Verification Scope:**
- Backend health check & categories API
- Product catalog query filters & pagination
- Strict product validation guardrails (Task 10.3)
- Full Product CRUD & Admin stock updates (Sprint 2 Tasks 6.5–6.8)
- Cart CRUD operations (Add, Quantity update, Delete)
- Order placement & receipt retrieval on MongoDB Atlas
- Member user registration, profile update, and account lifecycle

---

## 🔒 Security & Git Hygiene

- **Sensitive credentials (`.env`)** are strictly excluded via `.gitignore`.
- **Large binary assets (`images/lookbook_flatlay/*`)** are tracked cleanly via `.gitkeep` without inflating git history.
- Local repository commits follow conventional commit specifications (`feat:`, `fix:`, `chore:`).
