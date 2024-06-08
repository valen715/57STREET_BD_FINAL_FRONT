import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  listarProductos() {
    return this.http.get<any[]>('http://localhost:3000/api/listarProductos');
  }

  crearProducto(nuevoProducto: any) {
    return this.http.post('http://localhost:3000/api/crearProducto', nuevoProducto);
  }

  actualizarProducto(producto: any) {
    return this.http.put(`http://localhost:3000/api/actualizarProducto/${producto.id}`, producto);
  }

  eliminarProducto(id: number, nombre: any, descripcion: any) {
    return this.http.delete(`http://localhost:3000/api/eliminarProducto/${id}/${nombre}/${descripcion}`);
  }
}
