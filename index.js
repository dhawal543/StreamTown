import http, { Server } from "http";
import express from "express";
import path from "path";
import { Server as SocketIO } from "socket.io";
import { spawn } from "child_process";

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.static(path.resolve('./public')));

let ffmpegProcess;

// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Listen for the RTMP key from the client
    socket.on("rtmpKey", (rtmpKey) => {
        console.log("RTMP Key received:", rtmpKey);

        // Define the ffmpeg options using the received RTMP key
        const options = [
            "-i",
            "-",
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-tune", "zerolatency",
            "-r", `${25}`,
            "-g", `${25 * 2}`,
            "-keyint_min", 25,
            "-crf", "25",
            "-pix_fmt", "yuv420p",
            "-sc_threshold", "0",
            "-profile:v", "main",
            "-level", "3.1",
            "-c:a", "aac",
            "-b:a", "128k",
            "-ar", 128000 / 4,
            "-f", "flv",
            `rtmp://a.rtmp.youtube.com/live2/${rtmpKey}`,
        ];

        // Spawn the ffmpeg process with the new options
        ffmpegProcess = spawn("ffmpeg", options);

        ffmpegProcess.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });

        ffmpegProcess.stdout.on("close", (code) => {
            console.log(`ffmpeg process exited with code ${code}`);
        });
    });

    // Handle incoming binary stream data
    socket.on("binarystream", (stream) => {
        console.log("Binary stream incoming");
        if (ffmpegProcess) {
            ffmpegProcess.stdin.write(stream, (err) => {
                if (err) {
                    console.log("Error writing to ffmpeg stdin:", err);
                }
            });
        }
    });

    // Clean up when the socket disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (ffmpegProcess) {
            ffmpegProcess.stdin.end();
            ffmpegProcess.kill();
        }
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));
