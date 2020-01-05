# Base ubuntu 16-04 image
FROM atlassian/default-image:2

RUN npm install -g expressjsmvc express nodemon forever

RUN mkdir /usr/app

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install 

EXPOSE 8000

ENV ENVIRONMENT development

# Define default command.
ENTRYPOINT [ "bash", "/usr/app/entrypoint.sh" ]
