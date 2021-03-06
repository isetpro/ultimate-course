import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {EMPTY, Observable, of} from 'rxjs'
import {map, switchMap, tap} from 'rxjs/operators'
import {IPassenger} from '../../models/passenger.interface'
import {PassengerDashboardService} from '../../passenger-dashboard.service'

@Component({
  selector: 'app-passenger-viewer',
  templateUrl: 'passenger-viewer.component.html',
  styleUrls: ['passenger-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassengerViewerComponent implements OnInit {
  passenger$?: Observable<IPassenger>
  constructor(
    private passengerService: PassengerDashboardService,
    private activatedRoute: ActivatedRoute,

  ) {
    
  }

  ngOnInit(): void {
    this.passenger$ = this.activatedRoute.params.pipe(
      map(p => p.id),
      switchMap(id => this.passengerService.getPassenger(+id))
    )
  }

  onUpdatePassenger(passenger: IPassenger){
    console.log('From parent', passenger);
    this.passengerService.updatePassenger(passenger)
  }

}
