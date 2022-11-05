import Institution from "../models/institution";

export default class InstitutionsService {
  static readonly baseUrl = process.env.REACT_APP_API_URL;

  private static getRequestInfo(token: string) {
    return {
      headers: new Headers({
        Authorization: `bearer ${token}`,
      }),
    };
  }

  public static async getAll(): Promise<Institution[]> {
    const response = await fetch(InstitutionsService.baseUrl + "institutions");
    if (response.ok) return response.json();
    throw response;
  }

  public static async getOne(id: string): Promise<Institution> {
    const response = await fetch(InstitutionsService.baseUrl + `institutions/${id}`);
    if (response.ok) return response.json();
    throw response;
  }
}
