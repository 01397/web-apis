import type { PageDefinition } from '../types';

export const historyAPIPage: PageDefinition = {
  content: `
<section class="slide">
  <h2>History API</h2>
  <div class="multi-column-container">
    <div>
      <p>Replace the current history entry.</p>
      <pre><code class="language-javascript">history.replaceState(state, '', '/page1');</code></pre>
    </div>
    <div class="demo">
      <button onclick="history.replaceState({ page: 1 }, 'Page 1', '/page1')">Replace state</button>
      <button id="button-animate">Replace state2</button>
    </div>
  </div>
</section>`,
  onShow: () => {
    document.getElementById('button-animate')!.addEventListener('click', () => {
      const text = 'hello-world.you-can-change-page-path-by-using-history-api     ';
      let i = 0;
      const interval = setInterval(() => {
        history.replaceState({ page: 1 }, '', text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
          const interval2 = setInterval(() => {
            history.replaceState({ page: 1 }, '', text.slice(0, i));
            i--;
            if (i < 0) {
              clearInterval(interval2);
              history.replaceState({ page: 1 }, '', '/');
            }
          }, 30);
        }
      }, 100);
    });
  },
};
