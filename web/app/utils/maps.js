let loaded = false;

const loadMarkerClustererScript = (callback) => {
  const markerClustererScript = document.createElement('script');
  markerClustererScript.src = './app/assets/vendor/markerclusterer.js';
  markerClustererScript.onload = () => {
    callback();
  };
  document.querySelector('body').appendChild(markerClustererScript);
};

export default (callback) => {
  if (loaded) return;
  loaded = true;

  window.onGoogleMapsApiLoaded = () => {
    callback();
  };

  loadMarkerClustererScript(() => {
    const apiKey = '';
    const apiCallback = 'onGoogleMapsApiLoaded';
    const apiSource = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${apiCallback}`;

    const script = document.createElement('script');
    script.src = apiSource;
    document.querySelector('body').appendChild(script);
  });
};
