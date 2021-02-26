import { Injectable } from "@angular/core";
import { HttpService } from './http.service';

@Injectable()
export class GenreService {

    constructor(private httpService: HttpService) {

    }

    api = 'api/genre';

    getAll() {
        return this.httpService.get(this.api);
    }
}