# KUMBIL — Full-Stack E-Commerce Platform Prompt

## Project Overview

Build a **production-ready, professional e-commerce marketplace** for a brand called **KUMBIL**.

> **Slogan:** *"Eat For Health"*

**Business Concept:**
Kumbil is a premium organic agricultural marketplace that connects farmers who grow crops naturally (without pesticides or chemical fertilizers) to global health-conscious customers. The platform must reflect Kumbil's authentic, heritage-driven identity while delivering a world-class digital shopping experience.

**Reference Sites for Inspiration:**
- [organictattva.com](https://organictattva.com)
- [theorganicworld.com](https://theorganicworld.com)
- [organicmandya.com](https://organicmandya.com)
- [banyanbotanicals.com](https://banyanbotanicals.com)

---

## Tech Stack

### Frontend
- **Framework:** Next.js (React) with App Router
- **Styling:** TailwindCSS — mobile-first, fully responsive
- **Rendering:** SSR + SSG for SEO-critical pages
- **i18n:** Next-i18next for multilingual support

### Backend
- **Runtime:** Node.js + Express **or** NestJS
- **ORM:** Prisma
- **Database:** MySQL
- **Caching:** Redis
- **File Storage:** AWS S3 (with local fallback for development)

### Authentication
- **JWT** with Refresh Token rotation
- **bcrypt** password hashing
- Role-based access control: `ADMIN` / `USER`

### Deployment
- Docker-ready
- Compatible with: **Hostinger**, Vercel, AWS
- `.env` based configuration for all environments

---

## Design System

| Token | Value |
|---|---|
| Primary (Forest Green) | `#2E6F40` |
| Secondary (Warm Cream) | `#FCF5E5` |
| Accent (Harvest Gold) | `#F28F03` |

**Visual Style:**
- Clean, organic, premium aesthetic
- Large full-bleed photography & video hero sections
- Smooth scroll animations and micro-interactions
- Minimal luxury typography — prefer `Inter` or `Outfit` from Google Fonts
- Glassmorphism accents for cards and overlays

---

## Feature Specification

### 1. Authentication System

Implement a secure, role-based authentication system.

**Requirements:**
- User registration and login (email + password)
- Admin login with separate role guard
- Password hashing with **bcrypt**
- **JWT** access tokens + **Refresh Token** rotation
- Role-based access control: `ADMIN` | `USER`
- reCAPTCHA on login and registration forms
- Session invalidation on logout

---

### 2. Database Models (Prisma)

Define all models with proper relational constraints and cascades.

**Models:**
- `User` — id, name, email, password (hashed), role, status, createdAt
- `Product` — id, name, slug, description, categoryId, farmerId, batchId, price, weight, stock, images, ratings
- `Category` — id, name, slug, description
- `Farmer` — id, name, location, bio, profileImage, farmId
- `Farm` — id, name, location (lat/lng), mapUrl
- `Batch` — id, productId, farmId, harvestDate, qualityReport, batchCode
- `Order` — id, userId, status, totalAmount, shippingAddress, invoiceUrl, createdAt
- `OrderItem` — id, orderId, productId, quantity, price, variantId
- `Cart` — id, userId (or guestToken), items
- `CartItem` — id, cartId, productId, quantity, variantId
- `Payment` — id, orderId, gateway, transactionId, status, amount, currency
- `Coupon` — id, code, discountType, discountValue, minOrder, expiresAt, usageLimit
- `Review` — id, userId, productId, rating, comment, createdAt
- `Wishlist` — id, userId, productId
- `BlogPost` — id, title, slug, body, tags, authorId, seoMeta, publishedAt

---

### 3. Admin Dashboard

Build a full React admin panel (accessible at `/admin`).

**Capabilities:**

#### Product Management
- Add, edit, delete products
- Upload product images (to AWS S3)
- Set price, weight variants, stock quantity
- Assign category / farmer / batch

#### Category Management
- CRUD for product categories

#### Farmer & Farm Management
- Add and manage farmer profiles and farm details
- Link farms to specific product batches

#### Batch & Tracking Management
- Create product batches with harvest date, quality report PDF, and batch code
- Link each batch to a farm and product

#### Order Management
- View all orders with filters (status, date, customer)
- Update order status: `PENDING → PROCESSING → SHIPPED → DELIVERED → CANCELLED`
- View full customer and address details
- Order history

#### Customer Management
- View all registered users
- Disable / re-enable suspicious accounts

#### Inventory Control
- Real-time stock levels
- Low-stock alerts

#### Coupon & Discount Management
- Create percentage or flat discount coupons
- Set minimum order value, expiry date, and usage limits

#### Blog Management
- Rich-text editor for blog posts
- SEO meta fields per post

#### Analytics Dashboard
- Total sales, total orders, total products, total customers
- Revenue charts (daily / weekly / monthly)
- Recent orders table
- Top-selling products

#### Sales Reports
- Exportable CSV / PDF sales reports

---

### 4. User-Facing E-Commerce Storefront

Build a professional storefront with the following pages:

#### Home Page
**Hero Section:**
- Fullscreen video background: Wayanad hills, farmers harvesting, traditional Kumbil packaging

**Sections:**
- Farm-to-Global shipping banner
- Featured Products carousel
- Story of Kumbil
- Farmer community highlight
- Customer testimonials
- Certifications & quality badges

#### About Page
- Our Story
- Mission & Vision
- Core Values: Transparency · Heritage Preservation · Farmer Prosperity

#### Products Page
- Grid / list view toggle
- Filter by category
- Search by product name
- Sort by: price, rating, newest

**Product Categories:**

| Category | Products |
|---|---|
| Spices | Pepper, Turmeric, Ginger, Garam Masala |
| Coffee | Bean (whole), Powder |
| Traditional Items | Kudampuli, Kuttam Puli, Coconut Oil |
| Rice | Kuthari, Pachari, Puttu Podi |
| Snacks | Banana Chips, Sweet Banana Chips, Jaggery Chips, Achappam, Unniyappam |

#### Product Detail Page
- High-quality image gallery
- Weight / variant selector
- Stock availability indicator
- Customer reviews & star ratings
- Related products
- **Order-to-Origin Tracking block** (see Special Feature)
- Add to Cart / Add to Wishlist

#### Cart Page
- Add / remove / update quantity
- Cart summary with subtotal
- Apply coupon code
- Proceed to checkout

#### Checkout Page
- Shipping address form
- Order summary sidebar
- Payment gateway selection
- Guest checkout supported

#### User Account Pages
- Profile management
- Order history & status tracking
- Invoice download (PDF)
- Wishlist management
- Address book

---

### 5. Special Feature — Order-to-Origin Tracking

Every product batch is linked to a specific farm. Customers can view a dedicated tracking page showing:

- **Farm name** and farmer profile photo
- **Farm location map** (Google Maps embed or Mapbox)
- **Harvest date**
- **Batch number**
- **Quality test report** (downloadable PDF)

Each product detail page must display this block prominently as a trust signal.

---

### 6. Shopping & Commerce Features

- Shopping cart (persisted for logged-in users; session-based for guests)
- Wishlist
- Guest checkout
- Multi-currency support (INR, USD, EUR, AED)
- Global shipping with address validation
- Discount & coupon system
- Tax calculation support
- Inventory management with stock alerts
- Email notifications: order confirmation, shipping update, delivery
- Invoice download (PDF generation)
- WhatsApp order notifications (via WhatsApp Business API)
- Loyalty rewards system (points per purchase)
- Referral system (unique referral code per user)

---

### 7. Payment Gateways

Integrate the following with full order creation, payment verification, and webhook handling:

| Gateway | Region |
|---|---|
| Razorpay | India |
| Stripe | Global |
| PayPal | Global |
| Cashfree | India |
| Instamojo | India |
| Paytm | India |

**Payment Methods Supported:**
- UPI
- Credit / Debit Cards
- Net Banking
- Digital Wallets

---

### 8. Security Requirements

Implement enterprise-grade security:

- HTTPS enforced everywhere
- Rate limiting on all API endpoints
- SQL injection protection (via Prisma parameterised queries)
- XSS protection (Content-Security-Policy headers)
- CSRF protection (CSRF tokens on forms)
- Secure cookie attributes (`HttpOnly`, `Secure`, `SameSite`)
- Input validation & sanitisation on all API inputs
- bcrypt password hashing (min cost factor: 12)
- JWT with short expiry + refresh token rotation
- Admin role permissions (separate middleware guard)
- Audit logs for admin actions
- reCAPTCHA on all public forms
- Payment signature verification (per gateway spec)

---

### 9. API Structure (REST)

Expose clean, versioned REST endpoints:

```
/api/auth          → register, login, logout, refresh
/api/products      → CRUD, search, filter, reviews
/api/categories    → CRUD
/api/cart          → add, remove, update, get
/api/orders        → create, list, detail, invoice
/api/checkout      → initiate, confirm
/api/payments      → webhook handlers per gateway
/api/wishlist      → add, remove, list
/api/coupons       → validate, apply
/api/farmers       → list, detail
/api/batches       → detail, tracking
/api/blog          → list, detail
/api/admin/*       → all admin-only endpoints (role-guarded)
/api/users         → profile, address book, order history
```

---

### 10. File Upload

- Product images: upload to **AWS S3** with optimised naming & URL generation
- Quality report PDFs: upload to S3 with secure download link
- Local storage fallback for development (using `/public/uploads`)
- File type validation & size limits enforced server-side

---

### 11. Responsive UI Requirements

All pages must be fully responsive across mobile, tablet, and desktop. Design must follow modern ecommerce standards.

**Pages to build:**
1. Home
2. About
3. Products (listing)
4. Product Detail
5. Cart
6. Checkout
7. Order Confirmation
8. Order Tracking
9. User Profile
10. Order History
11. Wishlist
12. Admin Dashboard (all sections)
13. Login / Register
14. Blog List & Blog Post Detail

---

### 12. Blog System

A full content blog for organic lifestyle content.

**Categories:**
- Health articles
- Organic farming education
- Recipes
- Farmer stories

**Features:**
- SEO-optimized (meta title, description, OG tags per post)
- Tag-based filtering
- Author attribution
- Social share buttons

---

### 13. Multilingual Support

- **Primary language:** English
- **Supported languages:** Arabic, German, French
- Use `next-i18next` with locale files per language
- RTL support for Arabic

---

### 14. SEO Features

- Unique `<title>` and `<meta description>` per page
- OpenGraph & Twitter Card tags
- JSON-LD schema markup (Product, Organization, BreadcrumbList)
- Canonical URLs
- Auto-generated `sitemap.xml`
- `robots.txt`
- Clean, slug-based URLs

---

### 15. Performance

- Next.js Image component for automatic image optimisation
- Lazy loading for below-fold content
- CDN-ready static asset delivery
- Server-side rendering for product and category pages
- Static generation for blog and about pages
- Redis caching for product listings and frequent queries

---

### 16. Bonus / AI Features

- **AI Product Recommendations** — collaborative filtering or similarity-based engine
- **Email Marketing Integration** — connect with Mailchimp or SendGrid for campaigns
- **WhatsApp Order Notifications** — via WhatsApp Business Cloud API
- **Loyalty Rewards System** — points earned per purchase, redeemable at checkout
- **Referral System** — unique referral codes with discount incentives

---

### 17. Deployment Readiness

Prepare the project for production deployment on **Hostinger** (or equivalent):

- `.env.production` file with all required environment variables documented
- `Dockerfile` + `docker-compose.yml` for containerised deployment
- Database migration scripts (`prisma migrate deploy`)
- Build pipeline script (`npm run build`)
- PM2 config or start script for Node.js process management

---

## Deliverables

Please generate the following:

1. **Full project folder structure** with all directories and files
2. **Frontend source code** — Next.js pages, components, hooks, styles
3. **Backend API source code** — all route handlers, middleware, services
4. **Prisma schema** — all models with relations
5. **Database seed script** — sample farmers, products, categories, batches
6. **Admin dashboard code** — all admin pages and components
7. **Payment integration code** — per gateway
8. **Environment variable template** — `.env.example` with all required keys
9. **Deployment guide** — step-by-step instructions for Hostinger

---

## Final Instruction

Generate **clean, scalable, production-ready code** with:
- Consistent naming conventions
- Separation of concerns (controllers / services / repositories)
- Comment headers on complex logic
- Error handling and proper HTTP status codes on all API routes
- Architecture suitable for a real, growing organic ecommerce business