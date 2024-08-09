# StreamTown - Online Streaming Web App

## Overview

StreamTown is an online streaming web application designed to enable users to stream video content directly to platforms like YouTube using the RTMP (Real-Time Messaging Protocol) with the power of FFmpeg. The app allows users to broadcast their video and audio streams in real time from their web browser.

## Features

- **Live Video Streaming:** Stream your webcam feed directly to platforms that support RTMP.
- **Custom RTMP Key Input:** Users can input their RTMP keys to stream to different channels or platforms.
- **WebSocket Integration:** Uses WebSocket to handle real-time communication between the client and server for efficient video streaming.
- **FFmpeg Integration:** Utilizes FFmpeg to process and stream the video content to the specified RTMP server.
- **Simple UI:** A minimalistic user interface that focuses on ease of use, making it accessible to all users.

## Getting Started

### Prerequisites

- **Node.js:** Ensure that Node.js is installed on your system.
- **Docker:** Docker is used to containerize the application.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repository/streamtown.git
   cd streamtown
   ```

2. **Build the Docker Image:**

   ```bash
   docker build -t streamtown .
   ```

3. **Run the Docker Container:**

   ```bash
   docker run -p 3000:3000 streamtown
   ```

4. **Access the Application:**

   Open your web browser and go to `http://localhost:3000`.

### Usage

1. **Enter RTMP Key:** In the input field provided, enter the RTMP key of the platform where you want to stream.

2. **Start Streaming:** Click the "Start" button to begin streaming. The application will use the webcam feed and stream it to the specified RTMP server.

3. **Stop Streaming:** Closing the browser window or stopping the server will stop the streaming.

### Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Real-Time Communication:** Socket.IO
- **Media Processing:** FFmpeg
- **Containerization:** Docker

### Code Structure

- **`index.js`**: The main server-side script that handles HTTP requests, WebSocket connections, and FFmpeg processes.
- **`script.js`**: The client-side script that handles media capture, WebSocket communication, and streaming.
- **`index.html`**: The main HTML file that provides the user interface.
- **`Dockerfile`**: The Dockerfile to containerize the application and run it in a consistent environment.

### Contributing

We welcome contributions to StreamTown! If you have suggestions for new features, or have found a bug, feel free to create an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

### Author

Dhawal Dixit

---

StreamTown is designed to be a simple, easy-to-use tool for anyone looking to stream video content online. We hope you find it useful!
