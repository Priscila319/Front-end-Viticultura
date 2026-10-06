/** Variedades de uva monitoradas (dados demonstrativos). */
export const DEFAULT_VARIETY = 'Uva Itália';

export const VARIETIES = [
  { name: 'Uva Itália', short: 'Itália', type: 'Uva de mesa', temp: '28,4°C', humid: '67%', risk: 'Baixo', price: 'R$ 8,42', score: 89, color: 'green' },
  { name: 'Crimson Seedless', short: 'Crimson', type: 'Sem sementes', temp: '27,9°C', humid: '65%', risk: 'Baixo', price: 'R$ 9,18', score: 93, color: 'wine' },
  { name: 'Thompson Seedless', short: 'Thompson', type: 'Sem sementes', temp: '29,1°C', humid: '71%', risk: 'Médio', price: 'R$ 8,76', score: 74, color: 'gold' },
  { name: 'Sweet Globe', short: 'Sweet Globe', type: 'Sem sementes', temp: '28,2°C', humid: '66%', risk: 'Baixo', price: 'R$ 10,25', score: 96, color: 'blue' },
  { name: 'Uva Vitória', short: 'Vitória', type: 'Sem sementes', temp: '28,7°C', humid: '69%', risk: 'Baixo', price: 'R$ 9,64', score: 85, color: 'purple' },
];

export const findVariety = (name) => VARIETIES.find((variety) => variety.name === name);
