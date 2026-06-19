# Go Business — Referral Portal

A secure, client-side referral dashboard built with React. Users sign in with email and password, view referral metrics, browse a paginated table of referrals, and inspect individual referral details.

## Live Demo

Preview: [https://go-bussiness.vercel.app](https://go-bussiness.vercel.app)

Test credentials  
- **Email:** `admin@example.com`  
- **Password:** `admin123`

## Tech Stack

- React
- React Router DOM
- JavaScript (ES6+)
- CSS3
- Create React App

## Project Structure

src/
├── components/
│   ├── Footer/
│   ├── Home/
│   ├── Login/
│   ├── MyReferral/
│   ├── NavBar/
│   ├── NotFound/
│   ├── Overview/
│   ├── ProtectedRoute/
│   ├── ReferralDetail/
│   ├── Referrals/
│   └── ServiceSummary/
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js

public/
├── index.html
├── favicon.ico
└── other static assets

package.json
package-lock.json
README.md

## Features

- **Authentication** — Email + password login against a secure API endpoint. JWT token stored in a non-HttpOnly cookie.
- **Protected Routes** — Dashboard and referral detail pages redirect unauthenticated users to `/login`.
- **Referral Overview** — High-level metrics and service summary panels.
- **Share Referral** — Copy referral link and code to clipboard.
- **Searchable, Sortable Table** — Search by name or service; sort by date (newest / oldest). API-driven filtering.
- **Client-Side Pagination** — 10 rows per page with Previous / Next / numbered controls.
- **Referral Detail View** — Deep-linkable page per referral with formatted date and profit.
- **Accessible** — Semantic landmarks, `aria-label`s, `role="alert"` errors, and proper label-input pairing.

## Environment

No local environment variables are required. The app talks to a fixed AWS API:

```
https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+  
- npm (or bun)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The dev server starts at `http://localhost:3000`.

### Build

```bash
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signin` | Authenticate; returns JWT token |
| `GET`  | `/api/referrals?sort=desc` | List all referrals (with metrics & summary) |
| `GET`  | `/api/referrals?search=…` | Filtered list |
| `GET`  | `/api/referrals?id=…` | Single referral detail |

All referral endpoints require `Authorization: Bearer <token>`.

## Routes

| Path | Access | Page |
|------|--------|------|
| `/login` | Public | Login |
| `/` | Protected | Dashboard |
| `/referral/:id` | Protected | Referral Detail |
| `/dashboard/referrals` | Public | Redirects to `/` |
| `*` | Public | 404 Not Found |

## Token Flow

1. User submits credentials on `/login`.
2. On success, `jwt_token` is set via `js-cookie` and the user is redirected to `/`.
3. Authenticated requests include `Authorization: Bearer <jwt_token>`.
4. Logout removes the cookie and returns the user to `/login`.

## Accessibility Highlights

- All form inputs have associated `<label htmlFor>` tags.
- Error banners use `role="alert"`.
- Navigation landmarks are labeled (`aria-label="Primary"`, `aria-label="Footer"`).
- Table rows are keyboard-focusable and respond to `Enter` for navigation.

## License

This is a demo project created for educational purposes.