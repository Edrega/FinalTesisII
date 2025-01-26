import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { AppConfigurator } from './app.configurator';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../pages/auth/service/auth.service';
@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, MenuModule],
    template: ` 
    <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
        <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/">
            <img src="assets/icono.png" alt="logo" class="w-10 h-10" />
         
        </a>
    </div>

    <div class="layout-topbar-actions">
        <div class="layout-config-menu">
            <!-- Botón de Dark/Light Mode -->
            <button type="button" class="layout-topbar-action " (click)="toggleDarkMode()">
                <i [ngClass]="{ 'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
            </button>
        </div>
        <div class="layout-topbar-menu hidden lg:block">
            <div class="layout-topbar-menu-content">
                <button type="button" class="layout-topbar-action">
                    <i class="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" class="layout-topbar-action">
                    <i class="pi pi-inbox"></i>
                    <span>Messages</span>
                </button>
                <button type="button" class="layout-topbar-action">
                    <i class="pi pi-user"></i>
                    <span>Profile</span>
                </button>
            </div>
            <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
        <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/">
            <img src="assets/icono.png" alt="logo" class="w-12 h-12" />
        </a>
    </div>

    <div class="layout-topbar-actions">
        <div class="layout-config-menu">
            <!-- Botón de Dark/Light Mode -->
            <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                <i [ngClass]="{ 'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
            </button>
        </div>

        <!-- Menú desplegable -->
        <div class="layout-topbar-menu">
            <p-menu [model]="userMenuItems" popup="true" #menu></p-menu>
            <button type="button" class="layout-topbar-action" (click)="menu.toggle($event)">
                <i class="pi pi-user"></i>
            </button>
        </div>
    </div>
</div>

        </div>
    </div>
</div>
`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {
        this.initializeMenu();
    }

    private authService = inject(AuthService);
    userMenuItems: MenuItem[] = [];
    private router = inject(Router);
    initializeMenu() {
        this.userMenuItems = [
            { label: 'Profile', icon: 'pi pi-user', command: () => this.viewProfile() },
            { label: 'Settings', icon: 'pi pi-cog', command: () => this.openSettings() },
            { separator: true },
            { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
        ];
    }

    viewProfile() {
        // Navegar o mostrar detalles del perfil
        console.log('Ver perfil');
    }

    openSettings() {
        // Abrir configuración
        console.log('Abrir configuración');
    }

    logout() {
        this.authService.logout().then((res) => {
            if (res.error) {
                console.log(res.error);
            } else {
                this.router.navigate(['/auth/login']);
            }
        });
    }


    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
