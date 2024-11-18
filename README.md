# FactorBoard
A GenAI solution making whiteboards better than ever. Factorio is an AI based whiteboard that helps web users to unleash the power of Notes APP on iPads. This whiteboard app recognises what the user draws and gives the required output to the user.

### Taking Help From

- Whiteboard Implementation: https://dev.to/fidalmathew/building-a-collaborative-whiteboard-app-using-reactjs-socketio-and-nodejs-2o71

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Prototype Video](#prototype-video)
- [License](#license)

## Project Overview

### Key Features
- **AI-Driven Handwriting Recognition**: Converts user-drawn text and diagrams into machine-readable formats.  
- **Real-Time Output Generation**: Processes handwritten input and generates relevant outputs instantly.  
- **Interactive User Interface**: Provides a user-friendly whiteboard environment for seamless interaction.  
- **Multi-Device Compatibility**: Accessible on various platforms, enabling easy collaboration and usage across devices.

### Technologies Used
- **React:** Frontend framework for building the user interface.
- **Python & FastAPI:** For GeminiAPI integration and fine tuning on Gemini model.
- **Axios:** HTTP client for making API requests.
- **Tailwind CSS & shadcn:** Utility-first CSS framework and components for building a responsive and consistent UI.

## Installation

### Clone the Repository

```bash
git clone https://github.com/krishnaGauss/FactorBoard.git
```
### Install Dependencies

- Install Frontend Dependencies:
In project root directory;

```bash
cd frontend
npm i
```

- Install Backend Dependencies:
In project root directory;

```bash
cd backend
python -m venv myenv
myenv/Scripts/activate
pip install -r requirements.txt
```

### Creating `.env` files 
- In `frontend` directory setup a `.env` file with the following attributes;
```text
VITE_API_URL = <Your VITE_API_URL>/Backend Server URL
```
- In `backend` directory setup a `.env` file with the following attributes;
```text
GEMINI_API_KEY=<YOUR KEY>
```

## Running the Application

### Running Frontend 

In root directory; 
```bash
cd frontend
npm run dev
```
### Running Backend 

In root directory; 
```bash
cd backend
myenv/Scripts/activate
python main.py
```

## Prototype Video

![Prototype Video](/frontend/public/proto.mp4)


## License

MIT License

Copyright (c) `2024` `Krishna Goswami`

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
