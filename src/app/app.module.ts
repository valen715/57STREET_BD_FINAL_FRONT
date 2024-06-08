import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoService } from './services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { ProductoComponent } from './components/producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ProductoService], // Asegúrate de añadir el servicio en los providers
  bootstrap: [AppComponent]
})
export class AppModule { }
