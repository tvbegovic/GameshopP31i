import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, HostBinding } from '@angular/core';
import { UploadInput, UploadOutput, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor() { }

  _options: FileUploadOptions = new FileUploadOptions();

  @ViewChild('inp') inputControl!: ElementRef;
  @Input()
  cssClass!: string;

  @Input()
  public set options(v : FileUploadOptions) {
    this._options = v;
    //this.uploaderOptions.allowedContentTypes = v.allowedExtensions;
  }

  public get options() : FileUploadOptions {
    return this._options;
  }

  @Output()
  UploaderEvent = new EventEmitter<FileUploaderEventData>();

  uploaderOptions: UploaderOptions = {concurrency: 3};
  uploadInput = new EventEmitter<UploadInput>();
  tempUploadedFiles: any = {};

  ngOnInit(): void {
  }

  start() {
    this.inputControl.nativeElement.click();
  }

  onUploadOutput(output: UploadOutput) : void {
    const eventData = new FileUploaderEventData();
    eventData.file = new FileUploaderFile();
    if(output.file) {
      eventData.file.id = output.file.id;
      eventData.file.name = output.file.name;
    }
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      for(const fileId in this.tempUploadedFiles) {
        const event: UploadInput = {
          type: 'uploadFile',
          url: `${this.options.httpOptions.url}?${this.options.httpOptions.fileIdUrlParam}=${this.tempUploadedFiles[fileId].id}`,
          file: this.tempUploadedFiles[fileId],
          method: this.options.httpOptions.method,
          headers: this.options.httpOptions.headers
        };

        this.uploadInput.emit(event);
        eventData.type = FileUploaderEventType.AllAddedToQueue;
      }

    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      if(!this.options.multiple) {
        this.tempUploadedFiles = {};      }
      this.tempUploadedFiles[output.file.id] = output.file;
      eventData.type = FileUploaderEventType.AddedToQueue;
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      this.tempUploadedFiles[output.file.id] = output.file;
      eventData.progress =output.file.progress.data?.percentage;
      eventData.type = FileUploaderEventType.Uploading;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      eventData.type = FileUploaderEventType.Removed;
    } else if (output.type === 'dragOver') {
      eventData.type = FileUploaderEventType.DragOver;
    } else if (output.type === 'dragOut') {
      eventData.type = FileUploaderEventType.DragOut;
    } else if (output.type === 'drop' && typeof output.file !== 'undefined') {
      eventData.type = FileUploaderEventType.Drop;
    } else if (output.type === 'done') {

      eventData.type = FileUploaderEventType.Uploaded;

    }
    this.UploaderEvent.emit(eventData);
  }

}

export class FileUploadOptions {
  multiple = false;
  buttonText = 'Upload';
  buttonCss = 'btn btn-primary';
  httpOptions: FileUploaderHttpOptions = new FileUploaderHttpOptions();

}

export class FileUploaderEventData {
  type!: FileUploaderEventType;
  file!: FileUploaderFile;
  progress!: number | undefined;
}

export enum FileUploaderEventType {
  AllAddedToQueue,
  AddedToQueue,
  Uploading,
  DragOver,
  DragOut,
  Drop,
  Uploaded,
  Removed
}

export class FileUploaderFile {
  id!: string;
  name!: string;
}

export class FileUploaderHttpOptions {
  method = 'POST';
  url!: string;
  headers: any;
  fileIdUrlParam = 'id';
}
