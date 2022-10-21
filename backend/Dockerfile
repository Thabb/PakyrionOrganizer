FROM python:3.10-alpine

# prevents python generating .pyc
ENV PYTHONDONTWRITEBYTECODE=1

# prevents python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

WORKDIR /home/app

COPY ./requirements.txt .

# add postgres/psycopg2/pg_config dependencies
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

COPY ./src .

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod o+x /entrypoint.sh

ENTRYPOINT ["sh", "-c", "/entrypoint.sh"]