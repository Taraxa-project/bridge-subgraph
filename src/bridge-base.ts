import { DataSourceContext } from "@graphprotocol/graph-ts";
import { ConnectorRegistered } from "../generated/BridgeBase/BridgeBase";
import { Connector } from "../generated/schema";
import { TokenConnectorBase } from "../generated/templates";

export function handleConnectorRegistered(event: ConnectorRegistered): void {
    let connector = event.params.connector;
    let id = connector.toHexString();

    let context = new DataSourceContext();
    context.setBytes('connector', connector);

    let connectorEntity = Connector.load(id);

    if (!connectorEntity) {
        connectorEntity = new Connector(id);
        TokenConnectorBase.createWithContext(connector, context);
    }

    connectorEntity.address = connector;
    connectorEntity.timestamp = event.block.timestamp;
    connectorEntity.save();
}