docker compose -f ./compose.yaml down  proxy
docker compose -f ./compose.yaml pull
docker compose -f ./compose.yaml up -d proxy