export function postData(type, data) {
  let BaseURL = 'https://online-calendar-backend.herokuapp.com/';
  // let BaseURL = 'http://localhost:8080/online-calendar-backend/';
  // let BaseURL = 'http://localhost:8080/react-calendar/public/index.php';
  return new Promise((resolve, reject) => {
    fetch(BaseURL + '?type=' + type, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
