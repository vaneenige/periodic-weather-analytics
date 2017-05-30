export default (callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './analytics');
  xhr.onload = () => {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.response));
    }
  };
  xhr.send();
};
