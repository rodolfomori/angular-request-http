import { AlertModalComponent } from "./../../shared/alert-modal/alert-modal.component";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Curso } from "./../curso";
import { Component, OnInit, ViewChild } from "@angular/core";
// import { CursosService } from "../cursos.service";
import { Cursos2Service } from "../cursos2.service";
import { Observable, empty, Subject, EMPTY } from "rxjs";
import { catchError, take, switchMap } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { ModalService } from "src/app/shared/modal.service";

@Component({
  selector: "app-cursos-lista",
  templateUrl: "./cursos-lista.component.html",
  styleUrls: ["./cursos-lista.component.scss"]
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];
  deleteModalRef: BsModalRef;
  @ViewChild("deleteModal", { static: true }) deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado: Curso;

  constructor(
    private modalService: BsModalService,
    private service: Cursos2Service,
    private alertService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }

  bsModalRef: BsModalRef;

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        // this.$error.next(true);
        this.handlerError();
        return EMPTY;
      })
    );
  }

  onEdit(id) {
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Tem certeza que deseja deletar?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result => (result ? this.service.remove(curso.id) : EMPTY))
      )
      .subscribe(
        //SÓ É EXECUTADO SE O RESULT FOR VERDADEIRO!
        sucess => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger("Erro ao remover curso");
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      sucess => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger("Erro ao remover curso");
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handlerError() {
    this.alertService.showAlertDanger("Erro ao carregar cursos");
  }
}
