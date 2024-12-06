# CSV to Graph Converter

## 📜 Description

The **CSV to Graph Converter** is a web application that simplifies the process of visualizing your CSV data. With a user-friendly interface and the power of **React Google Charts**, you can easily convert your CSV files into interactive graphs of various types, including bar charts, line charts, and pie charts. You can also download the generated graphs as images for further use. 

The application includes sample CSV files for you to test the features, making it beginner-friendly and ready to use.

### 🔗 Live Demo

You can try out the tool directly from the deployed version on [Vercel](https://csv2graph.vercel.app/).

---

## ✨ Features

- **Upload CSV**: Import your data in CSV format for instant visualization.
- **Graph Types**: Choose between Bar, Line, and Pie charts for dynamic data representation.
- **Interactive Graphs**: Explore data interactively using **React Google Charts**.
- **Download Graphs**: Save the generated graphs as images in your local system.
- **Sample CSVs**: Download and test with pre-loaded sample CSV files.
- **Responsive Design**: Enjoy a seamless experience on all devices.

---

## 🚀 How to Use

### 1. Clone the Repository
```bash
git clone [https://github.com/ganesh42shrma/csv2graph](https://github.com/ganesh42shrma/csv2graph.git)
cd csv2graph
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
npm start
```

### 4. Access the Application
Open your browser and navigate to `http://localhost:3000`.

---

## 📂 Folder Structure

```
csv2graph/
├── node_modules/
├── public/
├── src/
│   ├── Assets/
│   │   └── herocharts.jpg
│   ├── Components/
│   │   ├── CsvStatsCard.js
│   │   ├── customButton.js
│   │   ├── Footer.js
│   │   └── Hero.js
│   ├── Helpers/
│   ├── Pages/
│   │   └── Graph.js
│   ├── Redux/
│   │   └── slices/
│   │       ├── toastSlice.js
│   │       └── store.js
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   ├── index.js
│   └── logo.svg
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tailwind.config.js
```

---

## 🛠️ Technology Stack

- **Frontend**: React.js
- **Charting Library**: React Google Charts
- **CSS**: Tailwind CSS

---

## 📸 Screenshots

### 1. Home Page
> Upload CSV files and view graphs instantly.

### 2. Graph Viewer
> Interactive bar, line, or pie charts with download options.

---

## 📥 Sample CSV Files

To help you get started quickly, we provide sample CSV files. Download the Sample CSV zip File, extract it, and upload the CSV file.

---

## 🤝 Contributions

Contributions are welcome! If you have ideas for improvement or new features, feel free to create a pull request or open an issue.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 🙌 Acknowledgments

- [React Google Charts](https://react-google-charts.com/) for enabling interactive data visualization.
- Tailwind CSS for seamless styling.

Enjoy converting your CSVs into visually stunning graphs! 🚀
