import { Component } from '@angular/core';

import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'etmd-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  constructor(public employeeService: EmployeeService) { }

}
