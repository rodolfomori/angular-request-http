import { ModalService } from './../../shared/modal.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { CursosService } from "../cursos.service";
import { Cursos2Service } from "../cursos2.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { switchMap, map } from "rxjs/operators";


@Component({
  selector: "app-cursos-form",
  templateUrl: "./cursos-form.component.html",
  styleUrls: ["./cursos-form.component.scss"]
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submmited: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursoService: Cursos2Service,
    private alert: ModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.route.params
    //   .pipe(
    //     map((params: any) => params.id),
    //     switchMap(id => this.cursoService.loadByID(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso));

    const curso = this.route.snapshot.data['curso']

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ]
      ]
    });
  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submmited = true;
    console.log(this.form.value);
    if (this.form.valid) {

      let msgSucess = 'Curso criado com sucesso'
      let msgError = 'Erro ao criar curso, tente novamente'

      if (this.form.value.id) {
        let msgSucess = 'Curso editado com sucesso'
        let msgError = 'Erro ao editar curso, tente novamente'
      }

      this.cursoService.save(this.form.value).subscribe(
        sucess => {
          this.alert.showAlertSuccess(msgSucess);
          this.location.back();
        },
        error => {
          this.alert.showAlertDanger(msgError)
        }
      )

      // if (this.form.value.id) {
      //   //update
      //   this.cursoService.update(this.form.value).subscribe(
      //     sucess => {
      //       this.alert.showAlertSuccess("Curso editado com sucesso");
      //       this.location.back();
      //     },
      //     error =>
      //       this.alert.showAlertDanger("Erro ao editar curso no banco de dados"),
      //     () => console.log("Editado com sucesso")
      //   );
      // }

      // else {
      //   //create
      //   this.cursoService.create(this.form.value).subscribe(
      //     sucess => {
      //       this.alert.showAlertSuccess("Curso inserido com sucesso");
      //       this.location.back();
      //     },
      //     error =>
      //       this.alert.showAlertDanger("Erro ao inserir curso no banco de dados"),
      //     () => console.log("Inserido no banco")
      //   );
      // }
    }
  }

  onCancel() {
    this.submmited = false;
    this.form.reset();
  }
}
