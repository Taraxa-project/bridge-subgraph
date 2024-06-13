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

export class ClaimAccrued extends ethereum.Event {
  get params(): ClaimAccrued__Params {
    return new ClaimAccrued__Params(this);
  }
}

export class ClaimAccrued__Params {
  _event: ClaimAccrued;

  constructor(event: ClaimAccrued) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Claimed extends ethereum.Event {
  get params(): Claimed__Params {
    return new Claimed__Params(this);
  }
}

export class Claimed__Params {
  _event: Claimed;

  constructor(event: Claimed) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TokenConnectorBase extends ethereum.SmartContract {
  static bind(address: Address): TokenConnectorBase {
    return new TokenConnectorBase("TokenConnectorBase", address);
  }
}
