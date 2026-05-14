import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

/**
 * Directiva para optimizar imágenes con lazy loading y atributos de optimización
 * Uso: <img appLazyImage [priority]="'high'">
 */
@Directive({
  selector: "img[appLazyImage]",
})
export class LazyImageDirective implements OnInit {
  @Input() appLazyImage: string | undefined;
  @Input() priority: "high" | "low" = "low";

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    const img = this.elementRef.nativeElement as HTMLImageElement;

    // Agregar atrib de lazy loading si no está configurado
    if (!img.loading) {
      this.renderer.setAttribute(
        img,
        "loading",
        this.priority === "high" ? "eager" : "lazy"
      );
    }

    // Agregar fetchpriority para imágenes de alta prioridad
    if (this.priority === "high" && !img.fetchPriority) {
      this.renderer.setAttribute(img, "fetchpriority", "high");
    }

    // Mejorar accesibilidad
    if (!img.alt) {
      this.renderer.setAttribute(img, "alt", "Image");
    }

    // Agregar decoding="async" para mejorar performance
    if (!img.decoding) {
      this.renderer.setAttribute(img, "decoding", "async");
    }
  }
}
