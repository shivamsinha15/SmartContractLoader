"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ethers = require('ethers');

var abiDecoder = require('abi-decoder');

var ContractManager =
/*#__PURE__*/
function () {
  function ContractManager(contractsPath, privateKey, blockchainURL, networkId) {
    _classCallCheck(this, ContractManager);

    this.INSTANCES = {};
    this.contractsPath = contractsPath;
    this.networkId = networkId;
    this.provider = new ethers.providers.JsonRpcProvider(blockchainURL);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contracts = require('require-all')({
      dirname: contractsPath
    });
  }

  _createClass(ContractManager, [{
    key: "getContractsInstances",
    value: function getContractsInstances(contractToLoad) {
      var _this = this;

      contractToLoad.forEach(function (x) {
        _this.INSTANCES[x] = _this.getContractInstance(x);
      });
      contractToLoad.forEach(function (x) {
        return abiDecoder.addABI(_this.contracts[x].abi);
      });
      return this.INSTANCES;
    }
  }, {
    key: "getContractInstance",
    value: function getContractInstance(name, address) {
      var contractDetails = this.contracts[name];

      if (!address) {
        address = contractDetails.networks[this.networkId].address;
      }

      var contract = new ethers.Contract(address, contractDetails.abi, this.wallet);
      return contract;
    }
  }, {
    key: "getContracts",
    value: function getContracts() {
      return this.contracts;
    }
  }, {
    key: "decodeLogs",
    value: function decodeLogs(eventName, txReceipt) {
      var event;
      var decoded = abiDecoder.decodeLogs(txReceipt.logs).find(function (e) {
        return e.name == eventName || e.name == "ErrorLog";
      });

      if (decoded) {
        event = decoded.events;
        var reducedEvent = event.reduce(function (acc, current) {
          var newObj = {};
          newObj[current.name] = current.value;
          return Object.assign(acc, newObj);
        }, {});
        console.log(reducedEvent);

        if (reducedEvent.hasOwnProperty('error')) {
          throw reducedEvent.error;
        }

        return reducedEvent;
      }

      return event;
    }
  }]);

  return ContractManager;
}();

exports.default = ContractManager;
//# sourceMappingURL=ContractManager.js.map