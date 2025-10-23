import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
  }

  private createToastElement(message: string, alertClass: string, duration = 2500) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    toastContainer.classList.add('fixed',          // attach to viewport
      'bottom-20',       // a bit above the bottom edge
      'left-1/2',       // horizontally center
      '-translate-x-1/2', // exact centering trick
      'flex',
      'flex-col',
      'items-center',
      'gap-2',
      'z-50',
      'w-[20em]')
    const toast = document.createElement('div');
    toast.classList.add('toast-content', 'text-white','align-items-center', alertClass, 'border-0', 'px-2', 'py-1.5', 'rounded-md', 'absolute', 'mx-auto',
      'w-full', 'shadow-lg', 'transform', 'transition-all', 'ease-in-out', 'duration-500', 'opacity-100');
    toast.role = 'alert';

    toast.innerHTML = `
    <div class="flex justify-around items-center">
    <div class="toast-body text-sm">
      ${message}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto text-sm" aria-label="Close"></button>
    </div>
    `

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.append(toast);

    setTimeout(() => {
      toast.classList.replace('opacity-100', 'opacity-0');
      setTimeout(() => toastContainer.removeChild(toast), 500)
    }, duration)
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'bg-green-600', duration)
  }
  warning(message: string, duration?: number) {
    this.createToastElement(message, 'bg-rose-600', duration)
  }
  info(message: string, duration?: number) {
    this.createToastElement(message, 'bg-blue-600', duration)
  }


}