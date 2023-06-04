import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IconsService } from '@shared/services/icons.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  inputType = "password";
  visible = false;
  forgotPasswordClicked = false;
  forgotPasswordMessage = '';

  icVisibility = IconsService.prototype.getIcon("icVisibility");
  icVisibilityOff = IconsService.prototype.getIcon("icVisibilityOff");

  initForm(): void {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|\:;"'<>,.?/]).{8,}$/;
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
      this.alertService.warn('Atención', 'Contraseña incorrecta. Por favor, verifícala.');
      return;
    }

    this.authService.login(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this.alertService.success('Inicio de sesión Exitoso', '');
        this.router.navigate(['/']);
      }
    });
  }

  toggleVisibility(): void {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  forgotPassword(): void {
    this.forgotPasswordClicked = true;
    this.forgotPasswordMessage =
      'Para poder Restablecer tu Password debes comunicarte al correo de soporte nominaumg@gmail.com';
  }
}
