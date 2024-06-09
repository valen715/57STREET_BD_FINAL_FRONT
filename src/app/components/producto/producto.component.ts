import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

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
    activo: 0,
    genero: 0,
    color: 0,
    categoria: 0,
    talla: 0
  };
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
  this.http.get<any[]>('http://localhost:3000/api/listarProductos')
    .subscribe(
      (response) => {
        this.productos = response.map(item => ({
          id: item[0].ID,
          nombre: item[0].NOMBRE,
          descripcion: item[0].DESCRIPCION,
          cantidad: item[1].CANTIDAD,
          precio: item[1].PRECIO,
          activo: item[2],
          genero: item[3],
          color: item[4],
          categoria: item[5],
          talla: item[6]
        }));
      },
      (error) => {
        this.error = 'Error al obtener productos';
      }
    );
}

  actualizarProducto() {
    if(!this.productos.some(item => item.id == this.nuevoProducto.id)){
        console.log("El producto para actualizar no existe")
        this.error = "El producto para actualizar no existe";
        return
    }
    this.http.put<{message: string}>(`http://localhost:3000/api/actualizarProducto`, this.nuevoProducto)
    .pipe(
      tap(() => {
        console.log('Producto actualizado correctamente');
      }),
      finalize(() => {
        window.location.reload();
      })
    )
    .subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
      }
    });
  }

  eliminarProducto(id: number, nombre: any, descripcion: any) {
    this.http.delete<{message: string}>(`http://localhost:3000/api/eliminarProducto/${id}/${nombre}/${descripcion}`)
      .pipe(
        tap(() => {
          console.log('Producto eliminado correctamente');
        }),
        finalize(() => {
          window.location.reload();
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
  }

  crearProducto(): void {
    if(this.productos.some(item => item.id == this.nuevoProducto.id)){
      console.log("El producto con el ID seleccionado ya existe, actualiza en este caso")
      this.error = "El producto con el ID seleccionado ya existe, actualiza en este caso";
      return
    }

    this.http.post<{ message: string }>('http://localhost:3000/api/crearProducto', this.nuevoProducto)
      .pipe(
        tap(() => {
          console.log('Producto creado correctamente');
        }),
        finalize(() => {
          window.location.reload();
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
        }
      });
  }

  resetFormulario(): void {
    this.nuevoProducto = {
      id: '',
      nombre: '',
      descripcion: '',
      cantidad: 0,
      precio: 0,
      activo: 0,
      genero: 0,
      color: 0,
      categoria: 0,
      talla: 0
    };
  }
}

