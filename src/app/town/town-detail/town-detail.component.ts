import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TownService } from '../town.service';

@Component({
  selector: 'app-town-detail',
  templateUrl: './town-detail.component.html',
  styleUrls: ['./town-detail.component.scss']
})
export class TownDetailComponent implements OnInit {

  town$: Observable<any>;

  constructor(private route: ActivatedRoute, private router: Router, private townService: TownService) { }

  // ! operator is part of TypeScript as a non-null assertion operator which avoids void or null errors popping
  // $ operator marks the variable as an observable type (Angular naming convention)
  ngOnInit(): void {
    this.town$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.townService.getTown(params.get('id')!))
    );
  }

}
