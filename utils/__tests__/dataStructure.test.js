import { getAnimalsWithFoods } from '../dataStructure';

test('reduces animal favorite foods', () => {
  const animalWithFoods = [
    {
      animalId: 4,
      animalFirstName: 'Mayo',
      animalType: 'Dog',
      animalAccessory: 'Sweater',
      foodName: 'Cheddar cheese',
      foodType: 'Dairy',
    },
    {
      animalId: 4,
      animalFirstName: 'Mayo',
      animalType: 'Dog',
      animalAccessory: 'Sweater',
      foodName: 'Potato',
      foodType: 'Grain',
    },
  ];

  expect(getAnimalsWithFoods(animalWithFoods)).toStrictEqual({
    animalId: 4,
    animalFirstName: 'Mayo',
    animalType: 'Dog',
    animalAccessory: 'Sweater',
    foods: [
      { name: 'Cheddar cheese', type: 'Dairy' },
      { name: 'Potato', type: 'Grain' },
    ],
  });
});
