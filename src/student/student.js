// Exercise 1
// return the sorted list depending on the paramaters
// sortBy can be 'name' or 'role'
// sortDirection can be 'asc' or 'desc'
// Make a shallow copy of the array before sorting it!

const getOrder = (itemA, itemB) => {
  if (itemA < itemB) {
    return -1;
  }
  if (itemA > itemB) {
    return 1;
  }
  // names must be equal
  return 0;
};

const sortMembers = (team, sortBy, sortDirection) => {
  const teamCopy = [...team];
  teamCopy.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    const roleA = a.role.toUpperCase();
    const roleB = b.role.toUpperCase();
    return sortBy === "name" ? getOrder(nameA, nameB) : getOrder(roleA, roleB);
  });

  return sortDirection === "asc" ? teamCopy : teamCopy.reverse();
};

// Exercise 2
const getStudents = (team) => {
  // return all members who are students
  return team.filter((member) => member.role === "student");
};

const getTeachers = (team) => {
  // return all members who are teachers
  return team.filter((member) => member.role === "teacher");
};

// Exercise 3
const getMemberAnimalsWithUrls = (member) => {
  // return an array of objects where each object has the following shape:
  const { animals } = member;
  return animals.map((animal) => {
    return {
      name: animal.slice(0, 1).toUpperCase() + animal.slice(1),
      url: `https://www.randomlists.com/img/animals/${animal}.jpg`
    };
  });
  // { name: ANIMAL_NAME, url: ANIMAL_IMAGE_URL }
  // You can create the url by using this url
  //and replacing filling in the animal name:
  // https://www.randomlists.com/img/animals/ANIMAL_NAME.jpg
};
// Exercise 4
const getAnimals = (team) => {
  // return an array of all animals that exist on all members
  // Do not include duplicate animals

  //get all animals values
  //reduce method
  const res = team.reduce((acc, { animals }) => {
    return [...acc, ...animals];
  }, []);
  return Array.from(new Set(res));
};

// Exercise 5
const filterByAnimal = (team, animal) => {
  // only return members who are friends with the animal
  return team.filter(({ animals }) => {
    return animals.includes(animal);
  });
};

export {
  sortMembers,
  getStudents,
  getTeachers,
  getMemberAnimalsWithUrls,
  getAnimals,
  filterByAnimal
};
