import { Component } from '@angular/core';

@Component({
    selector: 'app-toast',
    template: `
    @if(show){
    <div 
        class="alert alert-{{ type }} alert-dismissible fade show position-fixed bottom-0 end-0 m-3 shadow"
        role="alert">
        {{ message }}
        <button type="button" class="btn-close" (click)="show = false"></button>
    </div>
    }    
  `,
    styles: [`
    .alert {
        min-width: 250px;
        z-index: 1055;
    }
  `]
})
export class ToastComponent {
    show = false;
    message = '';
    type: 'success' | 'danger' | 'warning' | 'info' = 'success';
    open(msg: string, type: 'success' | 'danger' | 'warning' | 'info' = 'success') {
        this.message = msg;
        this.type = type;
        this.show = true;

        setTimeout(() => {
            this.show = false;
        }, 3000);
    }

    openWithRoute(msg: string, type: 'success' | 'danger' | 'warning' | 'info' = 'success'): Promise<void> {
        this.message = msg;
        this.type = type;
        this.show = true;

        return new Promise(resolve => {
            setTimeout(() => {
                this.show = false;
                resolve();
            }, 1000);
        });
    }
}
