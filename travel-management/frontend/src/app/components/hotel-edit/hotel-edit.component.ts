import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CreateHotel, CreatePicture } from '../../models/requests';
import { catchError, lastValueFrom } from 'rxjs';
import { Hotel } from '../../models/hotel';
import { Tag } from '../../models/tag';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-hotel-edit',
  standalone: true,
  imports: [MultiSelectModule, FormsModule, EditorModule, InputMaskModule, FileUploadModule, CommonModule, ContextMenuModule, DropdownModule],
  templateUrl: './hotel-edit.component.html',
  styleUrl: './hotel-edit.component.css'
})

export class HotelEditComponent implements OnInit, OnChanges {

  @Input()
  editorMode!: string | undefined;

  hotels!: Hotel[];
  hotel!: Hotel;

  tags!: Tag[];
  selectedTags!: Tag[];
  description: string | undefined;
  images = new Array<any>();
  pictures = new Array<CreatePicture>();
  actions: MenuItem[] | undefined;
  hotelname!: string;
  street!: string;
  state!: string;
  land!: string;

  constructor(private httpClient: HttpClient) {

  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => {
        this.images.push(reader.result);
        this.pictures.push({ id: 0, description: "", payload: reader.result as string });
      };

      reader.readAsDataURL(file);
    }
  }

  delete(index: number) {
    if (index > -1) {
      this.images.splice(index, 1);
      this.pictures.splice(index, 1);
    }
  }

  submit() {
    if (this.editorMode == "New") {
      let createHotel: CreateHotel = {
        description: this.description as string, hotelname: this.hotelname,
        land: this.land, pictures: this.pictures, state: this.state, street: this.street,
        tagids: this.selectedTags, vendorid: 0, vendorname: "asdf"
      };
      lastValueFrom(this.httpClient.post(environment.HotelAPI + "hotels", createHotel)).then((e) => { this.clear(); console.log(e); }).catch((e) => console.log(e))
    }
    if (this.editorMode == "Edit") {
      let UpdateHotel: Hotel = {
        description: this.description as string, hotelname: this.hotelname,
        land: this.land, pictures: this.pictures, state: this.state, street: this.street,
        tags: this.selectedTags, vendorid: 0, vendorname: "asdf", id: this.hotel.id, travels: this.hotel.travels
      };
      lastValueFrom(this.httpClient.put(environment.HotelAPI + "hotels/" + this.hotel.id, UpdateHotel))
        .then((res) => {
          if (res) {
            let tmp = (res as Hotel);
            this.hotel.description = tmp.description;
            this.hotel.hotelname = tmp.hotelname;
            this.hotel.id = tmp.id;
            this.hotel.land = tmp.land;
            this.hotel.pictures = tmp.pictures;
            this.hotel.state = tmp.state;
            this.hotel.street = tmp.street;
            this.hotel.tags = tmp.tags;
            this.hotel.vendorid = tmp.vendorid;
            this.hotel.vendorname = tmp.vendorname;
            this.hotel.travels = tmp.travels;

            this.loadSettings();
          }
        }).catch((e) => console.log(e))
    }
  }


  clear() {
    lastValueFrom(this.httpClient.get(environment.HotelAPI + "tags")).then(res => {
      if (res)
        this.tags = (res as Tag[]);
    })
    this.selectedTags = new Array();
    this.description = "";
    this.images = new Array<any>();
    this.pictures = new Array<CreatePicture>();
    this.hotelname = "";
    this.street = "";
    this.state = "";
    this.land = "";

  }

  setup() {
    lastValueFrom(this.httpClient.get(environment.HotelAPI + "tags")).then((res) => {
      if (res)
        this.tags = (res as Tag[]);
    })

    lastValueFrom(this.httpClient.get(environment.HotelAPI + "hotels")).then((res) => {
      if (res)
        this.hotels = (res as Hotel[]);
    })

    this.actions = [
      { label: 'Delete', icon: 'pi pi-fw pi-trash' }
    ];
  }

  loadSettings() {
    if (this.editorMode == 'Edit' && this.hotel) {
      this.selectedTags = this.hotel.tags
      this.description = this.hotel.description;
      this.hotelname = this.hotel.hotelname;
      this.street = this.hotel.street;
      this.state = this.hotel.state;
      this.land = this.hotel.land;
      this.pictures = this.hotel.pictures;
      this.images = new Array();
      this.hotel.pictures.forEach((img) => this.images.push(img.payload));
    }
  }

  ngOnInit() {
    this.setup()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const mode = changes['editorMode'];
    if (mode.currentValue != mode.previousValue && mode.currentValue == "Edit") {
      this.setup();
    } else {
      this.clear();
    }
  }

}
