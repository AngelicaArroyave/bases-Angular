import { Component } from '@angular/core';

import { HeavyLoadersFastComponent } from '@shared/heavy-loaders/heavy-loaders-fast.component';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'pages-defer-options',
  imports: [TitleComponent, HeavyLoadersFastComponent],
  templateUrl: './defer-options.component.html',
})
export default class DeferOptionsComponent { }
