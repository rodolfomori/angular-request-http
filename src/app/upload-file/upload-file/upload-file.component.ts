import { Component, OnInit } from "@angular/core";
import { UploadFileService } from '../upload-file.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"]
})
export class UploadFileComponent implements OnInit {

  constructor(private uploadService: UploadFileService) { }

  files: Set<File>;

  ngOnInit() { }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    document.getElementById("customFileLabel").innerHTML =
      selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i])
    }
    document.getElementById("customFileLabel").innerHTML = fileNames.join(", ");
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService.upload(this.files, environment.BASE_URL + '/api/upload')
        .subscribe(response => {
          console.log('Upload concluído')
        })
    }
  }
}
