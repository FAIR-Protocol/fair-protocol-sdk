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
import { findByTags, getScriptsQuery, scriptsFilter } from '../../../common/utils/queries';
import { listScripts } from '../../../common/queries/script';

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

jest.mock('../../../common/utils/queries', () => {
  return {
    getScriptsQuery: jest.fn().mockImplementation(() => ({
      variables: {
        tags: [],
        first: 10,
      },
    })) as jest.MockedFunction<typeof getScriptsQuery>,
    scriptsFilter: jest.fn().mockImplementation((txs) => txs) as jest.MockedFunction<
      typeof scriptsFilter
    >,
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
