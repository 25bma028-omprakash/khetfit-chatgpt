[README.md](https://github.com/user-attachments/files/33299484/README.md)
# KhetFit website starter

A responsive, dark/acid-green storefront prototype for KhetFit.

## Included
- Responsive landing page and product grid
- Search, category filters, and sorting
- Product detail modal with six demo gallery slots
- Flavour/weight choices and quantity controls
- Cart and checkout preview
- COD and Pay Now (UPI placeholder)
- Browser-only demo reviews and ratings
- Demo admin panel for editing sample prices and viewing local demo orders
- Contact links: +91 77420 62730 and mandaljodhaom@gmail.com
- Owner-provided replacement policy copy

## Important: prototype, not a live shop
The product catalogue and prices are sample data. Sample ratings are illustrative and are labelled as such. Product images are stylized placeholders, not six real photos of each item.

This version uses browser `localStorage` only. Admin changes, reviews and demo orders are stored only in the current browser and are not shared with other customers/devices. The demo admin passcode is visible in `script.js` and is NOT secure. Do not use this as a production admin login.

Checkout does not collect payments. The UPI ID is blank and Pay Now is only a placeholder. No payment is charged or verified. COD requests are also previews until you connect a backend/order service.

## Preview
Open `index.html` in a browser. For a better local preview, use VS Code Live Server.

## Demo admin
Click the gear icon on desktop and enter `khetfit-demo`. You can edit demo prices and view orders created in that same browser. This is for testing only.

## Before a real launch
1. Replace every sample product, price, weight, flavour, description, stock level and sample rating with accurate business data.
2. Add six genuine images per product and confirm you have permission to use them.
3. Add verified ingredients, nutrition/allergen information, manufacturer details, product labels, and any required declarations for food/supplement products.
4. Confirm shipping charges, delivery areas, order confirmation flow, privacy policy, terms, and legally compliant replacement/refund wording.
5. Connect a secure backend/database and real admin authentication; do not rely on a hidden page or client-side passcode.
6. Configure a payment provider or verified UPI checkout flow, including server-side payment verification. Never collect UPI PINs, passwords, or OTPs on your website.
7. Connect orders to a server so owner can see orders from all customers.
8. Test mobile layouts, form validation, security, and accessibility.
9. Deploy the static frontend to GitHub Pages or another static host. A live backend/payment gateway will require separate setup.

## Contact details in this prototype
- Phone / WhatsApp: +91 77420 62730
- Email: mandaljodhaom@gmail.com
