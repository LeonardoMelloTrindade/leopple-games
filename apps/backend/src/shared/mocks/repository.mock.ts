export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any, any>;
};

export const repositoryMockFactory: () => MockType<any> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity),
  delete: jest.fn((entity) => entity),
}));
