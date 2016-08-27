import { Component, Input } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'loadingMask',
    template: `
        <div *ngIf="show" class="modal-backdrop fade in">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo"></feBlend>
                    </filter>
                </defs>
            </svg>
            <div class="blob blob-0"></div>
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
            <div class="blob blob-4"></div>
            <div class="blob blob-5"></div>
        </div>
    `,
    styles: [`
        .blob {
            width: 2rem;
            height: 2rem;
            background: #E5E5E5;
            border-radius: 50%;
            position: absolute;
            left: calc(50% - 1rem);
            top: calc(50% - 1rem);
            box-shadow: 0 0 1rem rgba(255, 255, 255, 0.15);
        }

        .blob-2 {
            animation: animate-to-2 1.5s infinite;
        }

        .blob-3 {
            animation: animate-to-3 1.5s infinite;
        }

        .blob-1 {
            animation: animate-to-1 1.5s infinite;
        }

        .blob-4 {
            animation: animate-to-4 1.5s infinite;
        }

        .blob-0 {
            animation: animate-to-0 1.5s infinite;
        }

        .blob-5 {
            animation: animate-to-5 1.5s infinite;
        }

        @keyframes animate-to-2 {
            25%,
            75% {
                transform: translateX(-1.5rem) scale(0.75);
            }
            95% {
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-3 {
            25%,
            75% {
                transform: translateX(1.5rem) scale(0.75);
            }
            95% {
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-1 {
            25% {
                transform: translateX(-1.5rem) scale(0.75);
            }
            50%,
            75% {
                transform: translateX(-4.5rem) scale(0.6)
            }
            95% {
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-4 {
            25% {
                transform: translateX(1.5rem) scale(0.75);
            }
            50%,
            75% {
                transform: translateX(4.5rem) scale(0.6)
            }
            95% {
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-0 {
            25% {
                transform: translateX(-1.5rem) scale(0.75);
            }
            50% {
                transform: translateX(-4.5rem) scale(0.6)
            }
            75% {
                transform: translateX(-7.5rem) scale(0.5)
            }
            95% {
                transform: translateX(0rem) scale(1);
            }
        }

        @keyframes animate-to-5 {
            25% {
                transform: translateX(1.5rem) scale(0.75);
            }
            50% {
                transform: translateX(4.5rem) scale(0.6)
            }
            75% {
                transform: translateX(7.5rem) scale(0.5)
            }
            95% {
                transform: translateX(0rem) scale(1);
            }
        }
    `]
})
export class LoadingMaskComponent {
    @Input()
    show: boolean = false;
}