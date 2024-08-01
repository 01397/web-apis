import type { PageDefinition } from '../types';

export const networkInformationAPI: PageDefinition = {
  content: `
<section class="slide">
  <h2>Network Information API</h2>
  <div class="multi-column-container">
    <div>
      <p>Get device's network information.</p>
      <pre><code class="language-javascript">navigator.connection</code></pre>
    </div>
    <div class="demo">
      <pre class="demo-code" id="network-result" ></pre>
    </div>
  </div>
  <ul>
    <li><code>effectiveType</code>: One of the strings <code>4g</code>, <code>3g</code>, <code>2g</code>, or <code>slow-2g</code></li>
    <li><code>saveData</code>: <code>true</code> if the user has requested a reduced data usage mode</li>
  </ul>
</section>`,
  onShow: () => {
    getNetworkInformation();
  },
};

const getNetworkInformation = () => {
  // @ts-ignore
  const connection = navigator.connection;

  document.getElementById('network-result')!.innerHTML = `effectiveType: ${connection.effectiveType}
downlink: ${connection.downlink}
rtt: ${connection.rtt}
saveData: ${connection.saveData}
`;
};
