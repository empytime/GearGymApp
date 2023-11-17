import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';

if (environment.production) {
  enableProdMode();
}

const firebaseConfig = {
  apiKey: "AIzaSyBClBOuuEQXEgzNzPsuXTI8l_ZoC-RBpjU",
  authDomain: "bdgeargymapp.firebaseapp.com",
  projectId: "bdgeargymapp",
  storageBucket: "bdgeargymapp.appspot.com",
  messagingSenderId: "246255648011",
  appId: "1:246255648011:web:1156a8a1264773d4a2360e"
};

const app = initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
