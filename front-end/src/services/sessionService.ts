export default class SessionService {
  public static storeToken(token: string) {
    localStorage.setItem("AUTH_TOKEN", token);
  }

  public static isAuthenticated(): boolean {
    return localStorage.getItem("AUTH_TOKEN") ? true : false;
  }

  public static getToken(): string | null {
    return localStorage.getItem("AUTH_TOKEN");
  }
}
