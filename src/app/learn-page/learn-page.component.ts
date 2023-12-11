import { Component, ViewChild } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-learnpage',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss']
})
export class LearnPageComponent {
    videoId = "YGoJUTpEF6Y";
    @ViewChild(YouTubePlayerModule) player: YouTubePlayerModule | undefined;
    
    savePlayer(player: YouTubePlayerModule) {
      this.player = player;
      console.log('Player Instance', player);
    }
  
    onStateChange(event: { data: any }) {
      console.log('Player State', event.data);
    }
}
