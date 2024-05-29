import { ClaimAccrued, Claimed } from "../generated/templates/TokenConnectorBase/TokenConnectorBase";
import { Transfer } from "../generated/schema";

export function handleTransferCreated(event: ClaimAccrued): void {
  let id = event.transaction.hash
    .toHexString()
    .concat('-')
    .concat(event.transactionLogIndex.toString());

  let transferEntity = new Transfer(id);
  transferEntity.token = event.address;
  transferEntity.address = event.params.account;
  transferEntity.amount = event.params.value;
  transferEntity.timestamp = event.block.timestamp;

  transferEntity.save();
}

export function handleTransferClaimed(event: Claimed): void {
}
