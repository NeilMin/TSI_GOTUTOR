FROM ubuntu:latest
RUN apt-get update -y 
RUN apt-get --no-install-recommends -y install wget lsb-release gnupg
RUN apt-get --no-install-recommends -y install nodejs npm
RUN wget "https://dev.mysql.com/get/mysql-apt-config_0.8.15-1_all.deb" &&\
apt-get --no-install-recommends install "./mysql-apt-config_0.8.15-1_all.deb" && \
apt-get update && apt-get --no-install-recommends -y install \
mysql-community-server mysql-community-client
RUN echo "skip-networking" >> /etc/mysql/mysql.conf.d/mysqld.cnf
