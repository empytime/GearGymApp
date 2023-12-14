import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/api_noticias';

@Component({
  selector: 'app-nutricion',
  templateUrl: './nutricion.page.html',
  styleUrls: ['./nutricion.page.scss'],
})
export class NutricionPage implements OnInit {
  newsArticles: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getNewsArticles();
  }

  getNewsArticles() {
    this.newsService.getSportsNews().subscribe(
      (response: any) => {
        
        this.newsArticles = response.articles;
      },
      (error) => {
        
        console.error('Error al obtener noticias:', error);
      }
    );
  }
  getFullImageUrl(relativeUrl: string): string {
    if (relativeUrl && !relativeUrl.startsWith('http')) {
      return `https:${relativeUrl}`;
    } else {
      
      return 'https://us.123rf.com/450wm/yoginta/yoginta2301/yoginta230100567/196853824-imagen-no-encontrada-ilustraci%C3%B3n-vectorial.jpg';
    }
  }
  handleImageError(event: any) {
    // Lógica para manejar errores de carga de imágenes
    console.error('Error al cargar la imagen:', event);
    // Puedes proporcionar una imagen de respaldo aquí si es necesario
  }
}