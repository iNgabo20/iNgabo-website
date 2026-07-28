export interface Partner {
  _id: string;
  name: string;
  type: "Government" | "Regulator" | "Telecom" | "Financial" | "Academic" | "International";
  logoUrl?: string;
  websiteUrl?: string;
  description: string;
  order?: number;
}
