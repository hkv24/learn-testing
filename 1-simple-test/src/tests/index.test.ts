import {describe, expect, test} from '@jest/globals';
import { sum, multiply } from '../index';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    const finalAns = sum(1, 2);
    expect(finalAns).toBe(3);
  });

  test('testing for negative numbers', () => {
    const finalAns = sum(-2, -3);
    expect(finalAns).toBe(-5);
  })
});

describe('multiplication module', () => {
    test('multiply 1 * 2 to equal 2', () => {
      const finalAns = multiply(1, 2);
      expect(finalAns).toBe(2);
    });
  
    test('testing for negative numbers', () => {
      const finalAns = multiply(-2, 3);
      expect(finalAns).toBe(-6);
    })
});

// describe can be nested