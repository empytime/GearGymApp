import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  categoria = 'Título de la Categoría'; 
  videos: any[] = []; 

  ngOnInit() {
    this.loadYouTubeVideos();
  }

  loadYouTubeVideos() {
    
    const apiUrl = 'https://www.googleapis.com/youtube/v3/videos';
    const videoIds = ['2tXQbi16EdI', 'KrpKmehR--A', 'ZIm_qrJSOds', '8I463L8UaTI'];
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
}