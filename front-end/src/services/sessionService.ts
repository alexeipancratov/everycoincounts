export default class SessionService {
  public static storeSessionData(token: string, username: string) {
    localStorage.setItem("AUTH_TOKEN", token);
    localStorage.setItem("AUTH_USERNAME", username);
  }

  public static isAuthenticated(): boolean {
    return localStorage.getItem("AUTH_TOKEN") ? true : false;
  }

  public static getToken(): string | null {
    return localStorage.getItem("AUTH_TOKEN");
  }

  public static getUsername(): string | null {
    return localStorage.getItem("AUTH_USERNAME");
  }
}
