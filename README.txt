XORDER — FIRST FRONTEND PROTOTYPE

WHAT THIS IS
A mobile-friendly installable PWA frontend prototype for the Xorder campus water delivery idea.
It includes a supplier list with demo listings, price sorting/search, an order form, quantity selection,
Naira totals, and local demo order storage in the browser.

IMPORTANT LIMITATION
This is NOT connected to a live database or real suppliers yet. Demo suppliers and prices are fictional.
Submitting an order stores it only in the current browser/device. It does not send an order to anyone,
take payment, create user accounts, or confirm real water availability.

PREVIEW ON WINDOWS
1. Extract the ZIP.
2. Open the folder in Visual Studio Code (recommended).
3. Install the VS Code extension "Live Server".
4. Right-click index.html and choose "Open with Live Server".
   PWA install/offline features require localhost or HTTPS; opening index.html directly is not enough.

PUBLISHING
To install on phones from a live site, publish via a host such as Vercel or Netlify over HTTPS.
For iPhone, open the HTTPS site in Safari → Share → Add to Home Screen.
For Android, open in Chrome → menu → Install app / Add to Home screen.

NEXT BUILD PHASE
1. Confirm the school/campus and launch area.
2. Confirm actual jerrycan size(s), prices, delivery fees, and supplier rules.
3. Create Supabase project and connect authentication + database.
4. Build customer and supplier accounts, real order notifications, and admin dashboard.
5. Add payment gateway only after order flow is tested.

DESIGN
Classic, restrained navy/blue/white interface. Currency: Nigerian naira (₦).
