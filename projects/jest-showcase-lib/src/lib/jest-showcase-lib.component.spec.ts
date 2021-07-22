import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JestShowcaseLibComponent } from './jest-showcase-lib.component';

describe('JestShowcaseLibComponent', () => {
  let component: JestShowcaseLibComponent;
  let fixture: ComponentFixture<JestShowcaseLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JestShowcaseLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JestShowcaseLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
