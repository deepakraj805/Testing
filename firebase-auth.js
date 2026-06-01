import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAETO-bfN1wORtT8cVhSZseQ05ZGmQspC0",
  authDomain: "vishaktech-79a37.firebaseapp.com",
  projectId: "vishaktech-79a37",
  storageBucket: "vishaktech-79a37.firebasestorage.app",
  messagingSenderId: "68398724582",
  appId: "1:68398724582:web:76840e738169b3af429227"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Allowed emails per role ──────────────────────────────
const SALES_EMAILS = [
  "dr4683743@gmail.com",
  "deepakmurugesan805@gmail.com"
];
const WORKORDER_EMAILS = [
  "murugesankarruppanan@gmail.com"
];

function redirectByRole(email) {
  const e = email.toLowerCase();
  if (SALES_EMAILS.includes(e))    { window.location.href = "/Testing/Sales/"; }
  else if (WORKORDER_EMAILS.includes(e)) { window.location.href = "/Testing/WorkOrder/"; }
  else { alert("Access Denied"); signOut(auth); }
}

// ── Google Login ─────────────────────────────────────────
window.googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    redirectByRole(result.user.email);
  } catch (error) {
    console.error(error);
    alert("Google sign-in failed: " + error.message);
  }
};

// ── Email / Password Login ───────────────────────────────
window.emailLogin = async () => {
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errEl    = document.getElementById("login-error");
  if (!email || !password) { errEl.textContent = "Please enter email and password."; return; }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    redirectByRole(result.user.email);
  } catch (error) {
    errEl.textContent = "Login failed: " + error.message;
  }
};

// ── Logout ───────────────────────────────────────────────
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "/Testing/";
};

// ── Route Guards ─────────────────────────────────────────
window.checkSalesAccess = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) { window.location.href = "/Testing/"; return; }
    if (!SALES_EMAILS.includes(user.email.toLowerCase())) {
      window.location.href = "/Testing/";
    }
  });
};

window.checkWorkOrderAccess = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) { window.location.href = "/Testing/"; return; }
    if (!WORKORDER_EMAILS.includes(user.email.toLowerCase())) {
      window.location.href = "/Testing/";
    }
  });
};
