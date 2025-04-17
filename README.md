
# 🛍️ E-Commerce Web App (Next.js)

A sophisticated e-commerce web application built using **Next.js**. This project showcases advanced features like filtering, cart management, persistent state, and more.

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser to view the app.

---

## ✨ Features Implemented

- ✅ Fully responsive UI with **dark/light mode**
- ✅ Product listing from **Fake Store API**
- ✅ Advanced **product filtering** (category, price, search, sort)
- ✅ Drag-and-drop **shopping cart**
- ✅ Cart items and addresses are stored in **localStorage**
- ✅ User **address management** with form validation
- ✅ Auto-selection of last added address on checkout
- ✅ Order summary with shipping, tax calculation, and promo code UI
- ✅ Order placement with cart reset and redirection

---

## 🧠 Technical Decisions & Architecture

- **Framework:** Chose **Next.js App Router** for file-based routing and future scalability.
- **Styling:** Used **Tailwind CSS** for rapid styling and component flexibility.
- **State Management:** Leveraged `useState`, `useEffect`, and context (`AppContext`) instead of global tools like Redux, to keep things lightweight and clean.
- **API Integration:** Used the **Fake Store API** to simulate real product data.
- **Storage:** Used **localStorage** to persist user cart, addresses, and orders for simplicity in this mock version (no backend).
- **Modular Code:** Created reusable components (`Navbar`, `Footer`, `OrderSummary`, etc.) for maintainability and separation of concerns.

---

## 🧩 Challenges & Solutions

### 1. **Auto-selecting newly added address**
I wanted the app to auto-select the last saved address after the user adds it, so I:
- Stored the newly added address in a separate localStorage key (`selected-address`)
- Then retrieved and removed it in the order summary page using `useEffect`

> This created a smooth UX by reducing user steps before placing the order.

---

### 2. **Handling filtering with multiple combinations**
- Built filtering logic to work with **multiple filters simultaneously**, including sorting, price ranges, and search.
- Used `useMemo` to optimize filtered product lists to avoid re-computation on every render.

---

### 3. **Persisting cart data**
- Used localStorage to persist the cart across sessions, allowing users to return and continue shopping without losing their data.

---


## 🙋‍♂️ About Me

I’m a Next.js developer who's worked on a number of real-world freelance projects and internships. This project reflects not just technical skills but also user-focused decisions to improve usability and maintainability.

---

## 📌 TODO (Future Enhancements)

-  Add Firebase/Auth integration
-  Payment gateway (Stripe or Razorpay)
-  Backend API & database for real user data
-  Wishlist functionality

---

## 📬 Feedback / Suggestions

Feel free to open an issue or connect with me via GitHub if you have any ideas or feedback!

---

Thanks for checking this out! 🚀
