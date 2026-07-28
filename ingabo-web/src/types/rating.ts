export interface RatingInput {
  name: string;
  rating: number; // 1 to 5
  comment: string;
  role?: string;
  organization?: string;
}

export interface CitizenRating extends RatingInput {
  _id: string;
  isApproved: boolean;
  createdAt: string;
}
