# 🪢 Raksha Bandhan Digital Surprise — "For My Sister ❤️"

A cinematic, interactive, and emotional Raksha Bandhan web experience built strictly with **HTML5, CSS3, and Vanilla JavaScript**.

---

## 🌟 Key Features
- **Dynamic Sibling Engine**: Personalize the website for any sister without touching code using URL parameters (`?name=Priya`, `?name=Neha`).
- **Cinematic Stage-0 Loader**: High-production introduction revealing her name.
- **Interactive Virtual Rakhi**: Complete with ribbon animations, festive confetti, and golden glow effects.
- **Digital Gift Box**: Interactive unboxing mechanics with Web Audio chimes.
- **Story Timeline & Flip Cards**: Humorous sibling rivalry scorecards and heartfelt timeline milestones.
- **Built-in Share Link Creator**: Generates instant custom surprise links.
- **Zero Frameworks / Zero Dependencies**: Operates 100% offline or hosted on any static platform.

---

## 🚀 How to Run Locally

1. Create a folder named `raksha-bandhan-surprise` and place `index.html`, `style.css`, `script.js`, and `README.md` inside it.
2. Double click `index.html` to open it directly in any modern web browser (Chrome, Edge, Safari, Firefox).
3. No build step, Node.js, or server installation is required.

---

## ✍️ How to Customize

### 1. Changing Default Sister & Brother Details
Open `script.js` and locate the config at the top:
```javascript
const defaultSisterData = {
  name: "Pratibha",
  nickname: "My Crime Partner",
  brotherName: "Vijay",
  relationship: "Brother & Sister",
  messages: {
    emotional: "Your custom emotional text...",
    funny: "Your custom funny memories text...",
    final: "Your custom closing remark..."
  }
};
