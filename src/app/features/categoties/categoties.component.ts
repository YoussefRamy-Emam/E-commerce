import { Component, inject, OnInit } from '@angular/core';
import { CatigoriesService } from '../../Core/services/catigories/catigories.service';
import { Catigories } from '../../Core/models/catigories.interface';

@Component({
  selector: 'app-categoties',
  imports: [],
  templateUrl: './categoties.component.html',
  styleUrl: './categoties.component.css',
})
export class CategotiesComponent implements OnInit {
  private readonly catigoriesService = inject(CatigoriesService);

  catigoryList: Catigories[] = [];

  ngOnInit(): void {
    this.getAllCatigories();
  }

  getAllCatigories(): void {
    this.catigoriesService.getAllCatigories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.catigoryList = res.data;
      },
    });
  }
}
