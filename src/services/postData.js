export function postData(type, data) {
  let BaseURL = 'http://localhost:8080/react-calendar/public/index.php';
  return new Promise((resolve, reject) => {
    fetch(BaseURL + '?type=' + type, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      response.json().then((res) => {
        resolve(res);
      })
    }).catch((error) => {
      reject(error);
    });
  });
}
