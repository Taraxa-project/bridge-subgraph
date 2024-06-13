// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class ConnectorRegistered extends ethereum.Event {
  get params(): ConnectorRegistered__Params {
    return new ConnectorRegistered__Params(this);
  }
}

export class ConnectorRegistered__Params {
  _event: ConnectorRegistered;

  constructor(event: ConnectorRegistered) {
    this._event = event;
  }

  get connector(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token_source(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get token_destination(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class BridgeBase extends ethereum.SmartContract {
  static bind(address: Address): BridgeBase {
    return new BridgeBase("BridgeBase", address);
  }
}
