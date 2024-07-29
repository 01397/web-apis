import type { PageDefinition } from '../types';

export const deviceStatusAPIsPage: PageDefinition = {
  content: `
<section class="slide">
  <h2>Device status APIs</h2>
  <h3>Battery API</h3>
  <div class="multi-column-container">
    <div>
      <pre><code class="language-javascript">const battery = await navigator.getBattery();</code></pre>
    </div>
    <div class="demo">
      <pre class="demo-code" id="battery-result"></pre>
    </div>
  </div>
  <h3>Network Information API</h3>
   <div class="multi-column-container">
    <pre><code class="language-javascript">navigator.connection</code></pre>
    <div class="demo">
      <pre class="demo-code" id="network-result" ></pre>
    </div>
  </div>
</section>`,
  onShow: () => {
    getBattery();
    getNetworkInformation();
  },
};

const getBattery = async () => {
  // @ts-ignore
  const battery = await navigator.getBattery();

  document.getElementById('battery-result')!.innerHTML = `level: ${battery.level}
charging: ${battery.charging}
chargingTime: ${battery.chargingTime}
dischargingTime: ${battery.dischargingTime}
`;

}

const getNetworkInformation = () => {
  // @ts-ignore
  const connection = navigator.connection;

  document.getElementById('network-result')!.innerHTML = `effectiveType: ${connection.effectiveType}
downlink: ${connection.downlink}
rtt: ${connection.rtt}
saveData: ${connection.saveData}
`;
}

