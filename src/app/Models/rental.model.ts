export type Order = 'asc' | 'desc';
export type RentalOrderByKeys = 'movie' | 'rental_date' | 'is_paid' | "no_sort";

export type RentalInfo = {
    count: number;
    next: string;
    previous: string;
    results: [Rental];
};

export class Rental {
    uuid: string = '';
    rental_date: string = '';
    return_date: string = '';
    is_paid: boolean = false;
    user: string = '';
    movie: string = '';
    charge: string = '';
    no_sort:string = '';

    sort(
        other: Rental,
        order: Order = 'asc',
        by: RentalOrderByKeys = 'movie'
    ): number {
        if (order == 'asc') {
            return this[by] >= other[by] ? 1 : -1;
        } else {
            return this[by] > other[by] ? -1 : 1;
        }
    }
}
