docker build -t builder-server --network host .
docker run -d --name builder-server-container -p 8082:8082 builder-server