// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserDetailsPageComponent } from './user-details-page.component';
// import { MessageService } from 'primeng/api';
// import { of, throwError } from 'rxjs';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { UserService } from '../../../../core/services/user.service';

// describe('UserDetailsPageComponent', () => {
//   let component: UserDetailsPageComponent;
//   let fixture: ComponentFixture<UserDetailsPageComponent>;
//   let userServiceSpy: jasmine.SpyObj<UserService>;
//   let messageServiceSpy: jasmine.SpyObj<MessageService>;

//   beforeEach(async () => {
//     userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
//     messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

//     await TestBed.configureTestingModule({
//       declarations: [UserDetailsPageComponent],
//       imports: [ProgressSpinnerModule],
//       providers: [
//         { provide: UserService, useValue: userServiceSpy },
//         { provide: MessageService, useValue: messageServiceSpy }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(UserDetailsPageComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch user details and hide loading', async () => {
//     const mockUser = { id: 1, first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com',avatar:'test-avatar' };
//     userServiceSpy.getUserById.and.returnValue(Promise.resolve(mockUser));

//     component.ngOnInit();
//     expect(component.loading).toBeTrue();

//     await fixture.whenStable();
//     fixture.detectChanges();

//     expect(component.user).toEqual(mockUser);
//     expect(component.loading).toBeFalse();
//   });

//   it('should handle API errors and show toast', async () => {
//     userServiceSpy.getUserById.and.returnValue(Promise.reject('API error'));

//     component.ngOnInit();
//     await fixture.whenStable();
//     fixture.detectChanges();

//     expect(messageServiceSpy.add).toHaveBeenCalledWith(jasmine.objectContaining({
//       severity: 'error'
//     }));
//     expect(component.loading).toBeFalse();
//   });
// });
