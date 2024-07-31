import type { PageDefinition } from '../types';

export const batteryAPI: PageDefinition = {
  content: `
<section class="slide">
  <h2>Battery API</h2>
  <div class="multi-column-container">
    <div>
      <pre><code class="language-javascript">const battery = await navigator.getBattery();</code></pre>
    </div>
    <div class="demo">
      <pre class="demo-code" id="battery-result"></pre>
    </div>
  </div>
</section>`,
  onShow: () => {
    getBattery();
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
