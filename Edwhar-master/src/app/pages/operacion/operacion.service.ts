import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../shared/supabase.service';
import { Orden, OrdenEdit } from './types/orden.type';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  private _supabase = inject(SupabaseService);
  constructor() { }
  async getClientes() {
    return await this._supabase.supabase.from('CLIENTE').select('id,nombre');
  }
  async getEmpresas() {
    return await this._supabase.supabase.from('EMPRESA').select('id,nombre');
  }
  async getUnidadOperativa() {
    return await this._supabase.supabase.from('UNIDAD_OPERATIVA').select('id,nombre');
  }
  async getSedeEjecutor() {
    return await this._supabase.supabase.from('SEDE_EJECUTOR').select('id,nombre');
  }
 async getContractual() {
    return await this._supabase.supabase.from('CONTRACTUAL').select('id,nombre');
  }
  async getLugarEjecucion() {
    return await this._supabase.supabase.from('LUGAR_EJECUCION').select('id,nombre');
  }
  async insertOperacion(operacion: Orden ) {
    return await this._supabase.supabase.from('ORDEN_EJECUCION_SERVICIO').insert(operacion);
  }
  async getOperaciones(): Promise<any> {
      const response = await this._supabase.supabase.from('ORDEN_EJECUCION_SERVICIO').select('CLIENTE(id,nombre),EMPRESA(id,nombre),UNIDAD_OPERATIVA(id,nombre),SEDE_EJECUTOR(id,nombre),CONTRACTUAL(id,nombre),LUGAR_EJECUCION(id,nombre),fecha_inicio,fecha_fin,descripcion,responsable_tecnico,direccion,telefono_contacto,id');
      return response.data;
    }

  async deleteOperacion(id: number) {
    return await this._supabase.supabase.from('ORDEN_EJECUCION_SERVICIO').delete().eq('id', id);
  } 

  async updateOperacion(id: number, updatedData: OrdenEdit) {
    console.log(updatedData)    
    return await this._supabase.supabase.from('ORDEN_EJECUCION_SERVICIO').update(updatedData).eq('id', id);
  }
  async getOperacion(id: number) { 
    return await this._supabase.supabase.from('ORDEN_EJECUCION_SERVICIO').select('*').eq('id', id);
  } 
}
