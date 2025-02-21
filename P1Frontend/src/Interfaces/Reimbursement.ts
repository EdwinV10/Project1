import { User } from "./User";

export interface Reimbursement {
  reimbursementId: number;
  description: string;
  amount: number;
  status: string | null;
  user: User;
}