import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../shared/supabase.service';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase = inject(SupabaseService)
  constructor() { }

  

  async login(credneciales: SignInWithPasswordCredentials) {
    
    return  await this.supabase.supabase.auth.signInWithPassword(credneciales);
  }
  async logout() {
    return await this.supabase.supabase.auth.signOut();
  }
}
