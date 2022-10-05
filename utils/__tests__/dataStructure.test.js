import { getAnimalWithFoods } from '../dataStructure';

test('reduces animal favorite food', () => {
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

  expect(getAnimalWithFoods(animalWithFoods)).toStrictEqual({
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
