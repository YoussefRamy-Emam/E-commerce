import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brands } from './models/brands.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brandsList: Brands[] = [];

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandsList = res.data;
      },
    });
  }
}
