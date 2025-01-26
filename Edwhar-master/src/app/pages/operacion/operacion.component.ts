import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { OperacionService } from './operacion.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DialogModule } from 'primeng/dialog';
import { OrdenEdit } from './types/orden.type';
import { RouteConfigLoadEnd } from '@angular/router';

interface Cliente {
  id: number;
  nombre: string;
}
interface Empresa {
  id: number;
  nombre: string;
}
interface UnidadOperativa {
  id: number;
  nombre: string;
}
interface SedeEjecutor {
  id: number;
  nombre: string;
}
interface Contractual {
  id: number;
  nombre: string;
}
interface LugarEjecucion {
  id: number;
  nombre: string;
}

interface Orden {
  id: number;
  CLIENTE: Cliente;
  EMPRESA: Empresa;
  UNIDAD_OPERATIVA: UnidadOperativa;
  SEDE_EJECUTOR: SedeEjecutor;
  CONTRACTUAL: Contractual;
  LUGAR_EJECUCION: LugarEjecucion;
  fecha_inicio: Date;
  fecha_fin: Date;
  descripcion: string;
  responsable_tecnico: string;
  direccion: string;
  telefono_contacto: string;
}

@Component({
  selector: 'app-operacion',
  imports: [AccordionModule, DropdownModule, CommonModule, ReactiveFormsModule,
    FormsModule, DatePickerModule, InputTextModule, CalendarModule,
    TextareaModule, ButtonModule,
    TableModule,
    DialogModule
  ],
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.scss'
})
export class OperacionComponentm implements OnInit {
  selectCliente: Cliente = {
    id: 0,
    nombre: ''
  }
  clientes: Cliente[] = []
  private operacionService = inject(OperacionService)
  empresa: Empresa = {
    id: 0,
    nombre: ''
  }
  fechaInicio: Date = new Date()
  FechaFin: Date = new Date()
  responsableTecnico: string = ''
  empresas: Empresa[] = []
  unidadOperativa: UnidadOperativa = {
    id: 0,
    nombre: ''
  }
  ordenes: Orden[] = []
  unidadesOperativas: UnidadOperativa[] = []
  sedeEjecutor: SedeEjecutor = {
    id: 0,
    nombre: ''
  }
  sedesEjecutor: SedeEjecutor[] = []
  contractual: Contractual = {
    id: 0,
    nombre: ''
  }
  telefonoContacto: string = ''

  contractuales: Contractual[] = []
  lugarEjecucion: LugarEjecucion = {
    id: 0,
    nombre: ''
  }
  descripcion: string = ''
  lugarEjecuciones: LugarEjecucion[] = []

