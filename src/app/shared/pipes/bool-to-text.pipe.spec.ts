import { BoolToTextPipe } from './bool-to-text.pipe';

describe('BoolToTextPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolToTextPipe();
    expect(pipe).toBeTruthy();
  });
});
