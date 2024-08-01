import type { PageDefinition } from '../types';
import { getStream } from '../util/usermedia';

export const shapeDetectionApiPage: PageDefinition = {
  content: `
<section class="slide">
  <h2>Shape Detection API</h2>
  <div class="multi-column-container">
    <div>
      <p>Detect faces, barcodes, and text in images.</p>
      <pre><code class="language-javascript">const barcodes = await barcodeDetector.detect(video);
const url = barcodes[0].rawValue;</code></pre>
    </div>
    <div class="demo">
      <div class="video-container" style="position:relative">
        <video id="video" autoplay playsinline></video>
        <canvas id="canvas" style="position:absolute;left:0;top:0;"></canvas>
      </div>
      <pre id="results"></pre>
    </div>
  </div>
</section>`,
  onShow: async () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    const stream = await getStream();
    video.srcObject = stream;
    const results = document.getElementById('results') as HTMLUListElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
    // @ts-ignore
    const barcodeDetector = new BarcodeDetector();

    const detectBarcode = async () => {
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.style.width = `${video.videoWidth}px`;
        canvas.style.height = `${video.videoHeight}px`;
        console.log('canvas resized');
      }
      const barcodes = await barcodeDetector.detect(video);
      results.innerHTML = barcodes
        .map(
          // @ts-ignore
          (barcode) => `rawValue: ${barcode.rawValue}
format: ${barcode.format}`
        )
        .join('');
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (const barcode of barcodes) {
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 4;
        context.moveTo(barcode.cornerPoints[0].x, barcode.cornerPoints[0].y);
        for (let i = 1; i < barcode.cornerPoints.length; i++) {
          context.lineTo(barcode.cornerPoints[i].x, barcode.cornerPoints[i].y);
        }
        context.lineTo(barcode.cornerPoints[0].x, barcode.cornerPoints[0].y);
        context.stroke();
      }
      requestAnimationFrame(detectBarcode);
    };
    video.addEventListener('play', detectBarcode);
  },
};
