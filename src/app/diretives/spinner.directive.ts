import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appSpinner]',
})
export class SpinnerDirective {
    @Input()
    sub: Subscription = {} as Subscription;
    @Input()
    positionRelavtive: boolean = true;

    waiting: boolean = false;

    constructor(private elRef: ElementRef) {}

    @HostListener('click')
    clickEvent() {
        this.waiting = true;
        this.addSpiner();
        const int = setInterval(() => {
            if (this.sub.closed) {
                this.waiting = false;
                this.removeSpinner();
                clearInterval(int);
            }
        }, 100);
    }

    addSpiner() {
        const sppiner = document.createElement('div');
        sppiner.id = 'spinner';
        sppiner.classList.add('spinner');
        if(this.positionRelavtive)
         this.elRef.nativeElement.style.position = 'relative' ;
        this.elRef.nativeElement?.appendChild(sppiner);
    }

    removeSpinner() {
        document.getElementById('spinner')?.remove();
    }
}
