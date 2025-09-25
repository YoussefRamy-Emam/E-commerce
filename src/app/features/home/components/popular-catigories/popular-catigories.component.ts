import { Component, inject, OnInit } from '@angular/core';
import { CatigoriesService } from '../../../../Core/services/catigories/catigories.service';
import { Catigories } from '../../../../Core/models/catigories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-catigories',
  imports: [CarouselModule],
  templateUrl: './popular-catigories.component.html',
  styleUrl: './popular-catigories.component.css',
})
export class PopularCatigoriesComponent implements OnInit {
  private readonly catigoriesService = inject(CatigoriesService);

  categoriesList: Catigories[] = [];

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    dots: true,
    margin: 20,
    navSpeed: 700,
    navText: ['Next', 'Previes'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      550: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.getAllCatigoriesData();
  }

  getAllCatigoriesData(): void {
    this.catigoriesService.getAllCatigories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
      },
      error: (err) => {},
    });
  }
}
