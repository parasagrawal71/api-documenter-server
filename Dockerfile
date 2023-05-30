FROM node:16-alpine

WORKDIR /opt
COPY . .
RUN npm install
EXPOSE 5001
CMD ["npm", "start"]