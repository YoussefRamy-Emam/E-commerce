import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Routes ديناميكية → SSR افتراضي
  { path: 'details/:slag/:id', renderMode: RenderMode.Server },
  { path: 'details/:id', renderMode: RenderMode.Server },
  { path: 'checkout/:id', renderMode: RenderMode.Server },

  // صفحات ثابتة → prerender
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'cart', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Prerender },
  { path: 'brands', renderMode: RenderMode.Prerender },
  { path: 'categoties', renderMode: RenderMode.Prerender },
  { path: 'wishlist', renderMode: RenderMode.Prerender },
  { path: 'allorders', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'forgetpassword', renderMode: RenderMode.Prerender },

  // Notfound route → prerender
  { path: '**', renderMode: RenderMode.Prerender },
];
