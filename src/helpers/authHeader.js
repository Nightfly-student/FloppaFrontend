export function authHeader() {
    var token = JSON.parse(localStorage.getItem("token"));
  
    if (token && token.access_token) {
      return { Authorization: token.access_token };
    } else {
      return {};
    }
}

export function getUserId() {
  return JSON.parse(localStorage.getItem("user")).id;
}

export function getUserName() {
  return JSON.parse(localStorage.getItem("user")).firstname;
}