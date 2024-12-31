import { vi } from 'vitest';

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Element[] = [];
  static instances: MockIntersectionObserver[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;

    MockIntersectionObserver.instances.push(this);
  }

  observe = vi.fn((element: Element) => {
    this.elements.push(element);
  });

  unobserve = vi.fn((element: Element) => {
    this.elements = this.elements.filter((el) => el !== element);
  });

  disconnect = vi.fn(() => {
    this.elements = [];
  });


  triggerIntersect = (isIntersecting: boolean, target: Element) => {
    const entry: IntersectionObserverEntry = {
      isIntersecting,
      target,
      intersectionRatio: isIntersecting ? 1 : 0,
      time: Date.now(),
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRect: isIntersecting ? target.getBoundingClientRect() : ({} as DOMRectReadOnly),
      rootBounds: null,
    };

    this.callback([entry], this as unknown as IntersectionObserver);
  };
}

export default MockIntersectionObserver;
