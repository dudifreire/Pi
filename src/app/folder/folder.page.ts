import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormControl, FormGroup , Validators , FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { mustMatch, validarCelular, validarCpf } from '../core/Functions';






@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  isSubmitted = false;
  public tipoCategoria = false;
  public tipoAluno = false;
  public photo;
  public form: FormGroup;
  public formCategoria: FormGroup
  public colaboradores: any = [] 
  public alunos: any = []
  public CValue:String;
  constructor(
    private activatedRoute: ActivatedRoute,
    private menu: MenuController,
    public fb: FormBuilder,
    private http: HttpClient,
    private camera: Camera,
    private storage: Storage,
    public toastController: ToastController,
    ) { }

    setFormCategoria() {
      this.formCategoria = this.fb.group({
        nome: [null, [Validators.required]],
        descricao: [null, [Validators.required]],
        voluntario: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
  
      })
  
    }

    setTipoForm(Cvalue) {
      console.log(Cvalue);
      if(Cvalue == "aluno"){
        this.tipoAluno = true;
        this.tipoCategoria = false;
      }
      else{
        this.tipoCategoria = true;
        this.tipoAluno = false;
      }
    }
    
    
    setForm() {
      this.form = this.fb.group({
        categoria: [null,[ Validators.required]],
        nome: [null,[ Validators.required]],
        responsavel: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        foneAluno: [null],
        foneResponsavel: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        cep: [null,[ Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        rua: [null,[ Validators.required, Validators.minLength(4)]],
        numero: [null,[ Validators.required, Validators.minLength(1)]],
        bairro: [null, [Validators.required, Validators.minLength(3)]],
        cidade: [null, [Validators.required, Validators.minLength(3)]],
        uf: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
        date: [null,[ Validators.required]],
        presente : false
      },
        {
          validators: [
            validarCelular('foneResponsavel')
  
          ],
        }
      )
  
    }
    get forms() {
      return this.form.controls;
    }
  async submitForm(){

    this.isSubmitted = true;
    if (!this.form.valid) {
      alert('Por favor, preencher todos os campos corretamente');
      return false;
    } else {
      console.log(this.form.value);
      this.alunos.push(this.form.value);
      localStorage.setItem('cadastroAluno', JSON.stringify(this.alunos));
      this.form.reset();

      const toast = await this.toastController.create({
        message: 'Cadastro Salvo!',
        duration: 2000
      });

      toast.present();

    }


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

          })
        }
      });

  } 
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.menu.enable(true, 'main-menu');
    this.setForm();
    this.setFormCategoria()
    this.alunos = JSON.parse(localStorage.getItem('cadastroAluno'));
    
  }

}
