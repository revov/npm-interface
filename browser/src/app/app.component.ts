import { Component } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css'

@Component({
    selector: 'application',
    template: `
        <h1>NPM Interface</h1>
        <button type="button" class="btn btn-secondary" placement="right" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." title="Popover on right">
            Popover on right
        </button>
    `
})
export class AppComponent {
    model = {
        left: true,
        middle: true,
        right: false,
    };
}