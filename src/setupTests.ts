import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import MockIntersectionObserver from './__mocks__/mockIntersectionObserver';

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
  MockIntersectionObserver.instances = [];
});

(global as any).IntersectionObserver = MockIntersectionObserver;
