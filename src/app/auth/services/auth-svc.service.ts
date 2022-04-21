import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthSvcService {

  constructor(public auth: AngularFireAuth) { }

  async login(email: string, pass: string) {
    return await this.auth.signInWithEmailAndPassword(email, pass);
  }

  async logout() {
    await this.auth.signOut();
  }
  async register(email: string, pass: string) {
    return await this.auth.createUserWithEmailAndPassword(email, pass);
  }

}
