FROM node:19-alpine3.15
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_BASE_URL http://localhost:8000/api/v1

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install -g serve

COPY . ./

RUN npm run build

CMD ["serve", "-s", "build"]
