# Dockerfile

# base image
FROM node:14-alpine

# set working directory
WORKDIR /usr/src

# install global dependencies
RUN npm install -g @nestjs/cli

# copy files to docker directory
COPY . .

# install application dependencies
RUN npm install

# build application
RUN npm run build

# Add Package
RUN apk add tzdata

# Set Timezone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000

# run application
CMD ["node", "dist/main"]