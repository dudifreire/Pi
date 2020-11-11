import { ModalController } from '@ionic/angular';
import { HelperService } from './../../services/helper.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionsService } from 'src/app/services/functions.service';
import { HttpClient } from '@angular/common/http';
import { mustMatch, validarCelular, validarCpf } from '../../core/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-voluntario',
  templateUrl: './cadastro-voluntario.component.html',
  styleUrls: ['./cadastro-voluntario.component.scss'],
})
export class CadastroVoluntarioComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private functionsService: FunctionsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private helperS: HelperService,
    private modalCtlr: ModalController
  ) { }
  setForm() {
    this.form = this.fb.group({
      categoria: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: [null, [Validators.email, Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(6)]],
      fone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rua: [null, [Validators.required, Validators.minLength(4)]],
      numero: [null, [Validators.required, Validators.minLength(1)]],
      bairro: [null, [Validators.required, Validators.minLength(3)]],
      cidade: [null, [Validators.required, Validators.minLength(3)]],
      uf: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      date: [null, [Validators.required]],
      aprovado: false,
    },
      {
        validators: [
          mustMatch('senha', 'confirmarSenha'),
          validarCpf('cpf'),
          validarCelular('fone')

        ],
      }
    );

  }
  get forms() {
    return this.form.controls;
  }

  getCep() {

    this.http.get('https://viacep.com.br/ws/' + this.form.value.cep + '/json/?callback=')
      .subscribe((result: any) => {
        console.log(result);
        if (result.erro === true) {
          alert('CEP invalido!');
        }
        else {
          this.form.patchValue({
            rua: result.logradouro,
            bairro: result.bairro,
            cidade: result.localidade,
            uf: result.uf

          });
        }
      });

  }
  ngOnInit() {
    this.setForm();
  }
  submit() {
    console.log(this.form.value);
    localStorage.setItem('cadastroVoluntario', JSON.stringify(this.form.value));
    this.form.reset();
    this.router.navigateByUrl('/login');
    this.helperS.toast(
      'Dados enviados com sucesso! Será realizada uma validação manual do seu cadastro...'
    );
    this.modalCtlr.dismiss({
      dismissed: true
    });
  }


}
