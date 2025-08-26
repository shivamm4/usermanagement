import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private key = 'prefers-dark';
  constructor(factory: RendererFactory2){ this.renderer = factory.createRenderer(null, null); }
  isDark(){ return localStorage.getItem(this.key) === '1'; }
  apply(){ if(this.isDark()) this.renderer.addClass(document.body, 'dark'); else this.renderer.removeClass(document.body, 'dark'); }
  toggle(){ localStorage.setItem(this.key, this.isDark() ? '0' : '1'); this.apply(); }
}
