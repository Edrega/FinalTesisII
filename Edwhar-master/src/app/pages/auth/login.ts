import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from './service/auth.service';

interface LoginForm {
    username: FormControl<string | null>;
    password: FormControl<string | null>;
}


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator,
        ReactiveFormsModule
    ],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                        <img src="assets/logo.jpg" alt="" class="w-13 h-13">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"></div>
                            <span class="text-muted-color font-medium">Iniciar Sesión</span>
                        </div>
                    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
                         <div>
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" formControlName="username" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" formControlName="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                            
                            <p-button label="Sign In" styleClass="w-full" type="submit"></p-button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    private formBuilder= inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    formGroup = this.formBuilder.group<LoginForm>({
        username: this.formBuilder.control(null, [Validators.required, Validators.email]),
        password: this.formBuilder.control(null, [Validators.required])
    })

    onSubmit() {
        if (this.formGroup.invalid) {
            return;
        }

        const { username, password } = this.formGroup.value;
        if (!username || !password) {
            return;
        }
        this.authService.login({ email: username,password  }).then(() => {
            this.router.navigate(['/']);
        });
    }
}
