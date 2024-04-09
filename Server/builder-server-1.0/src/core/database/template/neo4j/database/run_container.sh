#!/bin/bash

docker run -d \
  --name <database_container_name> \
  --network <network_name> \
  -p <database_external_port>:7474 \
  -p <database_external_port_bolt>:7687 \
  -v <database_vol_name>:/data \
  -v <database_vol_logs_name>:/logs \
  -e NEO4J_AUTH=<database_auth_id>/<database_auth_password> \
  -e NEO4J_server_default__listen__address=0.0.0.0 \
  -e NEO4J_dbms_connector_bolt_listen__address=0.0.0.0:7687 \
  -e NEO4J_dbms_connector_http_listen__address=0.0.0.0:7474 \
  neo4j:5.15.0
