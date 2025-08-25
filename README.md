[![Releases](https://img.shields.io/github/v/release/Thebd1204/apporbit?label=Releases&style=for-the-badge)](https://github.com/Thebd1204/apporbit/releases)

# AppOrbit: Discover, Share, and Review Web Apps & AI Tools

![AppOrbit hero](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop)

A community-driven platform to find, submit, upvote, and review Web Apps, AI tools, games, and mobile apps. AppOrbit combines a Product Hunt style feed, role-based dashboards, moderation tools, and Stripe-powered payments. Use it to explore new software, gather feedback, and run curated launches.

Badges
- Topics: ai-tools • community-platform • firebase • fullstack • mongodb • product-hunt-clone • product-showcase • reactjs • software-reviews • startup-tools • stripe • tech-discovery • web-apps
- License: MIT
- CI: GitHub Actions (config included)

Demo screenshots
- Landing and feed: https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop
- Dashboard and moderation: https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop

Table of contents
- About
- Key features
- Architecture & tech stack
- Data model & auth
- Getting started (dev)
- Production deploy notes
- Stripe integration
- Moderation & dashboards
- API overview
- Contributing
- Releases

About
AppOrbit targets builders, product fans, and curators. It focuses on discovery and signal: submissions, upvotes, and reviews form a ranking pipeline. The platform supports roles: guest, user, moderator, and admin. Moderators handle content and reports. Admins manage roles and Stripe products.

Key features
- Product submissions: title, description, tags, screenshots, demo link, repo link.
- Upvotes & trending: vote counts drive feed ranking and badge awards.
- Reviews & comments: star rating and written reviews with moderation.
- Role-based dashboards: different UI and actions per role (RBAC).
- Moderation tools: content flags, bulk actions, audit logs.
- Stripe integration: paid promotions, subscriptions, and one-off purchases.
- Social & share: social previews and share links.
- Search & filters: tag-based filters, full-text search, sort by trending/new/hot.
- Activity feed and notifications: in-app and email via transactional provider.
- Multi-database: MongoDB primary with Firebase for real-time features and notifications.

Architecture & tech stack
- Frontend: React (Vite), TypeScript, React Query, Tailwind CSS.
- Backend: Node.js, Express, TypeScript, REST + GraphQL endpoints.
- Datastore: MongoDB (primary), Firebase (realtime, storage rules).
- Auth: JWT for API, Firebase Auth for realtime UI, OAuth providers (Google, GitHub).
- Payments: Stripe (Checkout, Webhooks, Products/Prices).
- Hosting: Vercel / Netlify for frontend, Docker + Kubernetes for backend (optional).
- CI/CD: GitHub Actions for test, lint, and release build pipelines.

Data model (high level)
- Users
  - id, name, email, role, avatarUrl, stripeCustomerId, createdAt
- Products
  - id, title, slug, description, tags[], screenshots[], demoUrl, repoUrl, submitterId, status (pending/approved/archived), createdAt
- Votes
  - id, userId, productId, value, createdAt
- Reviews
  - id, productId, userId, rating, body, moderated, createdAt
- Reports
  - id, targetType, targetId, reporterId, reason, status, handledBy, handledAt
- Transactions
  - id, userId, stripeSessionId, amount, productId, status, createdAt

Auth & security
- Use JWT signed with strong secret for API access.
- Use RBAC middleware to gate moderator/admin routes.
- Firebase Security Rules protect realtime writes and storage.
- Enforce rate limits on public endpoints.
- Validate file uploads with type and size checks.

Getting started (development)
1. Clone the repo.
2. Create .env files for both server and client. Required env vars:
   - MONGODB_URI
   - JWT_SECRET
   - FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL
   - STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
   - NEXT_PUBLIC_API_URL (frontend)
3. Install dependencies
   - Backend: npm ci && npm run build
   - Frontend: npm ci && npm run dev
4. Start dev servers
   - Start MongoDB (local or Docker)
   - Run backend: npm run dev
   - Run frontend: npm run dev
5. Seed sample data with provided scripts in /scripts/seed. The script creates sample users, products, and votes.

Environment tips
- Use a test Stripe account. Use stripe CLI to forward webhooks during dev.
- Firebase service key must be kept secret. Add to server env.
- Set NODE_ENV=development for dev run.

Production deploy notes
- Use a managed MongoDB cluster for scale.
- Enable TLS and secure headers on API gateway.
- Generate a strong JWT secret and rotate keys periodically.
- Use Stripe webhooks and verify events with stripe-signature header.
- Deploy frontend to a CDN for fast global delivery.
- Run database backups and enable monitoring.

Stripe integration
- Products can be promoted via Stripe Checkout sessions.
- Stripe Webhooks update local Transactions and product promotion periods.
- Flow:
  1. User selects promotion option.
  2. Server creates Stripe Checkout Session and returns URL.
  3. Client redirects to Stripe Checkout.
  4. Webhook confirms payment and server marks product as promoted.
- Store stripeCustomerId on user model.
- Use ephemeral keys for client-side payment actions when needed.

Moderation & role dashboards
- Roles:
  - Guest: browse, read.
  - User: submit, vote, review, comment.
  - Moderator: manage reports, edit and remove content.
  - Admin: manage roles, billing, global settings.
- Moderation features:
  - Flag content with reasons.
  - Bulk approve/deny submissions.
  - Audit log with timestamp and actor.
  - Soft-delete and restore support.
- Dashboards expose metrics: votes per day, new submissions, flagged content.

API overview (selected endpoints)
- POST /api/auth/login — returns JWT
- POST /api/auth/oauth — OAuth token exchange
- GET /api/products — list, filter, sort
- POST /api/products — create product (auth)
- GET /api/products/:id — product detail
- POST /api/products/:id/vote — cast vote (auth)
- POST /api/products/:id/reviews — submit review (auth)
- POST /api/reports — create a report
- GET /api/admin/reports — list reports (moderator)
- POST /api/stripe/create-session — create checkout session
- POST /api/stripe/webhook — webhook handler (verify signature)

Webhooks
- Verify all incoming webhooks with signature.
- Handle these event types at minimum:
  - checkout.session.completed
  - invoice.payment_succeeded
  - payment_intent.succeeded
- Use idempotency keys for webhook processing to prevent duplicate actions.

Realtime & notifications
- Use Firebase for in-app realtime updates:
  - New submissions stream.
  - Live vote counters.
  - Review activity and moderation events.
- Use a message queue (Redis Pub/Sub or RabbitMQ) for background jobs:
  - Send email digests.
  - Recalculate trending scores.
  - Generate thumbnails for screenshots.

Search & ranking
- Use MongoDB text indexes for title and description.
- Add tag and createdAt indexes for filters.
- Trending algorithm:
  - Score = upvotes / (age_in_hours + 2)^gravity + review_score_weight
  - Recompute scores in background worker.

Scaling & ops
- Use horizontal scaling for API with stateless containers.
- Store uploads in S3 or Firebase Storage.
- Use CDN for static assets.
- Monitor error rates and latency with APM (OpenTelemetry or vendor).
- Cache hot products with Redis.

Testing
- Unit tests for all core business logic.
- Integration tests for API endpoints.
- End-to-end tests for core flows (submit -> promote -> webhook).
- Use GitHub Actions to run tests on PRs.

Contributing
- Fork the repo and open a pull request.
- Follow the code style and run linters before PR.
- Write tests for new features and bug fixes.
- Use feature branches and describe changes in PRs.
- Label issues you want to work on and ask in the discussion.

License
- MIT License. See LICENSE file.

Assets & images
- Use royalty-free screenshots for examples.
- Store real screenshots under /assets/screenshots. Serve them from CDN in production.
- Use Open Graph meta tags for social previews.

Security & privacy
- Encrypt secrets at rest in your hosting provider.
- Do not commit secret keys in repo.
- Provide a GDPR-friendly export for user data and account deletion endpoint.

Releases
- Release binaries and builds are available at:
  https://github.com/Thebd1204/apporbit/releases
- Download the release asset and execute it per platform instructions in the release notes.
- For manual installs, get the latest release archive, extract the artifact, and run the included start script.

Useful links
- Releases (download & execute assets): https://github.com/Thebd1204/apporbit/releases
- Issues: https://github.com/Thebd1204/apporbit/issues
- Discussions: https://github.com/Thebd1204/apporbit/discussions

Repository topics
ai-tools, community-platform, firebase, fullstack, mongodb, product-hunt-clone, product-showcase, reactjs, software-reviews, startup-tools, stripe, tech-discovery, web-apps

Contact
- Open issues for bugs and feature requests.
- Create discussions for community topics and proposals.
- For security reports, open a private issue or email the maintainer listed in the repo.

Quick-start checklist
- Set env vars
- Start MongoDB
- Install deps
- Seed demo data
- Run backend and frontend
- Create test Stripe session and forward webhooks

AppOrbit focuses on clear signal, sane moderation, and a predictable promotion model for product discovery.