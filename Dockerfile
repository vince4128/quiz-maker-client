FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

WORKDIR /usr/share/nginx/html

COPY ./build .
#COPY ./build /usr/share/nginx/html