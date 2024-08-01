import './style.css';
import { coverPage } from './pages/cover';
import { mediaCaptureAndStreamsPage } from './pages/media-caputure-and-streams';
import { shapeDetectionApiPage } from './pages/shape-detection-api';
import { webAudioApiPage } from './pages/web-audio-api';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { gamepadApiPage } from './pages/gamepad-api';
import { batteryAPI } from './pages/battery-api';
import { networkInformationAPI } from './pages/network-information-api';
import { finishPage } from './pages/finish';

const app = document.querySelector<HTMLDivElement>('#app')!;
const pages = [
  coverPage,
  batteryAPI,
  networkInformationAPI,
  mediaCaptureAndStreamsPage,
  shapeDetectionApiPage,
  webAudioApiPage,
  gamepadApiPage,
  finishPage,
];
let currentPage = 0;

const showpage = (page: number) => {
  app.innerHTML = pages[page].content + `<div class="page-number">${page + 1}</div>`;
  app.querySelectorAll<HTMLElement>('pre code').forEach((element) => {
    hljs.highlightElement(element);
  });
  pages[page].onShow?.();
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    currentPage = Math.min(currentPage + 1, pages.length - 1);
  } else if (event.key === 'ArrowLeft') {
    currentPage = Math.max(currentPage - 1, 0);
  }
  showpage(currentPage);
});

showpage(currentPage);
