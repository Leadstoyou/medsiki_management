import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFileReportComponent } from './select-file-report.component';

describe('SelectFileReportComponent', () => {
  let component: SelectFileReportComponent;
  let fixture: ComponentFixture<SelectFileReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFileReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
