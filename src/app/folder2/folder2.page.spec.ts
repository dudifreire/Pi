import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Folder2Page } from './folder2.page';

describe('Folder2Page', () => {
  let component: Folder2Page;
  let fixture: ComponentFixture<Folder2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Folder2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Folder2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
