import { Company, Game, Genre, User } from './domainclasses';

export class HomeModel {
    genres!: Genre[];
    companies!: Company[];
}

export class GameListModel {
    genres!: Genre[];
    companies!: Company[];
    games!: Game[];
}

export class LoginResult {
    user!: User;
    accessToken!: string;
    refreshToken!: string;
}

export class GameEditModel {
    genres!: Genre[];
    companies!: Company[];
    game!: Game;
}