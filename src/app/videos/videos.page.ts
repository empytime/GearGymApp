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

  loadYouTubeVideos(categoria: string) {
    
    const videoIdsMap: Map<string, string[]> = new Map([
      ['Categoría 1', ['2tXQbi16EdI', ]],
      ['Categoría 2', ['ZIm_qrJSOds', ]],
      
    ]);

    const videoIds = videoIdsMap.get(categoria) || [];
    
    const apiUrl = 'https://www.googleapis.com/youtube/v3/videos';
    const params = {
      key: 'AIzaSyD3vKSQWl21Vlp4CYyk0h10T2iezP7hd9c',
      part: 'snippet',
      id: videoIds.join(','),
    };

    fetch(`${apiUrl}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        this.videos = data.items;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
