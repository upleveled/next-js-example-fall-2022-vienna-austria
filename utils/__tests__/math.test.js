import { add } from '../math';

test('add two numbers together', () => {
  expect(add(1, 1)).toBe(2);
  expect(add(100, 200)).toBe(300);
  expect(add(1, 1)).toBe(2);
});

test('throws an error if arguments are not numbers', () => {
  expect(() => add(1, '1')).toThrow('Pass only numbers!');
  expect(() => add('asdasd', 1)).toThrow('Pass only numbers!');
  expect(() => add(true, 1)).toThrow('Pass only numbers!');
});
