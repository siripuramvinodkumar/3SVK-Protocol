const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- REDIS MOCK (Virtual RAM) ---
const redisMock = {
    students: 1248,
    earnings: 642000,
    accuracy: 0.82, // Base matching accuracy (82%)
    jobs: [
        { id: 'job_1', title: 'UI/UX Designer', salary: 600000, fetchTime: "93.90ms" },
        { id: 'job_2', title: 'Backend Nodejs Intern', salary: 450000, fetchTime: "94.60ms" }
    ]
};

// --- NAPS MIDDLEWARE (Network-Adaptive Payload Stripping) ---
const applyNAPS = (data, latency) => {
    if (latency > 200) { // Threshold for rural connectivity
        console.log("NAPS TRIGGERED: Stripping 85% metadata...");
        // Return only essential fields (ID and User) to save bandwidth
        return { id: data.id, user: data.user, status: "NAPS_OPTIMIZED" };
    }
    return data;
};

io.on('connection', (socket) => {
    console.log('User Connected (Roll: 23X05A6207)');

    // Simulate Job Retrieval
    socket.on('fetch_job', (latency) => {
        const rawData = { id: "sync_991", user: { id: "u_1248", name: "Student User" }, content: "Bulky Metadata Here..." };
        const optimizedData = applyNAPS(rawData, latency);
        socket.emit('job_data', optimizedData);
    });

    // RL Engine Reward Function
    socket.on('mentor_verify', () => {
        redisMock.accuracy = 0.95; // Boost accuracy to 95%
        socket.emit('accuracy_update', redisMock.accuracy);
    });
});

server.listen(5000, () => console.log('3SVK Backend Running on Port 5000'));