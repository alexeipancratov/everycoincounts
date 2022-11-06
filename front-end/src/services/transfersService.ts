export default class TransfersService {
  static readonly baseUrl = process.env.REACT_APP_API_URL;

  private static getRequestInfo(token: string) {
    return {
      headers: new Headers({
        Authorization: `bearer ${token}`,
      }),
    };
  }

  public static async makeTransfer(request: {
    institution: string;
    recipient: string;
    amount: string;
    message: string;
  }): Promise<any> {
    const response = await fetch(TransfersService.baseUrl + "transfers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (response.ok) return response.json();
    throw response;
  }
}
