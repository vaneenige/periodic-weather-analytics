const page = (offset, total, slice, filter) => `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <title>Periodic Weather Analytics</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

    <meta name="description" content="A high performance Progressive Web App providing an overview of information from Periodic Weather.">
    <meta name="author" content="Colin van Eenige">

    <!-- iOS touch icon -->
    <link rel="apple-touch-icon" href="./app/assets/touch/PWA_touch.png">

    <!-- Favicon -->
    <link rel="icon" href="./app/assets/favicon.ico?v=1">

    <!-- Web Application Manifest -->
    <link rel="manifest" href="./manifest.json">

    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">

    <!-- Color the status bar on mobile devices -->
    <meta name="theme-color" content="#EC407A">

    <link rel="stylesheet" href="./app/build/style.css"/>  
  </head>

  <body>
    <div class="no-js-shell">
      <div id="toolbar" class="sticky">
        Periodic Weather Analytics
        <form action="./" method="POST">
          <input type="text" placeholder="Search..." name="search"/>
          ${filter !== false ? `<a href="./">Reset filter: "${filter}"</a>` : ''}
        </form>
        <a href="${offset + 2}" class="${(((offset + 1) * 20 >= total) || filter !== false) && 'disabled'}">
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
          </svg>
        </a>
        <a href="${(offset === 1) ? './' : (offset)}" class="${((offset === 0) || filter !== false) && 'disabled'}">
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
          </svg>
        </a>
      </div>
      <ul id="list">
        ${slice.map(({ name, temp, description }) => `
          <li class="item">
            <div class="item-content">
              <div class="item-title">${name}</div>
              <div class="item-subtitle">${temp}℃, ${description}</div>
            </div>
          </li>
        `).join('\n')}
      </ul>
    </div>

    <script>
      document.querySelector('.no-js-shell').outerHTML = ''; 
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js', { scope: './' });
    </script>
    <script src="./app/build/bundle.js"></script>
  </body>

  </html>
`;

module.exports = page;
