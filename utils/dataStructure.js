export function getAnimalWithFoods(animalWithFoods) {
  const animal = {
    animalId: animalWithFoods[0].animalId,
    animalFirstName: animalWithFoods[0].animalFirstName,
    animalType: animalWithFoods[0].animalType,
    animalAccessory: animalWithFoods[0].animalAccessory,
    foods: animalWithFoods.map((animalWithFood) => {
      return {
        name: animalWithFood.foodName,
        type: animalWithFood.foodType,
      };
    }),
  };
  return animal;
}
