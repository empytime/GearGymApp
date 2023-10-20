import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss']
})
export class VideosPage {
  categoria: string = ''; 

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.categoria = params['categoria'];
      
    });
  }
}