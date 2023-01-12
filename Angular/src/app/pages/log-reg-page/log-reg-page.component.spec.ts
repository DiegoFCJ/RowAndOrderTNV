import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegPageComponent } from './log-reg-page.component';

describe('LogRegPageComponent', () => {
  let component: LogRegPageComponent;
  let fixture: ComponentFixture<LogRegPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogRegPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogRegPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
