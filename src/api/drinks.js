export const fetchDrinks = async () => {
  // mock API (replace later with real backend)
  return [
    {
      id: 1,
      name: "Energy Blast",
      price: 3.5,
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      category: "Energy",
    },
    {
      id: 2,
      name: "Fresh Juice",
      price: 2.8,
      image:
        "https://images.unsplash.com/photo-1604908554163-45f3e7b1d8f1",
      category: "Juice",
    },
    {
      id: 3,
      name: "Cola Classic",
      price: 1.5,
      image:
        "https://images.unsplash.com/photo-1629203432163-8c8c6f3f5d5c",
      category: "Soda",
    },
  ];
};