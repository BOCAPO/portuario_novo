#!/bin/bash

# Font Colors
RED="31"
GREEN="32"
NORMALRED="\e[31m"
NORMALGREEN="\e[32m"
BOLDGREEN="\e[1;${GREEN}m"
BOLDRED="\e[1;${RED}m"
ENDCOLOR="\e[0m"

# Docker Image
DOCKERHUB_USERNAME="growtechnologies"
DOCKER_IMAGE_NAME="econext-frontend"
DOCKER_IMAGE_TAG="latest"

# Production credentials
PRD_SERVER_USER="ganesha"
PRD_SERVER_HOST="econext.com.br"
PRD_COMPOSE_FILE_PATH="~/econext/frontend/docker-compose-prd.yml"

# Stage credentials
STG_SERVER_USER="ganesha"
STG_SERVER_HOST="hml.growtechnologies.com.br"
STG_COMPOSE_FILE_PATH="~/quimea/frontend/docker-compose-stg.yml"

# Build the Docker image
build () {
    local enviroment=$1
    local build_cmd="build"

    if [ ${enviroment} == "prd" ]; then
        build_cmd="build-prod"
    fi

    echo -e "${NORMALRED}The yarn build command has setted to: ${ENDCOLOR}${BOLDRED}${build_cmd}${ENDCOLOR}"

    echo -e "${BOLDGREEN}Building the Docker image...${ENDCOLOR}"
    docker build -t ${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}-${enviroment}:${DOCKER_IMAGE_TAG} --build-arg BUILD_CMD=${build_cmd} . --no-cache

}

# Push the Docker image to Registry
image_push() {
    local enviroment=$1

    echo -e "${BOLDGREEN}Pushing the Docker image...${ENDCOLOR}"

    docker push ${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}-${enviroment}:${DOCKER_IMAGE_TAG}

    echo -e "${NORMALGREEN}Pause 30s${ENDCOLOR}"
    sleep 30
}

# Deploy the Docker stack to Stage Server
stage () {
    local enviroment="stg"

    echo -e "${BOLDGREEN}Running Stage deploy...${ENDCOLOR}"

    build $enviroment

    image_push $enviroment

    echo -e "${BOLDGREEN}Down the Stage docker-compose stack${ENDCOLOR}"
    ssh ${STG_SERVER_USER}@${STG_SERVER_HOST} "docker-compose -f ${STG_COMPOSE_FILE_PATH} down -v"

    echo -e "${BOLDGREEN}Remove the Docker image from the Stage Server${ENDCOLOR}"
    ssh ${STG_SERVER_USER}@${STG_SERVER_HOST} "docker image rm ${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}-${enviroment}:${DOCKER_IMAGE_TAG} "

    echo -e "${BOLDGREEN}Up the docker stack${ENDCOLOR}"
    ssh ${STG_SERVER_USER}@${STG_SERVER_HOST} "docker-compose -f ${STG_COMPOSE_FILE_PATH} up -d"

}

# Deploy the Docker stack to Stage Server
production () {
    local enviroment="prd"

    echo -e "${BOLDGREEN}Running Production deploy...${ENDCOLOR}"

    build $enviroment

    image_push $enviroment

    echo -e "${BOLDGREEN}Down the Production docker-compose stack${ENDCOLOR}"
    ssh ${PRD_SERVER_USER}@${PRD_SERVER_HOST} "docker-compose -f ${PRD_COMPOSE_FILE_PATH} down -v"

    echo -e "${BOLDGREEN}Remove the Docker image from the Production Server${ENDCOLOR}"
    ssh ${PRD_SERVER_USER}@${PRD_SERVER_HOST} "docker image rm ${DOCKERHUB_USERNAME}/${DOCKER_IMAGE_NAME}-${enviroment}:${DOCKER_IMAGE_TAG} "

    echo -e "${BOLDGREEN}Up the docker stack${ENDCOLOR}"
    ssh ${PRD_SERVER_USER}@${PRD_SERVER_HOST} "docker-compose -f ${PRD_COMPOSE_FILE_PATH} up -d"

}

case $1 in
    stage) "$@";;
    production) "$@";;
    *) echo -e "${NORMALRED}Unrecognized function: ${ENDCOLOR}$1"
esac

echo -e "${NORMALGREEN}Finished!${ENDCOLOR}"
