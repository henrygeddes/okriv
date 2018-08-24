export default [
    { id: 1, name: 'THE ICONIC', type: 'company', parentId: null },
    { id: 2, name: 'Marketing and Production', type: 'department', parentId: 1 },
    { id: 3, name: 'MIT', type: 'team', parentId: 2 },
    { id: 4, name: 'Henry Geddes', type: 'individual', parentId: 3 },
    { id: 5, name: 'Will Parker', type: 'individual', parentId: 3 },
    { id: 6, name: 'Finance', type: 'department', parentId: 1 },
    { id: 7, name: 'Category Management', type: 'department', parentId: 1 },
    { id: 8, name: 'Operations', type: 'department', parentId: 1 },
    { id: 9, name: 'People and Culture', type: 'department', parentId: 1 },
    { id: 10, name: 'Technology and Product', type: 'department', parentId: 1 },
];
