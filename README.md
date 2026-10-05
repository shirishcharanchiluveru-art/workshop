# 🥬 FreshMatch AI - Produce Selection & Visual Quality Assistant

FreshMatch AI is a full-stack, enterprise-grade vegetable & produce selection assistant designed for shoppers, home cooks, and meal planners. It uses **Google Gemini 2.5** to evaluate produce sensory characteristics (firmness, skin tautness, scent, weight density), diagnose ripeness from camera photos, track seasonal market value, and optimize culinary ROI.

---

## 🌟 Key Features

1. **5-Step Produce Inspector (`/inspector/new`)**:
   - Guided sensory assessment (firmness rebound dent, skin tautness, blemish count, aroma profile, hydro-density).
   - Tailored varietal suitability matching for specific cooking techniques (Slow Simmering, High-Heat Roasting, Raw Slicing, Stir-Fry).
2. **360° Produce Audit Report (`/inspection/:id`)**:
   - Overall Suitability Score (0-100%) and Quality Tier classification.
   - Varietal recommendation rankings (e.g. San Marzano Roma vs Plum vs Beefsteak).
   - Disqualifying factors and decay warning red flags.
   - Store-to-fridge storage protocol & zero-waste salvage tips.
3. **Visual Camera Ripeness Scanner (`/scanner`)**:
   - Multimodal Gemini Vision camera upload for instant freshness grading (A+ to F), defect analysis, and storage recommendations.
4. **Seasonal Produce Radar (`/seasonal-radar`)**:
   - Annual monthly harvest window matrix, flavor peak indices (0-100), and market price trends (Bargain vs Premium Import).
5. **Cost-per-Yield & Culinary ROI Predictor**:
   - Calculates true usable edible portion cost by subtracting peels, seeds, and stems waste.
6. **FreshBot AI Sommelier Chat**:
   - Interactive produce sommelier pre-loaded with current produce context for in-aisle grocery queries.
7. **Smart Shopping List & Export**:
   - Persistent checklist with instant PDF/print report export.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Recharts, Framer Motion
- **Backend**: Node.js, Express.js REST API
- **AI Engine**: Google GenAI SDK (`@google/genai` & `@google/generative-ai`)
- **Database**: Persistent disk-backed JSON engine pre-seeded with agronomic produce data

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shirishcharanchiluveru-art/workshop.git
cd workshop
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root folder:
```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

### 4. Start development server
```bash
npm run dev
```
The application will be available at:
- Web App: `http://localhost:3000`
- API Health Endpoint: `http://localhost:5000/api/health`

### 5. Build for production
```bash
npm run build
```
