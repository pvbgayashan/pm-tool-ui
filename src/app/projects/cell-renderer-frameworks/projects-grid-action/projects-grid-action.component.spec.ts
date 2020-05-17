import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsGridActionComponent } from './projects-grid-action.component';

describe('ProjectsGridActionComponent', () => {
  let component: ProjectsGridActionComponent;
  let fixture: ComponentFixture<ProjectsGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
