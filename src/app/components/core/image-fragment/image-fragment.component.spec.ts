import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFragmentComponent } from './image-fragment.component';

describe('ImageFragmentComponent', () => {
  let component: ImageFragmentComponent;
  let fixture: ComponentFixture<ImageFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageFragmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
