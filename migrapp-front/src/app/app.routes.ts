import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AuditsComponent } from './audits/audits.component';
import { RolesComponent } from './roles/roles.component';
import { MetricsComponent } from './metrics/metrics.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { DetailsUserComponent } from './users/details-user/details-user.component';
import { LoginComponent } from './auth/login/login.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { MfaVerificationComponent } from './auth/mfa-verification/mfa-verification.component';


export const routes: Routes = [
    {
        path: "", component: LoginComponent
    },
    {
        path: "mfa-verification", component: MfaVerificationComponent
    },
    {
        path: "",
        component: MainlayoutComponent,
        children: [
            {path: "home", component: HomeComponent},
            {path: "users", component: UsersComponent},
            {path: "metrics", component: MetricsComponent},
            {path: "roles", component: RolesComponent},
            {path: "audits", component: AuditsComponent},
            {path: "users/new-user", component:NewUserComponent},
            {path: "users/details-user/:id", component:DetailsUserComponent},
            {path: "**", redirectTo: ""},
        ]
    },
];

