
# ISA - Premium Apparel Launch Guide

## 1. Project Overview
ISA is a luxury DTC apparel brand focusing on high-end trousers. This website is built using **Next.js**-ready architecture (ported to a high-performance React SPA for this preview) with a focus on minimalism, luxury, and high conversion.

## 2. Supabase Integration (Backend)

### Database Schema
Create the following tables in your Supabase project:
1. `categories`: `id (uuid), name (text)`
2. `products`: `id (uuid), slug (text), title (text), price (numeric), description (text), category_id (uuid)`
3. `variants`: `id (uuid), product_id (uuid), size (text), color (text), hex (text), stock (integer)`
4. `product_images`: `id (uuid), product_id (uuid), url (text), sort_order (integer)`

### Image Management (For Business Owners)
To manage your luxury catalog without writing code:
1. **Upload**: Go to Supabase Dashboard > **Storage**. Create a bucket named `product-images`.
2. **Organize**: Create folders by category (e.g., `/dress-pants/`).
3. **Link**: Upload your high-res image, copy its **Public URL**, and paste it into the `product_images` table in the database.
4. **Update**: When you change an image in Storage, keep the same name, or update the URL in the table. The website will reflect changes instantly.

## 3. Deployment on Vercel
This project is built to be deployed in minutes.

### Step 1: GitHub
1. Create a new repository on GitHub.
2. Initialize and push this code to the repository.

### Step 2: Vercel One-Click
1. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository.
3. Add these **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase API Key.
4. Click **Deploy**.

## 4. UI/UX Strategy
- **Colors**: Strictly navy (`#2C3468`) and white, mirroring your logo for brand cohesion.
- **Typography**: Playfair Display for headers (Luxury) and Inter for body (Modernity).
- **Cart**: Slide-in drawer for frictionless shopping, ensuring the user never leaves their flow.

## 5. Scaling Best Practices
- **SEO**: Ensure unique meta tags for every product slug.
- **Performance**: Use Supabase Edge Functions for complex operations like payment processing (Stripe integration).
- **Images**: Always use `.webp` or `.avif` formats for lightning-fast mobile loads.
