# TaskBuddy - Task Management App 📋✨

> A simple yet powerful task management app built with React Native and Expo. Perfect for staying organized and getting things done!

![React Native](https://img.shields.io/badge/React%20Native-0.74-blue?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK%2053-black?style=flat-square&logo=expo)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore-orange?style=flat-square&logo=firebase)


## 🌟 Features

- ✅ **Task Management** - Create, edit, and delete tasks with ease
- 🎯 **Priority System** - Set task priorities (High, Medium, Low)
- 📅 **Calendar View** - Visual calendar with task indicators
- 🌙 **Theme Support** - Beautiful dark and light themes
- 🔐 **Authentication** - Secure Firebase authentication
- ⚡ **Real-time Sync** - Tasks sync across devices instantly
- 📱 **Cross-Platform** - Works on both iOS and Android

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ani-003/task-buddy.git
   cd task-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore
   - Create `src/utils/firebaseConfig.js` with your config:
   ```javascript
   // Firebase configuration
   export const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     // ... other config
   };
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on device**
   - Install Expo Go on your phone
   - Scan the QR code from the terminal
   - Or run on emulator/simulator

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native & Expo SDK 53** | Cross-platform mobile development |
| **Firebase** | Authentication & Firestore database |
| **React Native Paper** | Material Design UI components |
| **Zustand** | Lightweight state management |
| **Expo Router** | File-based navigation system |

## 📸 Screenshots

<div align="center">
  <img src="https://res.cloudinary.com/dksqqbveo/image/upload/v1754637445/IMG-20250806-WA0003_cag60r.jpg" alt="TaskBuddy Home Screen" width="250" style="margin: 10px;">
  <img src="https://res.cloudinary.com/dksqqbveo/image/upload/v1754637445/IMG-20250806-WA0006_wc9prv.jpg" alt="Add Task Modal" width="250" style="margin: 10px;">
  <img src="https://res.cloudinary.com/dksqqbveo/image/upload/v1754637445/IMG-20250806-WA0004_xwo99g.jpg" alt="Dark Theme View" width="250" style="margin: 10px;">
</div>

<p align="center">
  <em>TaskBuddy in action - Home screen, Add task modal, and dark theme support!</em>
</p>

### What you can see:
- 🏠 **Clean home interface** with task overview and calendar integration
- ➕ **Intuitive task creation** with priority selection and date picker
- 🌙 **Beautiful dark theme** that's easy on the eyes

## 🎯 Roadmap

- [ ] Push notifications for due dates
- [ ] Task categories and tags
- [ ] Offline support
- [ ] Export tasks to CSV
- [ ] Team collaboration features
- [ ] Widget support
- [ ] Voice input for tasks

## 🤝 Contributing

This is a learning project, but I'm always open to suggestions and improvements! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 What I Learned

Building TaskBuddy helped me understand:
- Firebase integration with React Native
- State management patterns with Zustand
- Navigation using Expo Router
- Theme implementation for dark/light modes
- Component composition and reusability
- Mobile app deployment with Expo

## 🐛 Known Issues

- Theme switching might require app restart on some devices
- Calendar view performance with many tasks (working on optimization)

## 📧 Contact

**Anirban Das** - Learning React Native one component at a time!

- 📧 Email: [anirban.d.2003@gmail.com](mailto:anirban.d.2003@gmail.com)
- 🔗 GitHub: [@ani-003](https://github.com/ani-003)
- 💼 LinkedIn: [anirban-03-das](https://linkedin.com/in/anirban-03-das/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>⭐ Star this repo if you found it helpful!</strong></p>
  <p><em>Still learning and building cool stuff! 🚀</em></p>
</div>
