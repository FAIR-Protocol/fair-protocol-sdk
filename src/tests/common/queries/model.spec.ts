/*
 * Copyright 2023 Fair protocol
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, expect, test, jest } from '@jest/globals';
import { TAG_NAMES } from '../../../common/utils/constants';
import { listModels } from '../../../common/queries/model';
import { findByTags, getModelsQuery, modelsFilter } from '../../../common/utils/queries';

const models = [
  {
    node: {
      id: '1',
      tags: [
        { name: TAG_NAMES.modelName, value: 'model1' },
        { name: TAG_NAMES.unixTime, value: '1' },
        { name: TAG_NAMES.modelTransaction, value: 'modelId1' },
        { name: TAG_NAMES.sequencerOwner, value: 'owner1' },
      ],
    },
  },
  {
    node: {
      id: '2',
      tags: [
        { name: TAG_NAMES.modelName, value: 'model2' },
        { name: TAG_NAMES.unixTime, value: '2' },
        { name: TAG_NAMES.modelTransaction, value: 'modelId2' },
        { name: TAG_NAMES.sequencerOwner, value: 'owner2' },
      ],
    },
  },
];

jest.mock('../../../common/utils/queries', () => {
  return {
    getModelsQuery: jest.fn().mockImplementation(() => ({
      variables: {
        tags: [],
        first: 10,
      },
    })) as jest.MockedFunction<typeof getModelsQuery>,
    modelsFilter: jest.fn().mockImplementation((txs) => txs) as jest.MockedFunction<
      typeof modelsFilter
    >,
    findByTags: jest.fn().mockImplementation(() => {
      return {
        transactions: {
          edges: models,
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

describe('Models', () => {
  test('list models', async () => {
    const result = await listModels();

    expect(result.length).toBe(models.length);
  });
});
