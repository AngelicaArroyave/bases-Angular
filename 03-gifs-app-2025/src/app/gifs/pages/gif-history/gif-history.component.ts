import { ActivatedRoute } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html'
})
export default class GifHistoryComponent {
  gifsService = inject(GifService)
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  )

  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()))
}
