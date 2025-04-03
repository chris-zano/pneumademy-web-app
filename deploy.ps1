# Build the docker image

docker build -t chrisncs/pneumademy:latest .

# push the image to docker hub

docker push chrisncs/pneumademy:latest

# write to the console

Write-Host "Docker image chrisncs/pneumademy:latest has been pushed to Docker Hub." -ForegroundColor Green