docker compose -f ./docker-compose.build.yaml build
docker compose -f ./docker-compose.service.yaml down -v
docker compose -f ./docker-compose.service.yaml up -d