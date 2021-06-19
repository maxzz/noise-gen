#### About

Noise generator with web worker and OffscreenCanvas. So far, only Chromium browsers.

Noise generator: XP10-525N (as "Experimental 21.05.25 Noise").

<!-- ![](src/assets/previews/2021-06-14_16-56-56.png) -->

<img src="src/assets/previews/2021-06-14_17-38-45.png" width="440px" />

#### Project roadmap

    [ ] Main controls
        [x] Allow user-specified seeds and random seeds.
        [x] Allow to generate ramdom preset (except the color).s
        [x] Noise generator sliders.
    [ ] Additional controls
        [ ] Select canvas color
        [x] Allow to change the background of the rendering canvas: bkack, white, and transparent.
        [x] Predefined image sizes (squere): 25%, 50%, 75%, 100%.
        [ ] Allow choose noise: noise2D, noise3D, noise4D.
        [x] Add current preset to presets.
        [x] Download image as PNG.
        [ ] Let the user choose the size of the generated texture.
    [ ] App controls
        [x] Set the currnent canvas image as the page background.
        [x] Allow to clear the page background from the canvas image.
    [ ] Features
        [x] Add persistance of the current generated parameters.
        [x] Persist the user defined presets.
        [ ] Add predefined presets (that exist always).
        [ ] Drag and Drop canvas image to the existing preset slot.
        [ ] Progress bar on slow reders.
        [ ] Create seamless textures using 4x4 algorithm.

#### Credits, References, Links

* This app was inspired by [@iamnottheway](https://twitter.com/iamnottheway) [noise generator](https://noiseisnice.com)
* [Background Patterns, Simplified by Conic Gradients](https://css-tricks.com/background-patterns-simplified-by-conic-gradients/)
* [Lea Verou - CSS3 Patterns Gallery](https://projects.verou.me/css3patterns/)
* [React cool dimensions](https://react-cool-dimensions.netlify.app/)
* [Sliders from Password Generator](codepen.io/maxzz/pen/LYZJmbb) [by Sikriti Dakua](https://codepen.io/dev_loop/pen/vYYxvbz)
