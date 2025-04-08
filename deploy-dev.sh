#/bin/bash
docker rmi -f $(docker images -f "dangling=true" -q) || true
docker build -t omet-frontend-nextjs .
docker stop omet-frontend-nextjs || true
docker container rm omet-frontend-nextjs || true
docker rmi -f $(docker images -f "dangling=true" -q) || true
docker run -d --name=omet-frontend-nextjs --network=default-net --restart unless-stopped -p 3000:3000 omet-frontend-nextjs
