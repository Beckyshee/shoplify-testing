import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test for signup
  it('should signup', () => {
    const userDetails = {
      userName: 'user1',
      email: 'michealvenum007@gmail.com',
      phone_no: '1234567890',
      password: '123456',
      confirm_assword: '123456',
    };

    service.registerUser(userDetails).subscribe((res) => {
      expect(res).toEqual(userDetails);
    });

    const req = httpMock.expectOne('http://localhost:5400/user/register');
    expect(req.request.method).toBe('POST');
    req.flush(userDetails);
  });

  // test for login
  it('should login', async () => {
    const userLogin = {
      email: 'michealvenum007@gmail.com',
      password: '12345678',
    };

    service.login(userLogin).subscribe((res) => {
      expect(res).toEqual(userLogin);
    });

    const req = httpMock.expectOne('http://localhost:5400/user/login');
    expect(req.request.method).toBe('POST');
    req.flush(userLogin);
  });

  //reset password
  it('should reset password', () => {
    const passwordDetails = {
      email: 'becky@yopmail.com',
      newPassword: '12345678',
      token: '1234567',
    };

    service.resetPassword(passwordDetails).subscribe((res) => {
      expect(res).toEqual(passwordDetails);
    });

    const req = httpMock.expectOne('http://localhost:5400/user/resetPassword');
    expect(req.request.method).toBe('POST');
    req.flush(passwordDetails);
  });
});
