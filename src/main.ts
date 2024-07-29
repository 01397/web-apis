import './style.css';
import { coverPage } from './pages/cover';
import { deviceStatusAPIsPage } from './pages/device-status-apis';
import { mediaCaptureAndStreamsPage } from './pages/media-caputure-and-streams';
import { shapeDetectionApiPage } from './pages/shape-detection-api';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
const pages = [coverPage, deviceStatusAPIsPage, mediaCaptureAndStreamsPage, shapeDetectionApiPage];
let currentPage = pages.length - 1;

const showpage = (page: number) => {
  app.innerHTML = pages[page].content;
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
})

showpage(currentPage);
