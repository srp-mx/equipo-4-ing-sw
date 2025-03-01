# Setting up the database

## The first time

1. Install Docker and start the service/socket.
2. Pull the PostgreSQL Docker image.
```bash
sudo docker pull postgres
```
3. Run the Docker container.
```bash
sudo docker run --name estudiantica -e POSTGRES_PASSWORD=<database password> -d -p 5432:5432 postgres
```
4. Copy the SQL files into the container.
```bash
sudo docker cp DDL.sql estudiantica:/DDL.sql
sudo docker cp DML.sql estudiantica:/DML.sql
```
5. Log into the PostgreSQL.
```bash
sudo docker exec -it estudiantica psql -U postgres
```
6. Execute the DDL to create the tables.
```bash
\i /DDL.sql
```
7. Access the database 
```bash
psql -h localhost -p 5432 -U postgres -W
```
