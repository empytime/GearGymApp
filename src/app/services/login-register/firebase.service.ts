import { Injectable } from '@angular/core';
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  addEvent(event: any) {
    throw new Error('Method not implemented.');
  }
  getEvents() {
    throw new Error('Method not implemented.');
  }
  private auth: Auth;

  constructor() {
    this.auth = getAuth();
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}

