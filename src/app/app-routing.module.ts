import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { tr } from 'date-fns/locale';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { CustomLayoutAuthComponent } from './custom-layout-auth/custom-layout-auth.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CommonModule } from '@angular/common';


const childrenRoutes: VexRoutes = [
  {
    path: 'estadisticas',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'User',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'Allowance',
    loadChildren: () => import('./pages/allowance/allowance.module').then(m => m.AllowanceModule),
    data: {
      containerEnabled: true
    }
  },
  
  {
    path: 'Department',
    loadChildren: () => import('./pages/department/department.module').then(m => m.DepartmentModule),
    data: {
      containerEnabled: true
    }
    },

  
  {
    path: 'Position',
    loadChildren: () => import('./pages/position/position.module').then(m => m.PositionModule),
    data: {
      containerEnabled: true
    }
    },

  {
    path: 'Deduction',
    loadChildren: () => import('./pages/deduction/deduction.module').then(m => m.DeductionModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'Payroll',
    loadChildren: () => import('./pages/payroll/payroll.module').then(m => m.PayrollModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'Employee',
    loadChildren: () => import('./pages/employee/employee.module').then(m => m.EmployeeModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'PayrollDetail',
    loadChildren: () => import('./pages/payrolldetail/payrolldetail.module').then(m => m.PayrollDetailModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: 'PayrollAccounting',
    loadChildren: () => import('./pages/payrollaccounting/payrollaccounting.module').then(m => m.PayrollAccountingModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

const routes: VexRoutes = [
  {
    path: '',
    redirectTo: 'estadisticas',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      containerEnabled: true
    }
  },
  {
    path: '',
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}