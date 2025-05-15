export interface CreateLegalProcess {
  name: string;
  type: string;
  status: string;
  cost: number;
  paymentStatus: string;
  startDate: string;
  endDate: string;
  clientUserId: number;
  lawyerUserId: number;
}
