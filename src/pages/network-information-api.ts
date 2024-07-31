import type { PageDefinition } from '../types';

export const networkInformationAPI: PageDefinition = {
  content: `
<section class="slide">
  <h2>Network Information API</h2>
  <div class="multi-column-container">
    <pre><code class="language-javascript">navigator.connection</code></pre>
    <div class="demo">
      <pre class="demo-code" id="network-result" ></pre>
    </div>
  </div>
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
}

