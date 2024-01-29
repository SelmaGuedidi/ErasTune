import { Component } from '@angular/core';

export interface AudioModel {
  volume: number;
  // other properties if needed
}

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.scss']
})
export class MusicplayerComponent {
  currentSongIndex: number = 0;
  isPlaying: boolean = false;
  audio!: HTMLAudioElement;
  isDragging = false;
  progress: number = 0;

  songSources: string[] = [
    'https://d24jd2l6qnq89g.cloudfront.net/USA/1950/856bfb54-9313-4c04-9376-12168f4e4fc2.mp3?Expires=1706130377359628&Key-Pair-Id=APKAJP5ZLPWNV42F3CCQ&Signature=R-qixwCWewAzidZf1~vm4BbysqBZRGjlaRxpo6Bm-LyXua7qdQ1N8F2gYqSOrCd8TXG5TMqYCx3FIw9kD~aMe8h61oC4zr6RM1kyvD-CV~PHGu4n90xXSx~6sPlzsqPK3n2zqd8XFsAWzoqWbDJMl6u1G06Ionc9dj8JfDTQgGKNz-M0~UMavHJMo0RniIS1LiELcVbyt1nmjExsKiCWzJbP1U6fLQoa~2Up5sDgz0Zeq4SF4LIvmVnRWr0tCo1LcMQTfLrACeGfndsrPr7K5snHrlH8OkPlOlWbFt4PkfiAdxpkTCjICX7zvn-Gzn08IrxPssA7pP0INAr4eRjNyw__',
    'https://d24jd2l6qnq89g.cloudfront.net/USA/1950/54b227ef-2428-4a8d-a7b6-53d34f05f952.mp3?Expires=1706130973627689&Key-Pair-Id=APKAJP5ZLPWNV42F3CCQ&Signature=YE54VKIqeYzHLOwcS4lTPrclpdo1J9TT55Pd0tPBdqUORtKwg19s2ewKJFBbAlUOTM78taxR6~m9e~D2UCXR3JkwpP8sLlXpkH67Q6m1aQTb64GVCVdG6-WofkNvTk2QRNJZWvV4bPbJeKf5rA5~Q6VAvJ290sruYOFoevvdEecaXTE9kn2P~1y3gHQSe6NlcONitJVYFum0oujCPrh35mSIewWj~NUV9gFaGzeLioF8P5WLFJmT0lMcDk6WPmOIZtBck1uPncOFAimYr7DTCGog-88cmZiYDgP76kmkj-wtYXsHr1DXVfdUYl07YeKnXruduSAcgv6yevM0-6t2hw__',
  ];

  songImages: string[] = [
    'https://asset.radiooooo.com/cover/USA/1950/medium/856bfb54-9313-4c04-9376-12168f4e4fc2.jpeg',
    'https://asset.radiooooo.com/cover/USA/1950/medium/54b227ef-2428-4a8d-a7b6-53d34f05f952.jpg',
  ];

  songDetails: { name: string, artist: string, album: string }[] = [
    { name: 'Mambo Italiano', artist: 'Dean Martin & The Rat Pack', album: 'Rakish & Rampant' },
    { name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
  ];

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src = this.songSources[this.currentSongIndex];
    this.audio.volume=0.5
    this.audio.addEventListener('timeupdate', () => {
      this.progress = (this.audio?.currentTime || 0) / (this.audio?.duration || 1) * 100;
      
    });
  }
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.updateProgress(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.updateProgress(event);
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  updateProgress(event: MouseEvent): void {
    const progressContainer = event.currentTarget as HTMLElement;
    const clickX = event.clientX - progressContainer.getBoundingClientRect().left;
    const containerWidth = progressContainer.clientWidth;

    const newPosition = (clickX / containerWidth) * 100;

    this.audio.currentTime = (newPosition / 100) * this.audio.duration;
    this.progress = newPosition;
  }
  
  updateVolume(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.audio.volume=parseInt(target.value) / 100;
    console.log(parseInt(target.value) / 100 )
   
  }

  playPause(): void {
    if (this.isPlaying) {
      this.audio?.pause();
    } else {
      this.audio?.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextSong(): void {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songSources.length;
    this.changeSong();
  }

  prevSong(): void {
    this.currentSongIndex = (this.currentSongIndex - 1 + this.songSources.length) % this.songSources.length;
    this.changeSong();
  }

  private changeSong(): void {
    this.audio.src = this.songSources[this.currentSongIndex];
    this.audio.load();
    if (this.isPlaying) {
      this.audio.play();
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }}
