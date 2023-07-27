import { DelayMiddleware } from './delay.middleware';

describe('DelayMiddleware', () => {
  it('should be defined', () => {
    expect(new DelayMiddleware()).toBeDefined();
  });
});
