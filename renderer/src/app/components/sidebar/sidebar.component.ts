import { Component } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'sidebar',
    template: `
        <div class="sidebar">
            <nav class="nav nav-pills nav-stacked sidebar-wrapper">
                <ng-content></ng-content>
            </nav>
        </div>
    `,
    styles: [`
        div.sidebar {
            position:fixed;
            height:100%;
            width:200px; 
            top:0;
            left:0;
            background: #f5f5f5;
            border-right: 1px solid #eee;
        }
    `]
})
export class SidebarComponent {

}