import apiClient from "../lib/axios";
import { TeamMember } from "../types/member";
import { ApiResponse } from "../types/api";
export const memberService = { async getMembers(): Promise<TeamMember[]> { const response = await apiClient.get<ApiResponse<TeamMember[]>>("/members"); return response.data.data; } };
