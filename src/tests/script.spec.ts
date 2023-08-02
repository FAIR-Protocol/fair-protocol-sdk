import { describe, expect, test, jest } from '@jest/globals';
import { TAG_NAMES } from '../constants';
import { findByTags } from '../queries';
import { listScripts } from '../script';

const scripts = [
  {
    node: {
      id: '1',
      tags: [
        { name: TAG_NAMES.modelName, value: 'model1' },
        { name: TAG_NAMES.modelCreator, value: 'creator1' },
        { name: TAG_NAMES.unixTime, value: '1' },
        { name: TAG_NAMES.modelTransaction, value: 'modelId1' },
        { name: TAG_NAMES.sequencerOwner, value: 'owner1' },
        { name: TAG_NAMES.scriptTransaction, value: 'scriptId1' },
      ],
    },
  },
  {
    node: {
      id: '2',
      tags: [
        { name: TAG_NAMES.modelName, value: 'model2' },
        { name: TAG_NAMES.modelCreator, value: 'creator2' },
        { name: TAG_NAMES.unixTime, value: '2' },
        { name: TAG_NAMES.modelTransaction, value: 'modelId2' },
        { name: TAG_NAMES.sequencerOwner, value: 'owner2' },
        { name: TAG_NAMES.scriptTransaction, value: 'scriptId2' },
      ],
    },
  },
];

jest.mock('../queries', () => {
  return {
    findByTags: jest.fn().mockImplementation(() => {
      return {
        transactions: {
          edges: scripts,
          pageInfo: {
            hasNextPage: false,
          },
        },
      };
    }) as jest.MockedFunction<typeof findByTags>,
    getTxWithOwners: jest.fn().mockImplementation(() => {
      return {
        transactions: {
          edges: [],
          pageInfo: {
            hasNextPage: false,
          },
        },
      };
    }) as jest.MockedFunction<typeof findByTags>,
  };
});

describe('Scripts', () => {
  test('list all scripts', async () => {
    const result = await listScripts();

    expect(result.length).toBe(scripts.length);
  });
});