import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
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

window.googleLogin = async () => {

  const provider = new GoogleAuthProvider();

  try {

    const result = await signInWithPopup(auth, provider);

    const email = result.user.email.toLowerCase();

    if (
      email === "dr4683743@gmail.com" ||
      email === "deepakmurugesan805@gmail.com"
    ) {

      window.location.href = "./Sales/";

    } else if (
      email === "murugesankarruppanan@gmail.com"
    ) {

      window.location.href = "./Work%20Order/";

    } else {

      alert("Access Denied");
      await signOut(auth);

    }

  } catch (error) {
    console.error(error);
  }

};

window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "../";
};

window.checkSalesAccess = () => {

  onAuthStateChanged(auth, (user) => {

    if (!user) {
      window.location.href = "../";
      return;
    }

    const email = user.email.toLowerCase();

    const allowed = [
      "dr4683743@gmail.com",
      "deepakmurugesan805@gmail.com"
    ];

    if (!allowed.includes(email)) {
      window.location.href = "../";
    }

  });

};

window.checkWorkOrderAccess = () => {

  onAuthStateChanged(auth, (user) => {

    if (!user) {
      window.location.href = "../";
      return;
    }

    const email = user.email.toLowerCase();

    if (email !== "murugesankarruppanan@gmail.com") {
      window.location.href = "../";
    }

  });

};
