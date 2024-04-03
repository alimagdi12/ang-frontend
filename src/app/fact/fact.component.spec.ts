import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactComponent } from './fact.component';

describe('FactComponent', () => {
  let component: FactComponent;
  let fixture: ComponentFixture<FactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
