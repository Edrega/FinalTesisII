import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'OPERACIONES',
                items: [
                    {
                        label: 'Ejecucion de Servicio',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/app/ejecucion']
                    },
                    {
                        label: 'Infraestructura',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/infraestructura']
                    }
                ]
            },
            {
                label: 'MANTENIMIENTO',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/mantenimiento'],
                items: [
                ]
            },
            {
                label: 'RECURSOS HUMANOS',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Asistencia de Personal',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/ personal']
                    },
              
                ]
            },
            {
                label: 'CONTABILIDAD Y FINANZAS',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Activos Fijos',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/ activos']
                    },
                    {
                        label: 'Solicitud de Efectivo',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/ solicitud']
                    }
                ] 
            }
        ];
    }
}
