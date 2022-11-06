export default class UsersService {
  static readonly baseUrl = process.env.REACT_APP_API_URL;

  public static async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ token: string }> {
    const response = await fetch(UsersService.baseUrl + "users/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) return response.json();
    throw response;
  }
}
