import { Address, BigInt, dataSource, ethereum } from "@graphprotocol/graph-ts";
import {
  Locked,
  Burned,
} from "../generated/templates/TokenConnector/TokenConnector";
import { Transfer } from "../generated/schema";

const NATIVE_TOKEN_PLACEHOLDER = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

let context = dataSource.context();
let connector = context.getBytes("connector");
let tokenSource = context.getBytes("token_source");
let tokenDestination = context.getBytes("token_destination");

export function handleLocked(event: Locked): void {
  handleTransfer(event, "lock", event.params.account, event.params.value);
}

export function handleBurned(event: Burned): void {
  handleTransfer(event, "burn", event.params.account, event.params.value);
}

export function handleTransfer(
  event: ethereum.Event,
  type: string,
  account: Address,
  value: BigInt
): void {
  let id = event.transaction.hash
    .toHexString()
    .concat("-")
    .concat(event.transactionLogIndex.toString());

  let fee = BigInt.fromI32(0);

  if (type == "lock" && tokenSource.toHexString() == NATIVE_TOKEN_PLACEHOLDER) {
    fee = event.transaction.value.minus(value);
  } else {
    fee = event.transaction.value;
  }

  let transferEntity = new Transfer(id);
  transferEntity.transactionHash = event.transaction.hash;
  transferEntity.type = type;
  transferEntity.connector = connector;
  transferEntity.tokenSource = tokenSource;
  transferEntity.tokenDestination = tokenDestination;
  transferEntity.address = account;
  transferEntity.amount = value;
  transferEntity.fee = fee;
  transferEntity.timestamp = event.block.timestamp;

  transferEntity.save();
}
