import apiClient from "../lib/axios";
import { ContactMessageInput, ContactMessage } from "../types/contact";
import { ApiResponse } from "../types/api";

export const contactService = {
  async submitMessage(data: ContactMessageInput): Promise<ApiResponse<ContactMessage>> {
    const fullSubject = data.category && !data.subject.startsWith(`[${data.category}]`) 
      ? `[${data.category}] ${data.subject}` 
      : data.subject;

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || undefined,
      subject: fullSubject.trim(),
      message: data.message.trim(),
    };
    const response = await apiClient.post<ApiResponse<ContactMessage>>("/messages", payload);
    return response.data;
  },

  async subscribeNewsletter(email: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/messages/subscribe", { email: email.trim() });
    return response.data;
  }
};
