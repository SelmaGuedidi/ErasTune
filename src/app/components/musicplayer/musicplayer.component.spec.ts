import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicplayerComponent } from './musicplayer.component';

describe('MusicplayerComponent', () => {
  let component: MusicplayerComponent;
  let fixture: ComponentFixture<MusicplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicplayerComponent]
    });
    fixture = TestBed.createComponent(MusicplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
