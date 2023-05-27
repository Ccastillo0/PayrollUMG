export interface PayrollRequest {
    payrollId: Number
    employeeId: Number
    periodStart: Date
    periodEnd: Date
    totalEarned: Number
    totalDeducted: Number
    totalToPay: Number
}