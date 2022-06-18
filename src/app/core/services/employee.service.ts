import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] = [
    {
        id: 1,
        name: 'Daryl Sweeney',
        title: 'Chief Executive Officer',
        phone: '(555) 924-9726',
        hireDate: new Date('2019-01-15')
    },
    {
        id: 2,
        name: 'Guy Wooten',
        title: 'Chief Technical Officer',
        phone: '(438) 738-4935',
        managerId: 1,
        hireDate: new Date('2019-02-19')
    },
    {
        id: 32,
        name: 'Buffy Weber',
        title: 'VP, Engineering',
        phone: '(699) 838-6121',
        managerId: 2,
        hireDate: new Date('2019-04-13')
    },
    {
        id: 11,
        name: 'Hyacinth Hood',
        title: 'Team Lead',
        phone: '(889) 345-2438',
        managerId: 32,
        hireDate: new Date('2018-01-17')
    },
    {
        id: 60,
        name: 'Akeem Carr',
        title: 'Junior Software Developer',
        phone: '(738) 136-2814',
        managerId: 11,
        hireDate: new Date('2018-01-18')
    },
    {
        id: 78,
        name: 'Rinah Simon',
        title: 'Software Developer',
        phone: '(285) 912-5271',
        managerId: 11,
        hireDate: new Date('2018-03-17')
    },
    {
        id: 42,
        name: 'Gage Daniels',
        title: 'Software Architect',
        phone: '(107) 290-6260',
        managerId: 32,
        hireDate: new Date('2019-03-14')
    },
    {
        id: 43,
        name: 'Constance Vazquez',
        title: 'Director, Engineering',
        phone: '(800) 301-1978',
        managerId: 32,
        hireDate: new Date('2018-03-18')
    },
    {
        id: 46,
        name: 'Darrel Solis',
        title: 'Team Lead',
        phone: '(327) 977-0216',
        managerId: 43,
        hireDate: new Date('2019-04-15')
    },
    {
        id: 47,
        name: 'Brian Yang',
        title: 'Senior Software Developer',
        phone: '(565) 146-5435',
        managerId: 46,
        hireDate: new Date('2019-02-21')
    },
    {
        id: 50,
        name: 'Lillian Bradshaw',
        title: 'Software Developer',
        phone: '(323) 509-3479',
        managerId: 46,
        hireDate: new Date('2019-05-23')
    },
    {
        id: 51,
        name: 'Christian Palmer',
        title: 'Technical Lead',
        phone: '(490) 421-8718',
        managerId: 46,
        hireDate: new Date('2019-04-16')
    },
    {
        id: 55,
        name: 'Summer Mosley',
        title: 'QA Engineer',
        phone: '(784) 962-2301',
        managerId: 46,
        hireDate: new Date('2019-09-21')
    },
    {
        id: 56,
        name: 'Barry Ayers',
        title: 'Software Developer',
        phone: '(452) 373-9227',
        managerId: 46,
        hireDate: new Date('2018-04-16')
    },
    {
        id: 59,
        name: 'Keiko Espinoza',
        title: 'Junior QA Engineer',
        phone: '(226) 600-5305',
        managerId: 46,
        hireDate: new Date('2018-01-22')
    },
    {
        id: 61,
        name: 'Candace Pickett',
        title: 'Support Officer',
        phone: '(120) 117-7475',
        managerId: 46,
        hireDate: new Date('2018-09-18')
    },
    {
        id: 63,
        name: 'Mia Caldwell',
        title: 'Team Lead',
        phone: '(848) 636-6470',
        managerId: 43,
        hireDate: new Date('2018-07-17')
    },
    {
        id: 65,
        name: 'Thomas Terry',
        title: 'Senior Enterprise Support Officer',
        phone: '(764) 831-4248',
        managerId: 63,
        hireDate: new Date('2018-07-14')
    },
    {
        id: 67,
        name: 'Ruth Downs',
        title: 'Senior Software Developer',
        phone: '(138) 991-1440',
        managerId: 63,
        hireDate: new Date('2018-08-14')
    },
    {
        id: 70,
        name: 'Yasir Wilder',
        title: 'Senior QA Engineer',
        phone: '(759) 701-8665',
        managerId: 63,
        hireDate: new Date('2019-08-17')
    },
    {
        id: 71,
        name: 'Flavia Short',
        title: 'Support Officer',
        phone: '(370) 133-9238',
        managerId: 63,
        hireDate: new Date('2018-06-15')
    },
    {
        id: 74,
        name: 'Aaron Roach',
        title: 'Junior Software Developer',
        phone: '(958) 717-9230',
        managerId: 63,
        hireDate: new Date('2018-09-18')
    },
    {
        id: 75,
        name: 'Eric Russell',
        title: 'Software Developer',
        phone: '(516) 575-8505',
        managerId: 63,
        hireDate: new Date('2019-09-13')
    },
    {
        id: 76,
        name: 'Cheyenne Olson',
        title: 'Software Developer',
        phone: '(241) 645-0257',
        managerId: 63,
        hireDate: new Date('2018-09-18')
    },
    {
        id: 77,
        name: 'Shaine Avila',
        title: 'UI Designer',
        phone: '(844) 435-1360',
        managerId: 63,
        hireDate: new Date('2018-01-22')
    },
    {
        id: 81,
        name: 'Chantale Long',
        title: 'Senior QA Engineer',
        phone: '(252) 419-6891',
        managerId: 63,
        hireDate: new Date('2018-09-14')
    },
    {
        id: 83,
        name: 'Dane Cruz',
        title: 'Junior Software Developer',
        phone: '(946) 701-6165',
        managerId: 63,
        hireDate: new Date('2019-03-15')
    },
    {
        id: 84,
        name: 'Regan Patterson',
        title: 'Technical Writer',
        phone: '(265) 946-1765',
        managerId: 63,
        hireDate: new Date('2019-05-17')
    },
    {
        id: 85,
        name: 'Drew Mckay',
        title: 'Senior Software Developer',
        phone: '(327) 293-0162',
        managerId: 63,
        hireDate: new Date('2019-05-21')
    },
    {
        id: 88,
        name: 'Bevis Miller',
        title: 'Senior Software Developer',
        phone: '(525) 557-0169',
        managerId: 63,
        hireDate: new Date('2018-08-15')
    },
    {
        id: 89,
        name: 'Bruce Mccarty',
        title: 'Support Officer',
        phone: '(936) 777-8730',
        managerId: 63,
        hireDate: new Date('2019-10-21')
    },
    {
        id: 90,
        name: 'Ocean Blair',
        title: 'Team Lead',
        phone: '(343) 586-6614',
        managerId: 43,
        hireDate: new Date('2018-06-20')
    },
    {
        id: 91,
        name: 'Guinevere Osborn',
        title: 'Software Developer',
        phone: '(424) 741-0006',
        managerId: 90,
        hireDate: new Date('2019-06-17')
    },
    {
        id: 92,
        name: 'Olga Strong',
        title: 'Graphic Designer',
        phone: '(949) 417-1168',
        managerId: 90,
        hireDate: new Date('2018-06-15')
    },
    {
        id: 93,
        name: 'Robert Orr',
        title: 'Support Officer',
        phone: '(977) 341-3721',
        managerId: 90,
        hireDate: new Date('2018-06-22')
    },
    {
        id: 95,
        name: 'Odette Sears',
        title: 'Senior Software Developer',
        phone: '(264) 818-6576',
        managerId: 90,
        hireDate: new Date('2019-05-20')
    },
    {
        id: 45,
        name: 'Zelda Medina',
        title: 'QA Architect',
        phone: '(563) 359-6023',
        managerId: 32,
        hireDate: new Date('2018-08-16')
    },
    {
        id: 3,
        name: 'Priscilla Frank',
        title: 'Chief Product Officer',
        phone: '(217) 280-5300',
        managerId: 1,
        hireDate: new Date('2019-04-22')
    },
    {
        id: 4,
        name: 'Ursula Holmes',
        title: 'EVP, Product Strategy',
        phone: '(370) 983-8796',
        managerId: 3,
        hireDate: new Date('2018-01-15')
    },
    {
        id: 24,
        name: 'Melvin Carrillo',
        title: 'Director, Developer Relations',
        phone: '(344) 496-9555',
        managerId: 3,
        hireDate: new Date('2018-01-17')
    },
    {
        id: 29,
        name: 'Martha Chavez',
        title: 'Developer Advocate',
        phone: '(140) 772-7509',
        managerId: 24,
        hireDate: new Date('2018-05-14')
    },
    {
        id: 30,
        name: 'Oren Fox',
        title: 'Developer Advocate',
        phone: '(714) 284-2408',
        managerId: 24,
        hireDate: new Date('2018-07-19')
    },
    {
        id: 41,
        name: 'Amos Barr',
        title: 'Developer Advocate',
        phone: '(996) 587-8405',
        managerId: 24,
        hireDate: new Date('2019-01-16')
    }
  ];

  public getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }
}
