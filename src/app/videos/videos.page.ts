import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  categoria = 'Título de la Categoría';
  videos: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoria = params['categoria'];
      this.categoria = categoria;
      this.loadYouTubeVideos(categoria);
    });
  }

  async loadYouTubeVideos(categoria: string) {
    const apiUrl = 'https://www.googleapis.com/youtube/v3/videos';
    const videoIdsMap: Map<string, string[]> = new Map([
      ['Categoría 1', ['29iHvDf26Tg']],
      ['Categoría 2', ['fyctbKQgClY']],
      ['Categoría 3', ['In58AKwTero']],
    ]);

    const videoIds = videoIdsMap.get(categoria) || [];

    const params = {
      key: 'AIzaSyD3vKSQWl21Vlp4CYyk0h10T2iezP7hd9c', 
      part: 'snippet',
      id: videoIds.join(','), 
    };

    try {
      const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.videos = data.items;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
