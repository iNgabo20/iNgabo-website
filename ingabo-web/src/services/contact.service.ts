import apiClient from "../lib/axios";
import { ContactMessageInput, ContactMessage } from "../types/contact";
import { ApiResponse } from "../types/api";

export const contactService = {
  async submitMessage(data: ContactMessageInput): Promise<ApiResponse<ContactMessage>> {
    const message = { name: data.name, email: data.email, phone: data.phone, subject: data.subject, message: data.message };
    const response = await apiClient.post<ApiResponse<ContactMessage>>("/messages", message);
    return response.data;
  }
};
