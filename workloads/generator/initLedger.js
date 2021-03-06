/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

//let txIndex = 0;
let keyIndex = 0;
let err = 0
let ret = 0

let nclients = 10
let ntransactions = 10000
let tranperclient = ntransactions/nclients


/**
 * Workload module for the benchmark round.
 */
class CreateCarWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }
    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {


    keyIndex = this.txIndex + (this.workerIndex * tranperclient);
	    //console.log(keyIndex)
    this.txIndex++;
    
    let args;
    let value = keyIndex * 100
	args = {
            contractId: 'generator',
            contractVersion: 'v1',
            contractFunction: 'InitLedger',
            contractArguments: [keyIndex.toString(), value.toString()],
            timeout: 30
        };
        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateCarWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
