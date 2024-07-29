import './style.css'
import * as cover from './pages/cover'

const pages = [cover];
const currentPage = 0;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = pages[currentPage].content;
