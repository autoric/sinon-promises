'use strict';
const Q = require('q');
const _ = require('lodash');

module.exports = function (sinon) {
  sinon.stub.returnsPromise = function () {
    const self = this;
    self._rejectVal = undefined;
    self._resolveVal = undefined;

    self.rejects = function (val) {
      self._rejectVal = val;
      self._resolveVal = undefined;
    };

    self.resolves = function (val) {
      self._rejectVal = undefined;
      self._resolveVal = val;
    };

    const behavior = sinon.behavior.create();
    behavior.returns();
    Object.defineProperty(behavior, 'returnValue', {
      get : function () {
        return Q.Promise(function (resolve, reject) {
          if (!_.isUndefined(self._rejectVal)) {
            return reject(self._rejectVal);
          }

          return resolve(self._resolveVal);
        });
      }
    });

    self.defaultBehavior = behavior;

    return self;
  };

};
