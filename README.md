# Coderanker

![Coderanker Logo](https://coderanker.cloud/screenshot.png)

---

- 🌐 [Official Landing Page](https://coderanker.cloud)
- 🚀 [Community Demo (Free Trial)](https://coderanker.cloud/register)
- 📚 [Documentation (Docs)](https://coderanker.cloud/docs)

---

## Overview

Coderanker is a SaaS platform for weekly and monthly performance evaluation, ranking, and growth support, designed for diverse roles such as engineers, designers, and corporate staff.

- **Boost organizational productivity and quality**
- **Highly transparent evaluation and compensation design**
- **Streamline evaluation tasks with AI and automation**
- **Support individual and team growth with feedback**

## Main Use Cases

- Weekly/monthly evaluation for multiple roles (engineers, designers, back office, etc.)
- Automatic assignment of supervisors/subordinates, 360-degree and client evaluations
- Automatic calculation of rankings, compensation, bonuses, and penalties based on evaluation data
- Public profiles and internal SNS-like features
- Automated aggregation and AI-assisted evaluation via batch processing

## Tech Stack

- **Framework**: [Remix](https://remix.run/) (Full-stack web framework based on React)
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Remix, Drizzle ORM, SQLite (Turso compatible)
- **Authentication**: Custom (password hashing with bcryptjs)
- **CI/CD & Deployment**: Vercel, Vercel Cron
- **AI Integration**: Automated evaluation and guide generation (future expansion)

## Architecture Overview

- **Monorepo structure** (everything under the app/ directory)
- **DB Schema**: Users, evaluations, batch, sessions, etc.
- **API Design**: RESTful (/api/batch/..., /api/debug/... etc.)
- **Batch Processing**: Automated with Vercel Cron
- **Multi-axis sorting/filtering by role/tier/employee number/joining date, etc.**
- **Responsive UI, English/Japanese support**

## Key Features

### Feature List

- **User Management**
  - Supports multiple roles (engineer, designer, corporate, admin, etc.)
  - Attribute management (role, tier, employee number, joining date, etc.)
  - Password hash authentication (bcryptjs)
  - Public profile and internal SNS-like profile

- **Evaluation & Ranking**
  - Weekly/monthly performance input and aggregation
  - Automatic assignment for supervisor, subordinate, 360-degree, and client evaluations
  - Automatic ranking generation based on evaluation data
  - Evaluation comments, feedback entry and viewing
  - Visualization of evaluation history and dashboard

- **Compensation & Incentives**
  - Automatic calculation of compensation, bonuses, and penalties based on evaluation scores
  - Compensation design by tier and role
  - Monthly and annual statistics and report output

- **AI & Automation**
  - Evaluation assist AI (planned for future)
  - Automated aggregation via batch processing (Vercel Cron integration)
  - Automatic guide and documentation generation

- **Organization & Team Management**
  - Ranking and aggregation by organization/team
  - Multi-axis sorting/filtering (role/tier/period/attributes, etc.)
  - Internal SNS-like features and notifications

- **UI/UX & Multilingual Support**
  - Responsive UI (PC/mobile)
  - English/Japanese toggle
  - Accessibility considerations

- **Security & Operations**
  - Session management and authentication
  - Highly transparent data usage and privacy considerations
  - Logging and audit features (future expansion)

- **Development & Operations Support**
  - RESTful API design (/api/batch/..., /api/debug/... etc.)
  - OSS extensibility and contributions welcome
  - CI/CD automation (Vercel integration)

> *Some features are planned for future roadmap/expansion. For details and the latest status, see [GitHub Issues/Projects](https://github.com/your-repo/coderanker).* 

## Business Value

- **Improved transparency and acceptance of evaluations**: Fair rules, automation, and AI utilization
- **Organizational growth and engagement**: Feedback, ranking, and compensation linkage
- **Reduced management costs**: Batch processing, automated aggregation, unified management
- **Support for diverse work styles and roles**: Flexible role design and customizability

---

## License & Usage Notes

This project is licensed under **Apache License 2.0 + Commons Clause** as a "Source-Available" license.

### ✅ Key Points
- **Unlimited internal use and modification allowed**
- **Commercial resale and SaaS provision (including hosting) are strictly prohibited**

### ⚠️ Notes
- This license is a source-available license not approved by OSI
- For companies wishing to offer commercial SaaS, a separate commercial (proprietary) license is available. Please contact us for details.

See [LICENSE](./LICENSE) for more details.

For questions or implementation inquiries, please contact the development team.

---

## Setup Instructions

### 1. Required Tools
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Turso](https://turso.tech/) (SQLite-compatible cloud DB, or local)
- [Vercel](https://vercel.com/) (for production deploy & cron batch)

### 2. Clone the Repository
```sh
git clone https://github.com/your-repo/coderanker.git
cd coderanker
```

### 3. Install Dependencies
```sh
npm install
# or
yarn install
```

### 4. Set Environment Variables
Copy `.env.example` to `.env` and set the required values.

```
cp env.example .env
```
- Fill in TURSO_DATABASE_URL and other Turso connection info
- For Vercel deploy, also refer to Vercel environment variable settings

### 5. Database Setup
- For Turso, see [official docs](https://docs.turso.tech/) to create a DB
- For local SQLite, refer to `app/db/schema.ts` for initialization
- Example migration/seed:
```sh
npm run db:migrate
npm run db:seed
```

### 6. Start Development Server
```sh
npm run dev
```

### 7. Production Build & Start
```sh
npm run build
npm start
```

### 8. Deploy to Vercel
- Use [Vercel CLI](https://vercel.com/docs/cli) with the `vercel` command
- You can also link as a new project from the Vercel dashboard with GitHub
- Vercel Cron can be set up for automatic batch API execution

### 9. Example Manual Batch API Execution
```sh
curl -X GET "http://localhost:5173/api/batch/weekly-evaluation"  -H "authorization: Bearer ${CRON_SECRET}"
curl -X GET "http://localhost:5173/api/batch/weekly-pre-evaluation"  -H "authorization: Bearer ${CRON_SECRET}"
curl -X GET "http://localhost:5173/api/debug/auto-evaluate"  -H "authorization: Bearer ${CRON_SECRET}"
curl -X GET "http://localhost:5173/api/debug/monthly-salary"  -H "authorization: Bearer ${CRON_SECRET}"
```

---

