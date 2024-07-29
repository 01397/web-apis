import './style.css';
import { coverPage } from './pages/cover';

const pages = [coverPage];
const currentPage = 0;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = pages[currentPage].content;
