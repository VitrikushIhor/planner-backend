#!/bin/bash
set -e

# Виконати міграції
yarn prisma migrate dev

# Запустити команду, передану як аргумент
exec "$@"
