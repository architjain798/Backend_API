# Back-End Developer Project

## Prerequisites

Make sure you have Docker installed on your machine.

## Setting up Redis

Pull the Redis image and run a container named 'my-redis':

```bash
docker pull redis
docker run -p 6379:6379 --name my-redis -d redis
Building and Running the Backend API
Build the Docker image for the backend API:

bash
Copy code
docker build -t backend-api .
Run the backend API container:

bash
Copy code
docker run -p 8080:8080 -d backend-api
Application Details
This application utilizes NodeJs and Express for the backend, with Redis serving as a caching mechanism to store data.

Endpoints
1. Get People Data
Endpoint: GET http://localhost:8080/api/peoples

Retrieves people data from an external API. If the data is already in the cache, it returns that data. The cached data becomes stale after 30 minutes and is automatically updated.

2. Gender Count
Endpoint: GET http://localhost:8080/api/peoples/gender-count/male

Calculates and returns the count of people based on gender (male or female).

3. Filter by Height
Endpoint: GET http://localhost:8080/api/peoples/height/150

Returns the names of people whose height is greater than the specified input height.

```
