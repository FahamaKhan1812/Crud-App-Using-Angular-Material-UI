import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmloyeeComponent } from './epmloyee.component';

describe('EpmloyeeComponent', () => {
  let component: EpmloyeeComponent;
  let fixture: ComponentFixture<EpmloyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpmloyeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpmloyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
