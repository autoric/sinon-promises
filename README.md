# sinon-promises

Stubs can return promises!

```
'use strict';
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const sinonStubPromise = require('./..');

sinonStubPromise(sinon);

chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;
let stub;

describe('stubbing promises', () => {
  beforeEach(() => {
    stub = sinon.stub();
  });

  it('should not throw an error when invoked', () => {
    stub.returnsPromise();
  });

  it('should allow defining a resolve value', () => {
    stub.returnsPromise();
    stub.resolves(1);

    return expect(stub()).to.eventually.equal(1);
  });

  it('should allow defining a reject value', () => {
    stub.returnsPromise();
    const err = new Error();
    stub.rejects(err);

    return expect(stub()).to.eventually.be.rejectedWith(err);
  });

  it('should allow overwriting a resolves with a reject', () => {
    stub.returnsPromise();
    const err = new Error();
    stub.resolves(1);
    stub.rejects(err);

    return expect(stub()).to.eventually.be.rejectedWith(err);
  });

  it('should allow overwriting a reject with a resolves', () => {
    stub.returnsPromise();
    const err = new Error();
    stub.rejects(err);
    stub.resolves(1);

    return expect(stub()).to.eventually.equal(1);
  });
  
  it('should be last-write-wins', () => {
    stub.returnsPromise();
    stub.resolves(1);
    stub.resolves(2);
    stub.resolves(3);

    return expect(stub()).to.eventually.equal(3);
  });
});

```