import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { of } from 'rxjs';
import { ApiURL } from '../miscellaneous/api.template';
import { ApiService } from './api.service';
import { MessageService } from 'primeng/api';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        UserService, MessageService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });

    service = TestBed.inject(UserService);
  });

  it('should fetch users with correct headers', async () => {
    const mockUsers = [{ id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' }];
    apiServiceSpy.get.and.returnValue(of(mockUsers));

    await service.getUsers();

    const headersArg = apiServiceSpy.get.calls.mostRecent().args[1] as HttpHeaders;
    expect(headersArg.get('x-api-key')).toBe(environment.usersApiKey);
    expect(apiServiceSpy.get).toHaveBeenCalledWith('users', jasmine.any(HttpHeaders));
  });
});
