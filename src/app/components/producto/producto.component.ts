import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any[] = [];
  producto: any = {};
  nuevoProducto: any = {
    id: '',
    nombre: '',
    descripcion: '',
    cantidad: 0,
    precio: 0,
    activo: false,
    idTipoGenero: '',
    idTipoColor: '',
    idTipoCategoriaProducto: '',
    idTipoTalla: ''
  };
  productoActualizado: any = {};
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.http.get<any[]>('http://localhost:3000/api/listarProductos')
      .subscribe(
        (response) => {
          this.productos = response;
        },
        (error) => {
          this.error = 'Error al obtener productos';
        }
      );
  }

  actualizarProducto(producto: any) {
    this.http.put(`http://localhost:3000/api/actualizarProducto/${producto.id}`, producto)
      .subscribe(
        () => {
          this.listarProductos();
        },
        () => {
          this.error = 'Error al actualizar producto';
        }
      );
  }

  eliminarProducto(id: number, nombre: any, descripcion: any) {
    this.http.delete(`http://localhost:3000/api/eliminarProducto/${id}/${nombre}/${descripcion}`)
      .subscribe(
        () => {
          this.listarProductos();
        },
        () => {
          this.error = 'Error al eliminar producto';
        }
      );
  }

  crearProducto(): void {
    this.http.post('http://localhost:3000/api/crearProducto', this.nuevoProducto)
      .subscribe(
      () => {
        console.log('Producto creado correctamente');
        this.listarProductos();
        this.resetFormulario();
      },
      (error) => {
        console.error('Error al crear producto:', error);
      }
    );
  }

  resetFormulario(): void {
    this.nuevoProducto = {
      id: '',
      nombre: '',
      descripcion: '',
      cantidad: 0,
      precio: 0,
      activo: false,
      idTipoGenero: '',
      idTipoColor: '',
      idTipoCategoriaProducto: '',
      idTipoTalla: ''
    };
  }
}

