// ============================================================
//  Vishak Tech – Auth Guard (add to EVERY protected page)
//  Place this as the FIRST script in <head> so it blocks
//  rendering before the page content is shown.
// ============================================================

import { initializeApp }        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
                                from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAETO-bfN1wORtT8cVhSZseQ05ZGmQspC0",
  authDomain:        "vishaktech-79a37.firebaseapp.com",
  projectId:         "vishaktech-79a37",
  storageBucket:     "vishaktech-79a37.firebasestorage.app",
  messagingSenderId: "68398724582",
  appId:             "1:68398724582:web:76840e738169b3af429227"
};

// ─── Which email is allowed on THIS page ────────────────────
// Change this value per page:
//   Sales/index.html     → "dr4683743@gmail.com"
//   WorkOrder/index.html → "deepakmurugesan805@gmail.com"
const ALLOWED_EMAIL = "dr4683743@gmail.com"; // ← change per page
// ────────────────────────────────────────────────────────────

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Hide the entire page body until auth is confirmed
document.documentElement.style.visibility = "hidden";

onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== ALLOWED_EMAIL) {
    // Not logged in or wrong account → kick back to landing
    if (user) await signOut(auth);
    window.location.replace("/Testing/"); // GitHub Pages base path
    return;
  }

  // Authorised → show the page
  document.documentElement.style.visibility = "visible";
});

// ── Optional: expose a sign-out button helper ────────────────
window.vishakSignOut = async function () {
  await signOut(auth);
  window.location.replace("/Testing/");
};
