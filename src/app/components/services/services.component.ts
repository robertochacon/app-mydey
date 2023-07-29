import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServicesService } from 'src/app/services/services.service';
import { EntitiesService } from 'src/app/services/entities.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  details:any = null;
  id_user:any;
  id_entity:any = 0;
  description = '';
  name = '';
  price = '';
  listServices: any[] = [];
  listEntities: any[] = [];

  constructor(private _services: ServicesService,private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.id_user = localStorage.getItem('user_id');
    this.getAllServices(this.id_entity);
    this.getAllEntities(this.id_user);
  }

  getAllServices(id_entity:any){
    this.loading = true;

    this._services.getAllServices(id_entity).subscribe((response)=>{

      this.listServices  = response.data;

      setTimeout(function(){
        $('#listServices').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  getAllEntities(user_id: any){
    this.loading = true;
    this._entities.getAllEntities(user_id).subscribe((response)=>{
      this.listEntities  = response.data;
    }, error=>{
      this.listEntities  = [];
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listServices').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.description = '';
    this.price = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("id_entity",this.id_entity);
    datos.append("name",this.name);
    datos.append("description",this.description);
    datos.append("price",this.price);

    this._services.setServices(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllServices(this.id_entity);
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
    this.price = this.details?.price;
  }

  update(): void {

    this.loading = true;
    this.details.name = this.name;
    this.details.description = this.description;
    this.details.price = this.price;

    this._services.updateServices(this.details?.id, this.details).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualizado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllServices(this.id_entity);
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
      title: 'Deseas eliminar este empleado?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._services.deleteServices(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllServices(this.id_entity);
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
