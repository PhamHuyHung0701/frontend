export class TokenService{
    constructor() {
    }
    
    getToken(): string {
    const tokenData = localStorage.getItem('idToken')?.trim();
    if (tokenData) {
      return JSON.parse(tokenData);
    } else {
      return  '';
    }
    }
}