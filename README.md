# EduTrack

EduTrack is a modern **attendance management app** for schools and teachers. Built with **React Native**, **Expo**, and **Firebase**, it allows teachers to create classes, mark attendance, view reports, and manage student information—all from their mobile devices.

---

## 📱 Features

### **Class Management**
- Create and manage multiple classes
- Add or remove students
- Assign subjects to each class

### **Attendance Management**
- Mark students as **Present**, **Absent**, or **Late**
- View attendance history by class
- Real-time syncing with Firebase Firestore

### **Reports & Analytics**
- Attendance overview for each day
- Percentage of students present, absent, or late
- Historical records for insights

---

## 🛠 Tech Stack

| Layer          | Technology                                    |
|----------------|-----------------------------------------------|
| Frontend       | React Native + Expo + Tailwind CSS (via NativeWind) |
| Backend        | Firebase Authentication + Firestore           |
| Navigation     | Expo Router                                   |
| Icons          | Lucide React Native                           |
| State Management | React Context API                             |
| Loader & Alerts| Custom Loader & Alert Contexts                |

---

## 📂 Project Structure

```plaintext
EduTrack/
├── assets/         # Images, icons, splash screens
├── app/            # Expo Router pages
│   ├── home/       # Home screen & dashboard
│   ├── attendance/ # Attendance pages
│   ├── settings/   # Settings screen
│   └── login/      # Authentication screens
├── context/        # React context providers
├── services/       # Firebase & API services
├── types/          # TypeScript types/interfaces
├── package.json
└── README.md
```

## ⚡ Getting Started

### Prerequisites

-   Node.js >= 18
-   Expo CLI
-   Yarn or npm
-   Firebase project configured

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/yourusername/edu-track.git](https://github.com/yourusername/edu-track.git)
    cd edu-track
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Install peer dependencies for Lucide:
    ```bash
    npx expo install react-native-svg
    ```

4.  Start the Expo development server:
    ```bash
    npx expo start
    ```

5.  Open the app on your Android/iOS simulator or physical device using the Expo Go app.

### 🔧 Configuration

Add your Firebase config in `services/firebaseConfig.ts`:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

```

Ensure your Firestore rules allow read/write access for authenticated users.

---

## 📸 Screenshots

*(Add your screenshots here)*

---

## 🎬 Live Demo

Watch a live demo of **EduTrack** in action:

[![Watch the demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

> Replace `YOUR_VIDEO_ID` with your actual YouTube video ID.

---

## 🙌 Acknowledgements

-   [Expo](https://expo.dev/)
-   [React Native](https://reactnative.dev/)
-   [Lucide Icons](https://lucide.dev/)
-   [Firebase](https://firebase.google.com/)

---

## 🚀 Author

**Chanuka Prabodha**

[GitHub](https://github.com/your-github-profile) | [LinkedIn](https://linkedin.com/in/your-linkedin-profile)
