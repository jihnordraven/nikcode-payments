export const HelloPageTemplate = ({ HOST }: { HOST: string }): string => `
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * * The content below * * * * * * * * * * * -->
<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->
<!-- * * * * * * * * * * and can be replaced. * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * Delete the template below * * * * * * * * * * -->
<!-- * * * * * * * to get started with your project! * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->

<style>
  :host {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
  }

  p {
    margin: 0;
  }

  .spacer {
    flex: 1;
  }

  .toolbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #1976d2;
    color: white;
    font-weight: 600;
  }

  .toolbar img {
    margin: 0 16px;
  }

  .toolbar #twitter-logo {
    height: 40px;
    margin: 0 8px;
  }

  .toolbar #youtube-logo {
    height: 40px;
    margin: 0 16px;
  }

  .toolbar #twitter-logo:hover,
  .toolbar #youtube-logo:hover {
    opacity: 0.8;
  }

  .content {
    display: flex;
    margin: 82px auto 32px;
    padding: 0 16px;
    max-width: 960px;
    flex-direction: column;
    align-items: center;
  }

  svg.material-icons {
    height: 24px;
    width: auto;
  }

  svg.material-icons:not(:last-child) {
    margin-right: 8px;
  }

  .card svg.material-icons path {
    fill: #888;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 16px;
  }

  .card {
    all: unset;
    border-radius: 4px;
    border: 1px solid #eee;
    background-color: #fafafa;
    height: 40px;
    width: 200px;
    margin: 0 8px 16px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    line-height: 24px;
  }

  .card-container .card:not(:last-child) {
    margin-right: 0;
  }

  .card.card-small {
    height: 16px;
    width: 168px;
  }

  .card-container .card:not(.highlight-card) {
    cursor: pointer;
  }

  .card-container .card:not(.highlight-card):hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);
  }

  .card-container .card:not(.highlight-card):hover .material-icons path {
    fill: rgb(105, 103, 103);
  }

  .card.highlight-card {
    background-color: #1976d2;
    color: white;
    font-weight: 600;
    border: none;
    width: auto;
    min-width: 30%;
    position: relative;
  }

  .card.card.highlight-card span {
    margin-left: 60px;
  }

  svg#rocket {
    width: 80px;
    position: absolute;
    left: -10px;
    top: -24px;
  }

  svg#rocket-smoke {
    height: calc(100vh - 95px);
    position: absolute;
    top: 10px;
    right: 180px;
    z-index: -10;
  }

  a,
  a:visited,
  a:hover {
    color: #1976d2;
    text-decoration: none;
  }

  a:hover {
    color: #125699;
  }

  .terminal {
    position: relative;
    width: 80%;
    max-width: 600px;
    border-radius: 6px;
    padding-top: 45px;
    margin-top: 8px;
    overflow: hidden;
    background-color: rgb(15, 15, 16);
  }

  .terminal::before {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    background: rgb(58, 58, 58);
    color: #c2c3c4;
    width: 100%;
    font-size: 2rem;
    line-height: 0;
    padding: 14px 0;
    text-indent: 4px;
  }

  .terminal pre {
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
    color: white;
    padding: 0 1rem 1rem;
    margin: 0;
  }

  .circle-link {
    height: 40px;
    width: 40px;
    border-radius: 40px;
    margin: 8px;
    background-color: white;
    border: 1px solid #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: 1s ease-out;
  }

  .circle-link:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  }

  footer {
    margin-top: 8px;
    display: flex;
    align-items: center;
    line-height: 20px;
  }

  footer a {
    display: flex;
    align-items: center;
  }

  .github-star-badge {
    color: #24292e;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 3px 10px;
    border: 1px solid rgba(27,31,35,.2);
    border-radius: 3px;
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
    margin-left: 4px;
    font-weight: 600;
  }

  .github-star-badge:hover {
    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);
    border-color: rgba(27,31,35,.35);
    background-position: -.5em;
  }

  .github-star-badge .material-icons {
    height: 16px;
    width: 16px;
    margin-right: 4px;
  }

  svg#clouds {
    position: fixed;
    bottom: -160px;
    left: -230px;
    z-index: -10;
    width: 1920px;
  }

  /* Responsive Styles */
  @media screen and (max-width: 767px) {
    .card-container > *:not(.circle-link) ,
    .terminal {
      width: 100%;
    }

    .card:not(.highlight-card) {
      height: 16px;
      margin: 8px 0;
    }

    .card.highlight-card span {
      margin-left: 72px;
    }

    svg#rocket-smoke {
      right: 120px;
      transform: rotate(-5deg);
    }
  }

  @media screen and (max-width: 575px) {
    svg#rocket-smoke {
      display: none;
      visibility: hidden;
    }
  }
</style>

<div class="content" role="main">

  <!-- Highlight Card -->
  <div class="card highlight-card card-small">

    <svg id="rocket" xmlns="http://www.w3.org/2000/svg" width="101.678" height="101.678" viewBox="0 0 101.678 101.678">
      <title>Rocket Ship</title>
      <g id="Group_83" data-name="Group 83" transform="translate(-141 -696)">
        <circle id="Ellipse_8" data-name="Ellipse 8" cx="50.839" cy="50.839" r="50.839" transform="translate(141 696)" fill="#dd0031"/>
        <g id="Group_47" data-name="Group 47" transform="translate(165.185 720.185)">
          <path id="Path_33" data-name="Path 33" d="M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z" transform="translate(0.371 3.363)" fill="#fff"/>
          <path id="Path_34" data-name="Path 34" d="M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z" transform="translate(0 0.005)" fill="#fff"/>
        </g>
      </g>
    </svg>

    <span>NikCode payments app is running!</span>

    <svg id="rocket-smoke" xmlns="http://www.w3.org/2000/svg" width="516.119" height="1083.632" viewBox="0 0 516.119 1083.632">
      <title>Rocket Ship Smoke</title>
      <path id="Path_40" data-name="Path 40" d="M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z" transform="translate(-147.025 -140.939)" fill="#f5f5f5"/>
    </svg>

  </div>

  <div class="card-container">
  <button class="card card-small" (click)="selection.value = 'component'" tabindex="0">
    <a style="color: #001f3f" target="_blank" href="https://github.com/jihnordraven/nikcode-payments">Github repo</a>
  </button>

  <button class="card card-small" (click)="selection.value = 'component'" tabindex="0">
    <a style="color: #001f3f" target="_blank" href="${HOST}/api/v1/swagger">Go to swagger</a>
  </button>

  <button class="card card-small" (click)="selection.value = 'component'" tabindex="0">
    <a style="color: #001f3f" target="_blank" href="https://t.me/fa2pac">Telegram</a>
  </button>
</div>

  <svg id="clouds" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677">
    <title>Gray Clouds Background</title>
    <path id="Path_39" data-name="Path 39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" fill="#eee"/>
  </svg>

</div>

<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * * The content above * * * * * * * * * * * -->
<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->
<!-- * * * * * * * * * * and can be replaced. * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * End of Placeholder * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->

<router-outlet></router-outlet>

`
