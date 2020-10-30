import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Folder3Page } from './folder3.page';

describe('Folder3Page', () => {
  let component: Folder3Page;
  let fixture: ComponentFixture<Folder3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Folder3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Folder3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
