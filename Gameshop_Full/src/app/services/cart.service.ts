import { EventEmitter, Injectable } from "@angular/core";
import { Game } from '../domainclasses';

@Injectable()
export class CartService {

    items: CartItem[] = [];

    constructor() {
        this.load();
    }

    Changed = new EventEmitter();

    add(game: Game) {
        const g = this.items.find(x => x.game.id == game.id);
        if(g) {
            g.qty++;
        } else {
            this.items.push({
                game : game,
                qty : 1
            });
        }
        this.save();
        this.Changed.emit(this.getCount());
    }

    remove(id: number, qty?: number) {
        if(!qty) {
            qty = 1;
        }
        const index = this.items.findIndex(x => x.game.id == id);
        if(index >= 0) {
            const g = this.items[index];
            g.qty -= qty;
            if(g.qty <= 0) {
                this.items.splice(index, 1);
            }
            this.save();
            this.Changed.emit(this.getCount());
        }
    }

    load() {
        const storage = localStorage.getItem('cart');
        if(storage) {
            this.items = JSON.parse(storage);
            this.Changed.emit(this.getCount());
        }
    }

    clear() {
        this.items = [];
        this.save();
        this.Changed.emit(this.getCount());
    }

    getCount() {
        return this.items.length;
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
}

export class CartItem {
    constructor(public qty: number, public game: Game) {

    }
}