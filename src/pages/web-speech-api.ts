import { getStream } from '../util/usermedia';

export const webAudioApiPage = {
  content: `
<section class="slide">
  <h2>Web Audio API</h2>
  <div class="multi-column-container">
    <div>
      <p>Create a source and an analyser.</p>
      <pre><code class="language-javascript">const source = audioContext.createMediaStreamSource(stream);
const analyser = audioContext.createAnalyser();</code></pre>
      <p>Connect them.</p>
      <pre><code class="language-javascript">source.connect(analyser);
analyser.connect(audioContext.destination);</code></pre>
      <img src="web-audio.gif" alt="Audio visualizer" style="width: 100%;">
    </div>
    <div class="demo">
    <canvas width="1024" height="512"></canvas>
    </div>
  </div>
</section>`,
  onShow: async () => {
    const audioContext = new AudioContext();
    const stream = await getStream();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    const canvas = document.querySelector('canvas')!;
    const canvasContext = canvas.getContext('2d')!;
    const draw = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      dataArray.forEach((value, index) => {
        canvasContext.fillStyle = `hsl(${256 - value} 80% 40%)`;
        canvasContext.fillRect(index * 4, canvas.height * (1 - value / 256), 2, canvas.height);
      });
      requestAnimationFrame(draw);
    };
    draw();

    source.connect(analyser);
    analyser.connect(audioContext.destination);
  },
};
