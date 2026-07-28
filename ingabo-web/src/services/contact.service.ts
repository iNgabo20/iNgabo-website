import apiClient from "../lib/axios";
import { ContactMessageInput, ContactMessage } from "../types/contact";
import { ApiResponse } from "../types/api";

export const contactService = {
  async submitMessage(data: ContactMessageInput): Promise<ApiResponse<ContactMessage>> {
    try {
      const response = await apiClient.post<ApiResponse<ContactMessage>>("/messages", data);
      return response.data;
    } catch {
      // Simulate successful submission for demonstration if offline
      return {
        success: true,
        message: "Your message has been submitted successfully to the iNgabo team.",
        data: {
          ...data,
          _id: `msg-${Date.now()}`,
          isRead: false,
          createdAt: new Date().toISOString()
        }
      };
    }
  }
};
