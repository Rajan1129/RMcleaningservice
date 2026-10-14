# R M Home Cleaning — Business Website & Admin Portal

A full MERN stack (MongoDB, Express, React, Node.js) business platform for
**R M Home Cleaning**, Progressive Society, Sector 50, Chandigarh, 160047.

## Business Profile

- **Name**: R M Home Cleaning
- **Category**: House Cleaning Service · Deep Cleaning Service
- **Rating**: 4.9★ (18 Verified Google Reviews)
- **Address**: Progressive Society, Sector 50, Chandigarh, 160047
- **Plus Code**: MPXX+HW Chandigarh
- **Hours**: Open 24 Hours
- **Phone**: 096460 78122 / +91 96460 78122
- **WhatsApp**: https://wa.me/919646078122
- **Website**: https://sparkle-spark-homes.lovable.app/
- **Attributes**: LGBTQ+ friendly, Identifies as women-owned

## What's included

- **Public website** — Home, house cleaning services (with dynamic detail page per
  service), about, why choose us, gallery, verified Google reviews showcase, contact/quote form,
  FAQ accordion, before/after comparison slider, floating WhatsApp button, click-to-call.
- **Admin dashboard** — JWT-protected panel to manage services, gallery
  images, FAQs, customer enquiries (with lifecycle status tracking), and core business info
  (phone, address, map links, Google Reviews link, hours, attributes).
- **REST API** — Express + MongoDB/Mongoose, with validation, rate limiting
  on the public enquiry endpoint, input sanitization, and JWT auth on all
  admin routes.

## Project structure

```
professional-glass-cleaning/
├── client/     React + Vite + Tailwind frontend
├── server/     Express + MongoDB backend API
└── README.md
```

## Getting started

### 1. Prerequisites
- Node.js 18+
- A MongoDB database (local install or a free MongoDB Atlas cluster)

### 2. Backend setup

```bash
cd server
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed      # creates your admin login + starter services/FAQs/business info
npm run dev        # starts the API on http://localhost:5000
```

### 3. Frontend setup

```bash
cd client
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm install
npm run dev         # starts the site on http://localhost:5173
```

### 4. Log in to the admin panel

Visit `http://localhost:5173/admin/login` and sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `server/.env` before seeding.

From there you can:
- Add/edit/delete home cleaning services
- Manage gallery items by category
- Manage FAQs
- View and update customer enquiries (Pending → Contacted → Confirmed → Completed/Cancelled)
- Update business info, Google Maps coordinates, reviews URL, etc.

## Deployment

**API (`server/`) → Render**
- `server/render.yaml` is a ready-to-use Render Blueprint.
- Set `MONGO_URI` and `CLIENT_URL` in the Render dashboard.
- Run `npm run seed` once to create the initial admin account.

**Frontend (`client/`) → Vercel or Netlify**
- `client/vercel.json` and `client/netlify.toml` are included.
- Set `VITE_API_URL` to your deployed API backend URL.

## Tech stack

**Frontend:** React 18, Vite, React Router 6, Tailwind CSS, Axios, lucide-react
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, express-validator, express-rate-limit, helmet
