import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Curso } from "./curso";
import { CrudService } from "./../shared/crud-service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
