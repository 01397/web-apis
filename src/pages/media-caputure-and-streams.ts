import type { PageDefinition } from '../types';
import { getStream, setConstraints, stopStream } from '../util/usermedia';

export const mediaCaptureAndStreamsPage: PageDefinition = {
  content: `
<section class="slide">
  <h2>Media Capture and Streams</h2>
  <div class="multi-column-container">
    <div>
      <p>Get a MediaStream and attach it to a video element.</p>
      <pre><code class="language-javascript">const stream = await navigator.mediaDevices.getUserMedia(constraints);
videoElement.srcObject = stream</code></pre>
      <img src="video-streaming.gif" alt="Video streaming" style="width: 100%; max-width: 30rem;">
    </div>
    <div class="demo">
      <video id="video" autoplay playsinline></video>
      <select id="camera"></select>
      <select id="microphone"></select>
      <button id="start">Start</button>
      <button id="stop">Stop</button>
    </div>
  </div>
</section>`,
  onShow: () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    const camera = document.getElementById('camera') as HTMLSelectElement;
    const microphone = document.getElementById('microphone') as HTMLSelectElement;
    const startButton = document.getElementById('start') as HTMLButtonElement;
    const stopButton = document.getElementById('stop') as HTMLButtonElement;

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          const option = document.createElement('option');
          option.text = device.label || `Camera ${camera.options.length + 1}`;
          option.value = device.deviceId;
          camera.add(option);
        } else if (device.kind === 'audioinput') {
          const option = document.createElement('option');
          option.text = device.label || `Microphone ${microphone.options.length + 1}`;
          option.value = device.deviceId;
          microphone.add(option);
        }
      });
    });

    startButton.onclick = async () => {
      setConstraints({
        video: { deviceId: camera.value ? { exact: camera.value } : undefined },
        audio: { deviceId: microphone.value ? { exact: microphone.value } : undefined },
      });
      video.srcObject = await getStream();
    };

    stopButton.onclick = async () => {
      stopStream();
      video.srcObject = null;
    };
  },
};
