# There is no way to specify prod-only dependencies with Pipenv: https://github.com/pypa/pipenv/issues/335
# This is a workaround to include psycopg2 (PostgreSQL) only in requirements.txt that the production environment uses
pipenv run pip freeze > requirements.txt
echo "psycopg2==2.8.6" >> requirements.txt

