import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ejecucion-servicio',
  imports: [AccordionModule,  TableModule,ButtonModule,CardModule, RouterLink],
  templateUrl: './ejecucion-servicio.component.html',
  styleUrl: './ejecucion-servicio.component.scss'
})
export class EjecucionServicioComponent {

}
