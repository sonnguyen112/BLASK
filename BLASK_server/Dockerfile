FROM python:3.9.5-alpine

WORKDIR /home/BLASK/

RUN apt-get update && apt-get install -y redis-server

COPY requirements.txt .

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x run_server.sh

CMD ["bash","run_server.sh"]