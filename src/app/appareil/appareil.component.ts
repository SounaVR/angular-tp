import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/AppareilService';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName!: string;
  @Input() appareilStatus!: string;
  @Input() index!: number;
  @Input() id!: number;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {
  }

  onSwitch() {
    if (this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    } else if (this.appareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
  }
}
