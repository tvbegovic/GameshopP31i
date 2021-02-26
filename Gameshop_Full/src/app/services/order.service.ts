import { Injectable } from "@angular/core";
import { Order } from "../domainclasses";
import { HttpService } from "./http.service";

@Injectable()
export class OrderService {

    constructor(private httpService: HttpService) {

    }

    api = 'api/order/';

    create(order: Order) {
        return this.httpService.post(this.api, order);
    }
}