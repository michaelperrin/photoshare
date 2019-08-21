FROM composer:1.9 as composer

FROM php:7.3-fpm

ENV COMPOSER_ALLOW_SUPERUSER=1

# Add Composer to PHP container
COPY --from=composer /usr/bin/composer /usr/local/bin/composer

# Install recommended extensions for Symfony
RUN apt-get update && apt-get install -y \
    libicu-dev \
    && docker-php-ext-install \
    intl \
    opcache \
    && docker-php-ext-enable \
    intl \
    opcache

# Necessary packages for PDO PgSQL
# See https://github.com/docker-library/php/issues/221
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN docker-php-ext-install pdo_pgsql

# Necessary packages for Composer
RUN apt-get update \
    && apt-get install -y \
    git \
    unzip

ADD php.ini /usr/local/etc/php/php.ini
