// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDchOUwg2oz60lattxdsaeqEOREActKGic",
  authDomain: "life-deck.firebaseapp.com",
  projectId: "life-deck",
  storageBucket: "life-deck.firebasestorage.app",
  messagingSenderId: "838638065691",
  appId: "1:838638065691:web:607449cc8741719cdd40be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

const test = {
  activities: [
    {
      title: "Chess",
      banner: "https://cdn-1.webcatalog.io/catalog/chesscom/chesscom-icon-filled-256.png?v=1714773895444",
      timeSpent: "1h 30m",
      isActive: true,
      lastActive: "2023-10-01T12:00:00Z",
      achivements: [
        {
          title: "Chess Master",
          description: "Achieved a rating of 2000+",
          icon: " ",
          locked: false,
          createDate: "2023-09-01",
          unlockDate: "2023-09-15",
        },
        {
          title: "Puzzle Solver",
          description: "Solved 100 puzzles in a day",
          date: "2023-09-20",
          icon: "https://example.com/puzzle-solver-icon.png",
          locked: false,
          createDate: "2023-09-01",
          unlockDate: "2023-09-15",
        },
      ],
      feed: [
        {
          title: "Chess.com",
          description: "Played a game against a random opponent.",
          date: "2023-10-01T12:00:00Z",
          icon: "https://example.com/chess-com-icon.png",
        },
      ],
    },
  ],
};
