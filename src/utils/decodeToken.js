// decodeToken.js
export function decodeToken(token) {
    try {
      // Nếu token là một đối tượng, lấy chuỗi token từ thuộc tính của đối tượng
      const tokenString = typeof token === 'string' ? token : token.token;
  
      const base64Url = tokenString.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
  
      const decodedToken = JSON.parse(jsonPayload);
      console.log(decodedToken);
      
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
      