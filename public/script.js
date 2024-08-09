const userVideo =document.getElementById('user-video');
const startButton = document.getElementById('start-btn');

const state = {media: null}
const socket=io();

startButton.addEventListener('click',  async() => {
  const mediaRecorder = new MediaRecorder(state.media,{
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 720000,
    framerate:25
  },() => {
    const rtmpKey = rtmpKeyInput.value.trim();
    if (rtmpKey) {
        socket.emit("rtmpKey", rtmpKey);
      
    } else {
        alert("Please enter a valid RTMP key.");
    }
});
  mediaRecorder.ondataavailable = async (ev) => {
    console.log("binary data", ev.data);
    socket.emit('binarystream', ev.data);
    }
    mediaRecorder.start(25);
});





window.addEventListener('load',async e=>{
    const media = await navigator 
    .mediaDevices.getUserMedia({audio: true,video: true});
    state.media = media;
    userVideo.srcObject = media;
})