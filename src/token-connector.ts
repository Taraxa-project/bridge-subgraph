import { BigInt, Bytes, dataSource, store } from '@graphprotocol/graph-ts'
import { ClaimAccrued, Claimed } from "../generated/templates/TokenConnectorBase/TokenConnectorBase";
import { Balance, Claim } from "../generated/schema";

let context = dataSource.context();
let connector = context.getBytes('connector');
let tokenSource = context.getBytes('token_source');
let tokenDestination = context.getBytes('token_destination');

function updateBalance(address: Bytes, amount: BigInt): void {
  let id = connector
    .toHexString()
    .concat('-')
    .concat(address.toHexString());

  let balance = Balance.load(id);

  if (balance == null) {
    balance = new Balance(id);
    balance.connector = connector;
    balance.address = address;
    balance.amount = amount;
  } else {
    balance.amount = balance.amount.plus(amount);

    if (balance.amount.equals(BigInt.fromI32(0))) {
      store.remove('Balance', id);
      return;
    }
  }

  balance.save();
}

export function handleTransfer(event: ClaimAccrued): void {
  updateBalance(event.params.account, event.params.value);
}

export function handleClaimed(event: Claimed): void {
  let id = event.transaction.hash
    .toHexString()
    .concat('-')
    .concat(event.transactionLogIndex.toString());

  let claimedEntity = new Claim(id);
  claimedEntity.connector = connector;
  claimedEntity.tokenSource = tokenSource;
  claimedEntity.tokenDestination = tokenDestination;
  claimedEntity.address = event.params.account;
  claimedEntity.amount = event.params.value;
  claimedEntity.timestamp = event.block.timestamp;

  claimedEntity.save();

  updateBalance(event.params.account, event.params.value.times(BigInt.fromI32(-1)));
}