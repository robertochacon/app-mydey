import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { EntitiesService } from 'src/app/services/entities.service';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-form-quotes',
  templateUrl: './form-quotes.component.html',
  styleUrls: ['./form-quotes.component.css']
})
export class FormQuotesComponent implements OnInit {

  step = 1;
  action = 'register';
  loading = false;
  loadData = false;
  result = '';
  entity_id:any;
  details:any;
  name = '';
  phone = '';
  ws = '';
  email = '';
  identification = '';
  date = '';
  service = '';
  note = '';
  listQuotes: any[] = [];
  entity:any;
  listQuotesProcess: any[] = [];
  listQuotesActive: any[] = [];
  listQuotesInactive: any[] = [];
  listServices: any[] = [];

  constructor(private route: ActivatedRoute, private _quotes: QuotesService, private _services: ServicesService, private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.entity_id = this.route.snapshot.paramMap.get('id');
    this.getEntity(this.entity_id);
    this.getAllServices(this.entity_id);
  }


  getEntity(entity_id: any){
    this._entities.getEntity(entity_id).subscribe((response)=>{
      this.entity  = response.data;
    }, error=>{
      this.listServices  = [];
    })
  }

  getAllServices(entity_id: any){
    this._services.getAllServices(entity_id).subscribe((response)=>{
      this.listServices  = response.data;
    }, error=>{
      this.listServices  = [];
    })
  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listQuotes').DataTable();
    },100);
  }

  reset(){
    this.name = '';
    this.phone = '';
    this.ws = '';
    this.email = '';
    this.identification = '';
    this.date = '';
    this.service = '';
    this.note = '';;
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("id_entity",this.entity_id);
    datos.append("service",this.service);
    datos.append("name",this.name);
    datos.append("phone",this.phone);
    datos.append("email",this.email);
    datos.append("date",this.date);

    this._quotes.setQuotes(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardada correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.action = 'register';
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

}
