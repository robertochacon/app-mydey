import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  details:any = null;
  id_user:any;
  description = '';
  name = '';
  phone = '';
  email = '';
  image:any = [];
  listEntities: any[] = [];

  constructor(private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.id_user = localStorage.getItem('user_id');
    this.getAllEntities();
  }

  getAllEntities(){
    this.loading = true;

    this._entities.getAllEntities(this.id_user).subscribe((response)=>{

      this.listEntities  = response.data;

      setTimeout(function(){
        $('#listEntities').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listEntities').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.description = '';
    this.phone = '';
    this.email = '';
  }

  getImage(event: any){
    this.image = event.target.files[0];
    console.log(this.image);
    
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("id_user",this.id_user);
    datos.append("name",this.name);
    datos.append("description",this.description);
    datos.append("phone",this.phone);
    datos.append("email",this.email);
    datos.append("image",this.image);

    this._entities.setEntities(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllEntities();
      this.action = 'list';
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }

  setUpdate(){
    this.name = this.details?.name;
    this.description = this.details?.description;
    this.phone = this.details?.phone;
    this.email = this.details?.email;
  }

  update(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("id_user",this.id_user);
    datos.append("name",this.name);
    datos.append("description",this.description);
    datos.append("phone",this.phone);
    datos.append("email",this.email);
    datos.append("image",this.image);

    this._entities.updateEntities(this.details?.id, datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualizado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllEntities();
      this.action = 'list';
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

  }
  
  delete(id: any): void {
    Swal.fire({
      title: 'Deseas eliminar esta entidad?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._entities.deleteEntities(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllEntities();
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Problemas tecnicos!',
          text: 'No se pudo completar el registro, favor intente nuevamente.',
          showConfirmButton: false,
          timer: 2000
        });
      })
    
      }
    })

  }

}
