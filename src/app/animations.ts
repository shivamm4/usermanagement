import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }), { optional: true }),

    group([
      
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('350ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ], { optional: true }),

      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ], { optional: true })
    ])
  ])
]);

