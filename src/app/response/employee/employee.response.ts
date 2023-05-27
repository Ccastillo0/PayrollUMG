export interface Employee {
    employeeId: Number
    firstName: string
    lastName: string
    dpi: string
    dateOfBirth: string
    hireDate: string
    baseSalary: Number
    departmentId: Number
    positionId: Number
}

export interface EmployeeApi{
    data: any
    totalRecords: number
}
