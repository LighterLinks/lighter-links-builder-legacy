docker build -t <server_image_name> --network host .
docker run -d --name <server_container_name> --network <network_name>  -p <server_external_port>:3000 <server_image_name>