const buttonLabels = [
  'B',
  'A',
  'Y',
  'X',
  'L',
  'R',
  'ZL',
  'ZR',
  '−',
  '＋',
  'Left stick',
  'Right stick',
  '↑',
  '↓',
  '←',
  '→',
  'Home',
  'Capture',
];
export const gamepadApiPage = {
  content: `<section class="slide">
  <style>
    #gamepad-buttons, #gamepad-axes {
      display: flex;
      flex-wrap: wrap;
    }
    #gamepad-buttons div, #gamepad-axes div {
      display: inline-block;
      width: 3rem;
      height: 3rem;
      border-radius: 2rem;
      display: grid;
      place-items: center;
      margin: 0.5rem;
      background-color: #f8f8f8;
      box-shadow: 0.2rem 0.2rem 0.5rem -0.2rem rgba(0, 0, 0, 0.5), -0.2rem -0.2rem 0.5rem -0.2rem rgba(255, 255, 255, 0.5);
      font-weight: bold;
      color: #666;
    }
    #gamepad-buttons div.pushed {
      background-color: #a0a0a0;
      box-shadow: inset 0.2rem 0.2rem 0.5rem -0.2rem rgba(0, 0, 0, 0.5), inset -0.2rem -0.2rem 0.5rem -0.2rem rgba(255, 255, 255, 0.5);
    }
  </style>
  <h2>Gamepad API</h2>
  <div class="multi-column-container">
    <div>
      <p>Get a Gamepad object and access its buttons and axes.</p>
      <pre><code class="language-javascript">navigator.getGamepads()</code></pre>
    </div>
    <div class="demo">
      <div>Name: <span id="gamepad-name"></span></div>
      Buttons
      <div id="gamepad-buttons"></div>
      Axes
      <div id="gamepad-axes">
        <div id="l-stick">L</div>
        <div id="r-stick">R</div>
      </div>
    </div>
  </div>
  </section>`,
  onShow: () => {
    const gamepadName = document.getElementById('gamepad-name')!;
    const buttonsContainer = document.getElementById('gamepad-buttons')!;
    const lStick = document.getElementById('l-stick')!;
    const rStick = document.getElementById('r-stick')!;
    let buttonPressed = false;

    const update = () => {
      const gamepad = navigator.getGamepads()[0];
      requestAnimationFrame(update);
      if (!gamepad) {
        return;
      }

      // name display
      gamepadName.textContent = gamepad.id;
      // buttons display
      const buttons = gamepad.buttons
        .map((button, i) => `<div ${button.pressed ? 'class="pushed"' : ''}>${buttonLabels[i]}</div>`)
        .join('');
      buttonsContainer.innerHTML = buttons;
      // axes display
      const axes = gamepad.axes;
      lStick.style.transform = `translate(${axes[0] * 50}%, ${axes[1] * 50}%)`;
      rStick.style.transform = `translate(${axes[2] * 50}%, ${axes[3] * 50}%)`;
      // vibration
      const newButtonPressed = gamepad.buttons.some((button) => button.pressed);
      if (!buttonPressed && newButtonPressed) {
        console.log('Button pressed');
        gamepad.vibrationActuator.playEffect('dual-rumble', {
          duration: 80,
          strongMagnitude: 0.8,
          weakMagnitude: 1.0,
        });
      }
      buttonPressed = newButtonPressed;
    };
    update();
  },
};