  ordenEdit: OrdenEdit = {
    id: 0,
    id_cliente: 0,
    id_empresa: 0,
    fecha_inicio: null,
    fecha_fin: null,
    id_operativa: 0,
    id_sede: 0,
    id_contractual: 0,
    id_ejecucion: 0,
    descripcion: '',
    responsable_tecnico: '',
    direccion: '',
    telefono_contacto: '',
    created_at: null
  }
  visible: boolean = false
  ngOnInit(): void {
    this.operacionService.getClientes().then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.clientes = res.data
      }
    })

    this.operacionService.getUnidadOperativa().then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.unidadesOperativas = res.data
      }
    })

    this.operacionService.getSedeEjecutor().then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.sedesEjecutor = res.data
      }
    })


    this.operacionService.getEmpresas().then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.empresas = res.data
      }
    })

    this.operacionService.getContractual().then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.contractuales = res.data
      }
    })

    this.operacionService.getLugarEjecucion().then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        this.lugarEjecuciones = res.data
      }
    })
    this.operacionService.getOperaciones().then((res) => {
      this.ordenes = res
    })
  }
  save() {
    if (this.selectCliente.id == 0 || this.empresa.id == 0 || this.unidadOperativa.id == 0 || this.sedeEjecutor.id == 0 || this.contractual.id == 0 || this.lugarEjecucion.id == 0) {
      alert('Todos los campos son obligatorios')
    }
    this.operacionService.insertOperacion({
      id_cliente: this.selectCliente.id,
      id_empresa: this.empresa.id,
      id_operativa: this.unidadOperativa.id,
      id_sede: this.sedeEjecutor.id,
      id_contractual: this.contractual.id,
      id_ejecucion: this.lugarEjecucion.id,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.FechaFin,
      descripcion: this.descripcion,
      responsable_tecnico: this.responsableTecnico,
      direccion: this.lugarEjecucion.nombre,
      telefono_contacto: this.telefonoContacto
    }).then((res) => {
      if (res.error) {

      } else {
        console.log(res.data)
        this.operacionService.getOperaciones().then((res) => {
          this.ordenes = res
        })
      }
    })

  }
  delete(id: number) {
    console.log(id)
    this.operacionService.deleteOperacion(id).then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        console.log(res.data)

        this.operacionService.getOperaciones().then((res) => {
          this.ordenes = res
        })
      }
    })
  }
  id: number = 0
  created_at: string | Date | null = ''
  edit() {
    this.ordenEdit = {
      id: this.id,
      created_at: this.created_at,
      id_cliente: this.selectCliente.id,
      id_empresa: this.empresa.id,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.FechaFin,
      id_operativa: this.unidadOperativa.id,
      id_sede: this.sedeEjecutor.id,
      id_contractual: this.contractual.id,
      id_ejecucion: this.lugarEjecucion.id,
      descripcion: this.descripcion,
      responsable_tecnico: this.responsableTecnico,
      direccion: this.sedeEjecutor.nombre,
      telefono_contacto: this.telefonoContacto
    }
    console.log(this.ordenEdit)
    this.operacionService.updateOperacion(this.ordenEdit.id, this.ordenEdit).then((res) => {
      if (res.error) {
        console.error("Error updating operación:", res.error);
      } else {
        console.log("Update successful:", res.data);

        // Actualizar la lista de operaciones tras la edición
        this.operacionService.getOperaciones().then((res) => {
          this.ordenes = res
        });
      }
    }).catch((err) => console.error(err))
  }
  editVisible(id: number) {
    console.log(id)
    this.operacionService.getOperacion(id).then((res) => {
      if (res.error) {
        console.log(res.error)
      } else {
        if (res.data.length == 0 || res.data == null || res.data == undefined) {
          console.log('Operacion no encontrada')
          return
        }
        this.empresa = this.empresas.find(e => e.id == res.data[0].id_empresa) as Empresa
        this.unidadOperativa = this.unidadesOperativas.find(e => e.id == res.data[0].id_operativa) as UnidadOperativa
        this.sedeEjecutor = this.sedesEjecutor.find(e => e.id == res.data[0].id_sede) as SedeEjecutor
        this.contractual = this.contractuales.find(e => e.id == res.data[0].id_contractual) as Contractual
        this.lugarEjecucion = this.lugarEjecuciones.find(e => e.id == res.data[0].id_ejecucion) as LugarEjecucion
        this.selectCliente = this.clientes.find(e => e.id == res.data[0].id_cliente) as Cliente
        this.id = res.data[0].id
        this.fechaInicio = new Date(res.data[0].fecha_inicio)
        this.FechaFin = new Date(res.data[0].fecha_fin)
        this.descripcion = res.data[0].descripcion
        this.responsableTecnico = res.data[0].responsable_tecnico
        this.telefonoContacto = res.data[0].telefono_contacto
        this.created_at = res.data[0].created_at

        console.log(this.ordenEdit)
      }
    })
    this.visible = true
  }
  generatePDF(orden: Orden) {
    const doc = new jsPDF();
    console.log(orden)
    // Título del reporte
    doc.text('Reporte de Operaciones', 10, 10);

    // Generar tabla con 2 columnas: Nominación y Detalle
    autoTable(doc, {
      startY: 30, // Posición donde empieza la tabla
      head: [['Nominación', 'Detalle']],
      body: [
        ['Cliente', orden.CLIENTE.nombre],
        ['Unidad Operativa', orden.UNIDAD_OPERATIVA.nombre],
        ['Sede Ejecutora', orden.SEDE_EJECUTOR.nombre],
        ['Contractual', orden.CONTRACTUAL.nombre],
        ['Lugar Ejecución', orden.LUGAR_EJECUCION.nombre],
        ['Descripción', orden.descripcion],
        ['Responsable Técnico', orden.responsable_tecnico],
        ['Teléfono Contacto', orden.telefono_contacto]
      ]
    });

    // Guardar el PDF
    doc.save('listado-ordenes-ejecucion.pdf');

  }
}
