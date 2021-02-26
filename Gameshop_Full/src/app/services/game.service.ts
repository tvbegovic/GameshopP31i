import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Game } from '../domainclasses';
import { HttpService } from './http.service';

@Injectable()
export class GameService {

    constructor(private httpService: HttpService) {

    }

    api = 'api/game/';

    getHomeModel() {
        return this.httpService.get(this.api + 'homeModel');
    }

    getGenres() {
        return this.httpService.get(this.api + 'genres');
    }

    getCompanies() {
        return this.httpService.get(this.api + 'companies');
    }

    getByGenre(id: number) {
        return this.httpService.get(`${this.api}bygenre/${id}`);
    }

    getByCompany(id: number) {
        return this.httpService.get(`${this.api}bycompany/${id}`);
    }

    search(text: string) {
        return this.httpService.get(`${this.api}search/${text}`);
    }

    getById(id: number) {
        return this.httpService.get(`${this.api}getById/${id}`);
    }

    getListModel() {
        return this.httpService.get(this.api + 'listModel');
    }

    create(game: Game): Observable<Game> {
        return this.httpService.post(this.api, game);
    }

    update(game: Game): Observable<Game> {
        return this.httpService.put(this.api, game);
    }

    delete(id: number) {
        return this.httpService.delete(this.api + id.toString());
    }

    getEditModel(id: number) {
        return this.httpService.get(`${this.api}editModel/${id}`);
    }
}