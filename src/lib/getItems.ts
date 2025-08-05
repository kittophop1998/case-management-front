export const getItems = async (query: string) => {
  const allItems = [
    { code: "C001", name: "John Doe", img: "/path/to/image1.jpg" },
    { code: "C002", name: "Jane Smith", img: "/path/to/image2.jpg" },
  ];

  if (!query) return allItems;

  return allItems.filter(
    (item) => true
    // item.toLowerCase().includes(query.toLowerCase())
  );
};
