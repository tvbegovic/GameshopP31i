export class Company {
    id!: number;
    name!: string;
}

export class Genre {
    id!: number;
    name!: string;
}

export class Game {
    id!: number;
    title!: string;
    idGenre!: number | null;
    idPublisher!: number | null;
    price!: number | null;
    idDeveloper!: number | null;
    releaseDate!: Date | null;
    image!: string;
    publisher!: Company | null;
    developer!: Company | null;
    genre!: Genre | null;

    fileId!: string;

}

export class OrderDetail {
    id!: number;
    idOrder!: number | null;
    idGame!: number | null;
    quantity!: number | null;
    unitprice!: number | null;
}

export class Order {
    id!: number;
    idUser!: number | null;
    idEmployee!: number | null;
    dateOrdered!: string | null;
    dateSent!: string | null;

    user!: User | null;
    employee!: User | null;
    details!: OrderDetail[];
}

export class Employee {
    id!: number;
    email!: string;
    password!: string;
    name!: string;
}

export class User {
    id!: number;
    firstname!: string;
    lastname!: string;
    address!: string;
    city!: string;
    email!: string;
    token!: string;
}