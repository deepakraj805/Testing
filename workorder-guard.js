// ============================================================
//  Vishak Tech – Auth Guard for WORK ORDER dashboard
//  Place as FIRST script in WorkOrder/index.html <head>
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

const ALLOWED_EMAIL = "deepakmurugesan805@gmail.com";  // WorkOrder only

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Hide page until auth confirmed
document.documentElement.style.visibility = "hidden";

onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== ALLOWED_EMAIL) {
    if (user) await signOut(auth);
    window.location.replace("/Testing/");
    return;
  }
  document.documentElement.style.visibility = "visible";
});

window.vishakSignOut = async function () {
  await signOut(auth);
  window.location.replace("/Testing/");
};
