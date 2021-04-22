import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;

  public text: string;
  public type = 'success';

  alertSub: Subscription;

  constructor(private alert: AlertService) { }

  ngOnInit(): void {
    this.alertSub = this.alert.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if(this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }

}
