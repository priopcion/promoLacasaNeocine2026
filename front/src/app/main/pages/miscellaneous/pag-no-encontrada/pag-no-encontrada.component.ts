import { Component, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-pag-no-encontrada',
  templateUrl: './pag-no-encontrada.component.html',
  styleUrls: ['./pag-no-encontrada.component.scss']
})
export class PagNoEncontradaComponent implements OnInit {
  configuracionLanding: any;
  _unsubscribeAll: Subject<any>;

  constructor(private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();

    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  ngOnInit(): void {
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.configuracionLanding = config;
    });
  }
}
