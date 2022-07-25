FROM node:16 as build

WORKDIR /website

# copy the react app to the container
COPY ./package.json /website

# prepare the container for building the react app
RUN npm install
# RUN npm run build

COPY . .

CMD [ "npm", "run", "start" ]
