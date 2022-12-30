docker-compose -f .\docker-compose-dev.yml down
docker volume rm $(docker volume ls -q)