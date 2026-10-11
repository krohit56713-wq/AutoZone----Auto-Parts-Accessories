# AutoZone - Auto Parts & Accessories

Free Web Development Internship Online task **WD-EC-006** (E-Commerce, Automotive).
Front-end only store built with HTML5, CSS3 and vanilla JavaScript. No database and no libraries.

## Run it

Open `index.html` in any browser. No build step.

## What is inside

| File | Purpose |
| --- | --- |
| `index.html` | Page shell: header, search, category menu, footer |
| `style.css` | Theme (Navy `#1A3C5E`, White, Red `#E63946`) and responsive layout |
| `script.js` | Product data, SVG product art, pages, cart, checkout, account |

## Pages

Home, Product Listing, Product Detail, Shopping Cart, Checkout, Order Confirmation, User Account, Login / Register, Today's Deals, About Us, Contact Us.

## Features

Core: category-wise product display, product search with suggestions, add to cart, quantity adjustment, price calculation (coupons, delivery, GST), order summary, checkout with validation.

Bonus: filters (category, brand, price, rating, vehicle type), sorting and pagination, wishlist, product compatibility checker, vehicle model selection with a saved garage, related products, simulated order tracking, product reviews, recently viewed, pincode delivery check.

## How it was designed (from the amazon.in analysis)

Header with delivery pincode, search with category dropdown, account / wishlist / cart; category menu bar; hero offer carousel; 2x2 category tiles; Today's Deals with countdown; best-seller rows; brand strip; product page with gallery, variants, buy box, specs, reviews and "frequently bought together"; cart with free-delivery progress and coupons; multi-step checkout; order history and tracking; footer with "Back to top".

## Data storage (no database)

Products live in a JavaScript array in `script.js`. Cart, wishlist, orders, user and garage are kept in JavaScript objects and saved to `localStorage`.

## Images

Every product image, banner and the logo is drawn as inline SVG in `script.js` (`ART`, `carArt`, `LOGO`). No image files are needed.

## Try it

- Coupons: `AUTO10` (10% off), `SAVE200` (Rs 200 off above Rs 2,000), `FREESHIP`
- Demo login: `demo@autozone.com` / `demo123` (or create an account)
- Test card: any 16 digits, any future expiry, any 3-digit CVV. No real payment is taken.

## Submission

- Task link: add the task URL here
- Live site: add your deployed URL (GitHub Pages / Netlify)
- Demo video: add your YouTube link
