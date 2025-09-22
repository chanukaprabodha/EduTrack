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

<p align="center">
  <img src="https://github.com/user-attachments/assets/a62e9cda-00d3-4da4-a3d6-ce5ded6a10f3" alt="Screenshot 1" width="22%" />
  <img src="https://github.com/user-attachments/assets/5d5ccd57-f9be-46d8-8d3e-189639fb3770" alt="Screenshot 2" width="22%" />
  <img src="https://github.com/user-attachments/assets/536f035a-ec96-423e-b271-3d4b6b5743bb" alt="Screenshot 3" width="22%" />
  <img src="https://github.com/user-attachments/assets/5ab71583-b2f8-4816-9b2c-9e81c537e8ee" alt="Screenshot 4" width="22%" />
</p>

---

## 🎬 Live Demo

Watch a live demo of **EduTrack** in action:

[![Watch the demo](https://img.youtube.com/vi/T_z0WgN3kmM/0.jpg)](https://www.youtube.com/watch?v=T_z0WgN3kmM)

---

## 🙌 Acknowledgements

-   [Expo](https://expo.dev/)
-   [React Native](https://reactnative.dev/)
-   [Lucide Icons](https://lucide.dev/)
-   [Firebase](https://firebase.google.com/)

---

## 🚀 Author

**Chanuka Prabodha**

[GitHub](https://github.com/chanukaprabodha) | [LinkedIn](https://linkedin.com/in/chanuka-prabodha-a78876234)
