#stage 1
FROM node:14.21.3 as nodecompone
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm cache clean --force
## RUN npm install --save-dev @angular/cli
RUN npm install
RUN npm install -g @angular/cli@14.2.7
COPY . /app
CMD ng serve --port 4200
## CMD ng serve --host 0.0.0.0 --port 4200
## RUN npm run build --prod
## RUN npm install --save-dev -g npm
## RUN node --version && npm --version
## RUN node_modules/.bin/ng build --prod
## RUN npm install --save-dev @angular/cli @angular-devkit/build-angular @angular/core @angular/compiler typescript
## RUN npm install --save-dev @angular-devkit/build-angular
## RUN npm install --save-dev @typescript
## RUN npm run --save-dev build
#stage 2
FROM nginx:alpine
COPY --from=node /usr/scr/app/dist/pakki_web /usr/share/nginx/html
## COPY --from=node /usr/scr/app/dist/angular-app /usr/share/nginx/html
COPY --from=node /usr/scr/app/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

## docker build -t pakki/angular-app:latest .
## docker run -t -p 4200:80 pakki/angular-app:latest
