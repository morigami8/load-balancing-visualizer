import { CountMiddleware } from './count.middleware';

describe('CountMiddleware', () => {
  it('should be defined', () => {
    expect(new CountMiddleware()).toBeDefined();
  });
});
