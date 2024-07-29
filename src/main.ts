import './style.css';
import { coverPage } from './pages/cover';
import { deviceStatusAPIsPage } from './pages/device-status-apis';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
const pages = [coverPage, deviceStatusAPIsPage];
const currentPage = pages.length - 1;

const showpage = (page: number) => {
  app.innerHTML = pages[page].content;
  app.querySelectorAll<HTMLElement>('pre code').forEach((element) => {
    hljs.highlightElement(element);
  });
  pages[page].onShow?.();
};

showpage(currentPage);
