export interface Orden {
    id_cliente: number;
    id_empresa: Number;
    fecha_inicio: string | Date | null;
    fecha_fin: string | Date | null; 
    id_operativa: number;
    id_sede: number;
    id_contractual: number;
    id_ejecucion: number;
    descripcion: string;
    responsable_tecnico: string;
    direccion: string;
    telefono_contacto: string;
  }

  export interface OrdenEdit {
    id: number;
    created_at: Date | string | null;
    id_cliente: number;
    id_empresa: Number;
    fecha_inicio: string | Date | null;
    fecha_fin: string | Date | null; 
    id_operativa: number;
    id_sede: number;
    id_contractual: number;
    id_ejecucion: number;
    descripcion: string;
    responsable_tecnico: string;
    direccion: string;
    telefono_contacto: string;
  }