import { Routes } from "@angular/router";
import { ListEmployees } from "./employees/list-employees/list-employees";
import { DetailEmployee } from "./employees/detail-employee/detail-employee";

export const routes: Routes = [
    {
        path: 'employee', children: [
            { path: 'all', component: ListEmployees },
            { path: ':action/:id', component: DetailEmployee }
        ]
    }

];