import { routes } from './../app.routes';
import { Router, ActivatedRoute } from '@angular/router';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';
import { EMPTY, Observable, Subject } from 'rxjs';


class RouterStub {
  navigate(params) {

  }
}

class ActivatedRouteStub {

  private subject = new Subject();
  get params(){
    return this.subject.asObservable();
  }

  push(value){
    this.subject.next(value);
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect user to users page after saving', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });


  it('should navigate the user to navigate page when invalid user data is passed', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    let route : ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({id: 0});

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
