# United Kingdom Interactive Geo-Tech Portal & C++ Engine

**Author**: Serzhan Birzhan  
**Academic Group**: APE2601  
**Target Domain**: United Kingdom of Great Britain & Northern Ireland  
**Technologies**: C++20, JavaScript (ES6+), HTML5, CSS3, Web Audio API

---

## 📌 Project Overview
An interactive analytical portal dedicated to the geography, economy, and transit infrastructure of the United Kingdom (England, Scotland, Wales, and Northern Ireland). Built with pure verified factual data (zero filler/water).

### Features:
1. **Interactive Vector Map**: Clickable constituent countries & major city nodes with procedural Web Audio sound effects.
2. **C++ Transit Optimization Engine (`uk_analyzer.cpp`)**: Dijkstra's shortest path transit solver calculating optimal inter-city paths across Great Britain.
3. **Verified Demographic & Economic Analytics**: Population density, GDP contributions, and physical landmarks.
4. **Standalone Web Portal**: Self-contained HTML5/CSS/JS frontend ready to host on GitHub Pages without build tools.

---

## 🛠 Compilation & Execution (C++)

### Requirements:
- `g++` with C++20 support (or `clang++`)
- `make` (optional)

### Build and Run with Make:
```bash
make run
```

### Manual Compilation with g++:
```bash
g++ -std=c++20 -O3 uk_analyzer.cpp -o uk_analyzer
./uk_analyzer
```

---

## 🌐 Running the Web Application
Open `index.html` directly in any modern browser:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```
Or host freely via GitHub Pages!

---

## 📂 Repository File Structure
```
├── uk_analyzer.cpp   # C++20 graph & statistical analytics engine
├── Makefile          # Build automation for C++ executable
├── index.html        # Interactive HTML5 portal
├── script.js         # JavaScript logic & Web Audio synthesizer
├── styles.css        # Responsive styling & dark visual system
└── README.md         # Documentation and project verification
```

© 2026 Serzhan Birzhan (APE2601).
