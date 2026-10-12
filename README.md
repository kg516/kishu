# 🎓 Smart Education System — Full-Stack Intelligent Learning Platform

> **Live 24/7 Cloud Application:** [https://smart-education-system-rust.vercel.app](https://smart-education-system-rust.vercel.app)  
> **Problem Statement:** *Student Innovation – Smart Education: A concept that describes learning in the digital age. It enables learners to learn more effectively, efficiently, flexibly and comfortably.*

---

## 🌟 Overview

The **Smart Education System** is a modern, responsive, production-quality web application designed for the digital learning era. It connects **Students**, **Parents**, and **Administrators** into a unified, transparent learning ecosystem featuring real-time code compilation, AI-powered pedagogical tutoring, anti-cheating webcam proctored exams, and cryptographic-style verifiable certificates.

---

## 🚀 Key Features

### 1. 🎓 Tri-Portal Architecture
* **Student Portal (`/student`):** Course catalog, interactive lesson modules, assignments, 60-day GitHub-style streak heatmap, level progression, and badges.
* **Parent Portal (`/parent`):** Real-time learning activity log, subject-wise academic radar analytics, progress monitoring, and direct faculty notifications.
* **Admin Portal (`/admin`):** Institutional analytics, cohort enrollment metrics, student management, and curriculum control.

### 2. 💻 Multi-Language Code Playground (`/student/practice`)
* In-browser sandboxed execution for **Python, C, C++, Java, JavaScript, and HTML/CSS**.
* Real-time standard output, error capture, and execution timing metrics.
* **10-Point EduAI Explainer:** Instant breakdown covering Core Concepts, Line-by-Line Logic, Big-O Complexity $O(n)$, Memory Architecture, Edge Cases, and Bug Fixes.

### 3. 🛡️ AI Webcam-Proctored Examination Mode (`/student/quizzes`)
* **Hardware MediaStream HUD:** Live webcam feed with facial tracking indicators and gaze-deviation monitoring.
* **Anti-Copy & Anti-Paste Lockout:** Blocks clipboard shortcuts (`Ctrl+C`, `Cmd+C`, `Ctrl+V`) and context menus.
* **3-Strike Tab Detection:** Real-time visibility listener (`visibilitychange`) flagging window blurs. Strike 3 automatically terminates the exam attempt.

### 4. 📜 Strict Per-Language Double-Gate Certification (`/student/certificates`)
* Distinct, verifiable certificates for every track (Python, C, C++, Java, JavaScript, Web Dev, DSA, AI/ML, SQL).
* **Double-Gate Gatekeeper:** Certificates remain strictly locked until:
  1. **100% of curriculum modules** are completed.
  2. The **AI-Proctored Exam** is passed with a score of $\ge 75\%$.
* Generates verifiable serial numbers with distinction honors and PDF print support.

### 5. 🧠 Cognitive Load Balance
* Enforces an active **4-course enrollment limit** to prevent student burnout and promote completion discipline.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript 5 |
| **Styling & UI** | Tailwind CSS 3.4, PostCSS, Lucide Icons, Glassmorphic Cyber Theme |
| **State & Store** | Unified React Dispatch Store, Hydrated Browser LocalStorage Engine |
| **AI & Vision** | Google Gemini LLM Architecture (EduAI), MediaStream Biometric Proctor HUD |
| **Cloud Hosting** | Vercel Global Edge CDN (24/7 Availability, HTTPS/SSL) |

---

## 💻 Local Development Setup

### Prerequisites
* **Node.js:** v18.17+ or v20+
* **npm:** v9+

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/kg516/kishu.git
cd kishu

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Live Cloud Deployment

* **Production URL:** [https://smart-education-system-rust.vercel.app](https://smart-education-system-rust.vercel.app)
* **GitHub Repository:** [https://github.com/kg516/kishu](https://github.com/kg516/kishu)
