import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CocheService } from '../../service/coche.service';
import { MarcaService } from '../../service/marca.service';
import { TipoCocheService } from '../../service/tipocoche.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Coche } from '../../model/coche';
import { Marca } from '../../model/marca';
import { DropdownModule } from 'primeng/dropdown';
import { Tipocoche } from '../../model/tipocoche';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-coche',
  standalone: true,
  imports: [
    HomeComponent,
    DropdownModule,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css'],
})
export class CocheComponent {
  coches: Coche[] = [];
  marcas: Marca[] = [];
  tiposCoche: Tipocoche[] = [];
  titulo: string = '';
  opc: string = '';
  coche = new Coche();
  op = 0;
  visible: boolean = false;

  constructor(
    private cocheService: CocheService,
    private marcaService: MarcaService,
    private tipoCocheService: TipoCocheService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarCoches();
    this.listarMarcas();
    this.listarTiposCoche();
  }

  listarCoches() {
    this.cocheService.getCoche().subscribe((data) => {
      this.coches = data;
    });
  }

  listarMarcas() {
    this.marcaService.getMarca().subscribe((data) => {
      this.marcas = data;
    });
  }

  listarTiposCoche() {
    this.tipoCocheService.getTipoCoche().subscribe((data) => {
      this.tiposCoche = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Coche';
    this.opc = 'Guardar';
    this.op = 0;
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Coche';
    this.opc = 'Editar';
    this.cocheService.getCocheById(id).subscribe((data) => {
      this.coche = data;
      this.op = 1;
    });
    this.visible = true;
  }

  confirmDeleteCoche(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este coche?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCoche(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  deleteCoche(id: number) {
    this.cocheService.deleteCoche(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El coche ha sido eliminado exitosamente',
        });
        this.listarCoches();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el coche',
        });
      },
    });
  }

  addCoche(): void {
    this.cocheService.createCoche(this.coche).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Registrado',
        });
        this.listarCoches();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el coche',
        });
      },
    });
    this.visible = false;
  }

  confirmSaveCoche() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar este coche?'
          : '¿Estás seguro de que deseas editar este coche?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.guardarOEditarCoche();
      },
    });
  }

  guardarOEditarCoche() {
    if (this.op === 0) {
      this.addCoche();
    } else if (this.op === 1) {
      this.editCoche();
    }
  }

  editCoche() {
    this.cocheService.updateCoche(this.coche, this.coche.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Editado',
        });
        this.listarCoches();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el coche',
        });
      },
    });
    this.visible = false;
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.coche.id = 0;
    this.coche.matricula = '';
    this.coche.numPuertas = 0;
    this.coche.marca_id = 0;
    this.coche.tipocoche_id = 0;
  }
}
