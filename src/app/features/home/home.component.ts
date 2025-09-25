import { Component, inject, OnInit } from '@angular/core';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { PopularCatigoriesComponent } from './components/popular-catigories/popular-catigories.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    PopularCatigoriesComponent,
    PopularProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
