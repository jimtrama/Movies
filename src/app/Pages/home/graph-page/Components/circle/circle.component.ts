import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-circle',
    templateUrl: './circle.component.html',
    styleUrl: './circle.component.scss',
})
export class CircleComponent implements OnInit {
    @Input({ required: true }) x: number = 0;
    @Input({ required: true }) y: number = 0;
    @Input({ required: true }) r: number = 0;
    @Input({ required: true }) year: number = -1;
    @Input({ required: true }) count: number = 0;

    @Output()
    yearSelected:EventEmitter<number[]> = new EventEmitter<number[]>()

    @HostListener('mouseenter')
    hoverEvent(event: Event) {
        this.showSelected = true;
        this.yearSelected.emit([this.year,this.count])
    }

    @HostListener('mouseleave')
    hoverOutEvent(event: Event) {
        this.showSelected = false;
    }

    @HostListener('click')
    clickEvent(event: Event) {
        if( 'touchevent' in window)
        this.showSelected = !this.showSelected;
    }
    showSelected:boolean = false;


    constructor(private el: ElementRef) {

    }

    ngOnInit(): void {
        this.el.nativeElement.style.top = this.y + 'px';
        this.el.nativeElement.style.left = this.x + 'px';
        this.el.nativeElement.style.height = this.r + 'px';
        this.el.nativeElement.style.width = this.r + 'px';
        const color = Math.random() * 255;
        this.el.nativeElement.style.backgroundColor = `rgba(${color},4,255,0.6)`;
    }
}
