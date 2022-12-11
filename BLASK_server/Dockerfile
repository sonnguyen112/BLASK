FROM python:3.9.7

WORKDIR /home/BLASK/

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x run_server.sh

CMD ["bash","run_server.sh"]