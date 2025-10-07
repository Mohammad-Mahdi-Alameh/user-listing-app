// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserListPageComponent } from './user-list-page.component';
// import { MessageService } from 'primeng/api';
// import { FormsModule } from '@angular/forms';
// import { of, throwError } from 'rxjs';

// import { By } from '@angular/platform-browser';
// import { UserService } from '../../../../core/services/user.service';
// import { CustomListComponent } from '../../../../shared/custom-list/custom-list.component';

// describe('UserListPageComponent', () => {
//   let component: UserListPageComponent;
//   let fixture: ComponentFixture<UserListPageComponent>;
//   let userServiceSpy: jasmine.SpyObj<UserService>;
//   let messageServiceSpy: jasmine.SpyObj<MessageService>;

//   beforeEach(async () => {
//     userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
//     messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

//     await TestBed.configureTestingModule({
//       declarations: [UserListPageComponent, CustomListComponent],
//       imports: [FormsModule],
//       providers: [
//         { provide: UserService, useValue: userServiceSpy },
//         { provide: MessageService, useValue: messageServiceSpy }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(UserListPageComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch users and pass them to CustomListComponent', async () => {
//     const mockUsers = [
//       { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com',avatar:'avatar-test' }
//     ];
//     userServiceSpy.getUsers.and.returnValue(Promise.resolve(mockUsers));

//     component.ngOnInit();
//     await fixture.whenStable();
//     fixture.detectChanges();

//     // Users array is set in the component
//     expect(component.users).toEqual(mockUsers);

//     // CustomListComponent receives users
//     const customListDebug = fixture.debugElement.query(By.directive(CustomListComponent));
//     const customListInstance = customListDebug.componentInstance as CustomListComponent;
//     expect(customListInstance.pagedEntityRecords).toEqual(mockUsers);
//   });

//   it('should handle API errors and show toast', async () => {
//     userServiceSpy.getUsers.and.returnValue(Promise.reject('API error'));

//     component.ngOnInit();
//     await fixture.whenStable();
//     fixture.detectChanges();

//     expect(messageServiceSpy.add).toHaveBeenCalledWith(jasmine.objectContaining({
//       severity: 'error'
//     }));
//   });

//   it('should sanitize search term to positive integers', () => {
//     component.searchTerm = 5;
//     expect(component.searchTerm).toBe(1);

//     component.searchTerm = 10;
//     expect(component.searchTerm).toBe(10);

//     // component.searchTerm = 'abc';
//     // component.sanitizeSearchTerm();
//     // expect(component.searchTerm).toBe(1);
//   });
// });
