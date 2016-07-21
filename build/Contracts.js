import Promise from 'bluebird';
import async from 'async';
import solc from 'solc';
import { solidityDirectory, compiledDirectory } from '../config';

const fs = Promise.promisifyAll(require('fs'));
const jsonfile = Promise.promisifyAll(require('jsonfile'));

fs.readdirAsync(solidityDirectory).then((contracts) => {
  async.forEach(contracts, (contract, cb) => {
    fs.readFileAsync(`${solidityDirectory}/${contract}`, 'utf-8').then((src) => {
      let compiled = solc.compile(src, 1);
      if(!compiled.contracts) {
        throw compiled;
      } else {
        let fileName = contract.replace(`.sol`, ``);
        return jsonfile.writeFileAsync(`${compiledDirectory}/${fileName}.json`, compiled[`contracts`][fileName])
      }
    }).then(() => {
      console.log('Contract saved');
      cb();
    }).catch((error) => {
      throw error;
    })
  }, (error) => {
    if(error) { throw error; }
    console.log('Files have been saved');
  });
}).catch((error) => {
  console.log(error);
});
