import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { QuotesService } from 'src/app/services/quotes.service';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  step = 1;
  action = 'list';
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
  listQuotesProcess: any[] = [];
  listQuotesActive: any[] = [];
  listQuotesInactive: any[] = [];
  listServices: any[] = [];

  constructor(private route: ActivatedRoute, private _quotes: QuotesService, private _services: ServicesService) { }

  ngOnInit(): void {
    this.entity_id = this.route.snapshot.paramMap.get('id');
    console.log(this.entity_id);
    
    this.getAllQuotes(this.entity_id);
    this.getAllServices();
  }

  getAllQuotes(entity_id: any){
    this.loading = true;

    this._quotes.getAllQuotes(entity_id).subscribe((response)=>{

      this.listQuotes  = response.data;
      this.listQuotesProcess = this.listQuotes .filter(item => item.status === 'process');
      this.listQuotesActive = this.listQuotes .filter(item => item.status === 'active');
      this.listQuotesInactive = this.listQuotes .filter(item => item.status === 'inactive');

      setTimeout(function(){
        $('#listQuotesProcess').DataTable();
        $('#listQuotesActive').DataTable();
        $('#listQuotesInactive').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  getAllServices(){
    this.loading = true;
    this._services.getAllServices().subscribe((response)=>{
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
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllQuotes(this.entity_id);
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

  status(status:any): void {

    this.loading = true;
    let datos = {"status":status};

    this._quotes.updateQuotes(this.details?.id, datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Completada correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllQuotes(this.entity_id);
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
      title: 'Deseas eliminar esta cita?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._quotes.deleteQuotes(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllQuotes(this.entity_id);
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
