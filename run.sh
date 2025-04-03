docker compose -f ./docker-compose.service.yaml down -v
docker compose -f ./docker-compose.service.yaml pull
docker compose -f ./docker-compose.service.yaml up -d