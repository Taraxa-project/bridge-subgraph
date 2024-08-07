import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import {
  ConnectorRegistered,
  ConnectorDelisted,
  AssetBridged,
} from "../generated/Bridge/Bridge";
import { Connector, Transfer } from "../generated/schema";
import { TokenConnector } from "../generated/templates";

export function handleConnectorRegistered(event: ConnectorRegistered): void {
  let connector = event.params.connector;
  let id = connector.toHexString();

  let connectorEntity = new Connector(id);
  connectorEntity.address = connector;
  connectorEntity.tokenSource = event.params.token_source;
  connectorEntity.tokenDestination = event.params.token_destination;
  connectorEntity.timestamp = event.block.timestamp;
  connectorEntity.delisted = false;
  connectorEntity.save();

  let context = new DataSourceContext();
  context.setBytes("connector", connector);
  context.setBytes("token_source", event.params.token_source);
  context.setBytes("token_destination", event.params.token_destination);
  TokenConnector.createWithContext(connector, context);
}

export function handleConnectorDelisted(event: ConnectorDelisted): void {
  let connector = event.params.connector;
  let id = connector.toHexString();

  let connectorEntity = Connector.load(id);
  if (connectorEntity == null) {
    return;
  }
  connectorEntity.delisted = true;
  connectorEntity.save();
}

export function handleAssetBridged(event: AssetBridged): void {
  let connector = event.params.connector;
  let id = connector.toHexString();

  let connectorEntity = Connector.load(id);
  if (connectorEntity == null) {
    return;
  }

  let transferId = event.transaction.hash
    .toHexString()
    .concat("-")
    .concat(event.transactionLogIndex.toString());

  let transferEntity = new Transfer(transferId);
  transferEntity.transactionHash = event.transaction.hash;
  transferEntity.type = "mint";
  transferEntity.connector = connectorEntity.address;
  transferEntity.tokenSource = connectorEntity.tokenSource;
  transferEntity.tokenDestination = connectorEntity.tokenDestination;
  transferEntity.address = event.params.account;
  transferEntity.amount = event.params.value;
  transferEntity.fee = BigInt.fromI32(0);
  transferEntity.timestamp = event.block.timestamp;

  transferEntity.save();
}
