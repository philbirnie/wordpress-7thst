FROM wordpress:latest

COPY config/php.ini /usr/local/etc/php

RUN curl -o /bin/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /bin/wp-cli.phar \
    && mv /bin/wp-cli.phar /bin/wp

RUN yes | pecl install xdebug \
    && echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_autostart=on" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_connect_back=off" >> /usr/local/etc/php/conf.d/xdebug.ini

RUN echo "xdebug.remote_host=docker.for.mac.localhost" >> /usr/local/etc/php/conf.d/xdebug.ini

RUN apt-get update && \
	apt-get install -y  --no-install-recommends ssl-cert && \
	rm -r /var/lib/apt/lists/* && \
	a2enmod ssl && \
	a2ensite default-ssl

EXPOSE 443
