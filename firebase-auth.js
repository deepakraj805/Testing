// ============================================================
//  Vishak Tech – Firebase Authentication + Role-Based Access
// ============================================================
//  SALES     → dr4683743@gmail.com
//  WORK ORDER → deepakmurugesan805@gmail.com
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAETO-bfN1wORtT8cVhSZseQ05ZGmQspC0",
  authDomain:        "vishaktech-79a37.firebaseapp.com",
  projectId:         "vishaktech-79a37",
  storageBucket:     "vishaktech-79a37.firebasestorage.app",
  messagingSenderId: "68398724582",
  appId:             "1:68398724582:web:76840e738169b3af429227",
  measurementId:     "G-YSFVYWR2DW"
};

// ─── Role Map ────────────────────────────────────────────────
// Add or remove emails here anytime
const ROLE_MAP = {
  "dr4683743@gmail.com":         "/Testing/Sales/",
  "deepakmurugesan805@gmail.com": "/Testing/WorkOrder/"
};
// ─────────────────────────────────────────────────────────────

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();

// ── Called by the Login button in index.html ─────────────────
window.firebaseGoogleSignIn = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const email  = result.user.email;
    const dest   = ROLE_MAP[email];

    if (!dest) {
      // Not in the allowed list → sign out immediately
      await signOut(auth);
      showAccessDenied(email);
      return;
    }

    // Authorised → close login modal and redirect
    document.getElementById("loginModal").style.display = "none";
    window.location.href = dest;

  } catch (err) {
    if (err.code !== "auth/popup-closed-by-user") {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
  }
};

// ── Auto-redirect if already signed in ───────────────────────
onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const dest = ROLE_MAP[user.email];
  if (dest) {
    // Already logged in and on the landing page → redirect
    const onLanding =
      window.location.pathname.endsWith("/") ||
      window.location.pathname.endsWith("index.html");

    if (onLanding) {
      window.location.href = dest;
    }
  } else {
    // Logged in with an unauthorised account → sign out
    signOut(auth);
  }
});

// ── Access denied UI ─────────────────────────────────────────
function showAccessDenied(email) {
  // Remove any existing denied banner
  const existing = document.getElementById("accessDeniedBanner");
  if (existing) existing.remove();

  const banner = document.createElement("div");
  banner.id = "accessDeniedBanner";
  banner.style.cssText = `
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
    background:linear-gradient(135deg,#7f1d1d,#991b1b);
    color:#fff;padding:16px 28px;border-radius:16px;
    font-family:Poppins,sans-serif;font-size:.95rem;
    box-shadow:0 8px 32px rgba(0,0,0,.4);z-index:99999;
    display:flex;align-items:center;gap:12px;
    animation:slideUp .3s ease;
  `;
  banner.innerHTML = `
    <style>@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}</style>
    <span>🚫</span>
    <span><b>Access Denied</b><br><small>${email} is not authorised.</small></span>
    <button onclick="this.parentElement.remove()" style="background:rgba(255,255,255,.2);border:none;color:#fff;padding:6px 12px;border-radius:8px;cursor:pointer;margin-left:8px;">✕</button>
  `;
  document.body.appendChild(banner);

  // Auto-remove after 5 seconds
  setTimeout(() => banner?.remove(), 5000);
}
