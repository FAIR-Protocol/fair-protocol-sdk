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

import { logger } from '../../common/utils/common';
import { FairOperator } from '../../common/classes/operator';
import { FairScript } from '../../common/classes/script';
import { getUploadTags } from '../../common/utils/inference';
import { createTx } from '../utils/arweave';
import type Arweave from 'arweave/web';
import { Configuration } from '../../common/types/configuration';

const requestInference = async (
  arweave: Arweave,
  script: FairScript,
  operator: FairOperator,
  prompt: string,
  userAddr: string,
  conversationId: number,
  configuration: Configuration,
) => {
  const tags = getUploadTags(
    script,
    operator.owner,
    userAddr,
    conversationId,
    'text/plain',
    configuration,
    'web',
  );

  try {
    const tx = await createTx(arweave, prompt, tags);
    const result = await window.arweaveWallet.dispatch(tx);
    if (!result.id) {
      throw new Error('No txid returned from dispatch');
    }
    logger.debug(`Inference txid: ${result.id}`);

    return result.id;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export { requestInference };
