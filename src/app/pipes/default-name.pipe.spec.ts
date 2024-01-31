import { DefaultNamePipe } from './default-name.pipe';

describe('DefaultNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultNamePipe();
    expect(pipe).toBeTruthy();
  });
});
