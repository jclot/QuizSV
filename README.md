<div align="center">
  <h1>QuizSV</h1>

  [![Status](https://img.shields.io/badge/Status-Legacy_/_Archived-red)](#)
  [![Framework](https://img.shields.io/badge/Framework-Electron-blue)](#)
  [![Language](https://img.shields.io/badge/Language-JavaScript-yellow)](#)
  [![License](https://img.shields.io/badge/License-MIT-lightgrey)](#)

  <p>Remote Assessment Monitoring and Academic Integrity Verification System.</p>
</div>

---

## Overview

**QuizSV** is a desktop application developed using the Electron framework. Conceived during the global shift to virtual education amidst the COVID-19 pandemic, the software was designed to address the challenges of maintaining academic integrity during remote examinations and evaluations.

The application functions as an automated proctoring tool. It continuously captures both screen activity and microphone audio during an assessment. To prevent cheating and unauthorized collaboration, the system incorporates algorithmic verification checks. The output data is encrypted to ensure tamper resistance, requiring specific decryption protocols by the evaluator to review the integrity report and verify the student's behavior.

---

## Core Features

* **Continuous Screen and Audio Capture:** Seamlessly records the desktop environment and ambient audio to monitor the assessment session.
* **Algorithmic Anomaly Detection:** Processes the captured data through a smart verification system to detect potential academic misconduct, unauthorized assistance, or copying.
* **Encrypted Verification:** Secures the recorded media and behavioral logs using encryption. Evaluators must decrypt the final package to access the integrity results, preventing manipulation by the user.
* **Cross-Platform Compatibility:** Built on Electron, allowing the application to be packaged and run on major desktop operating systems (Windows, macOS, Linux).

---

## Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Electron |
| **Runtime Environment** | Node.js |
| **Frontend UI** | HTML5, CSS3, Vanilla JavaScript |
| **Media Capture** | Desktop Capturer API / WebRTC |

---

## Historical Context and Status

This repository is considered a **legacy project**. It was developed as a direct response to the immediate needs of remote education during the pandemic lockdowns. While the core concepts of encrypted recording and algorithmic verification remain valid, the repository is currently archived and is not actively maintained for modern production environments.

---

## Installation and Execution (For Developers)

To run this legacy application locally, ensure you have Node.js installed on your system. 

### 1. Clone the Repository

```bash
git clone [https://github.com/jclot/QuizSV.git](https://github.com/jclot/QuizSV.git)
cd QuizSV
```

### 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

### 3. Run the Application

Launch the Electron application in development mode:

```bash
npm start
```

### 4. Build for Production

To package the application for distribution, you can use Electron Forge or Electron Builder (ensure the respective build scripts are configured in the `package.json`):

```bash
npm run make
```

---

## License and Authorship

**Author:** Julián Clot Córdoba ([jclot](https://github.com/jclot))

This project is distributed under the MIT License. Please refer to the `LICENSE` file in the repository root for full terms and conditions.
