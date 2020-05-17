import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGridActionComponent } from './user-grid-action.component';

describe('UserGridActionComponent', () => {
  let component: UserGridActionComponent;
  let fixture: ComponentFixture<UserGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
