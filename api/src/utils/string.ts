import { stringCamelCase } from 'https://deno.land/x/polkadot@0.2.17/util/mod.ts';
import { Text } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';

export function toCamelCase(array: string[] | Text[]): string {
  let result = stringCamelCase(array.join('_'));
  result = result.slice(0, 1).toUpperCase() + result.slice(1, result.length);
  return result;
}

export function splitByCommas(str: string) {
  let counter = 0;
  const result = [];
  let lastTypeIndex = 0;
  Array.from(str).forEach((char, index) => {
    if (char === ',' && counter === 0) {
      result.push(str.slice(lastTypeIndex, index).trim());
      lastTypeIndex = index + 1;
    }
    (char === '<' || char === '(') && counter++;
    (char === '>' || char === ')') && counter--;
  });
  result.push(str.slice(lastTypeIndex).trim());
  return result;
}
