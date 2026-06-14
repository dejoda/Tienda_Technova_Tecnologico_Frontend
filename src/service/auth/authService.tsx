import axios from "axios";
import { environment } from "../../environments/environment.development";
import type { ApiResponse } from "../common/index.model";

const BASE = environment.apiBaseUrl;

export const authService = {
  login: (username: string, password: string) =>
    axios.post<ApiResponse<{ token: string; user: any }>>(
      `${BASE}/auth/login`,
      { username, password }
    ),
};