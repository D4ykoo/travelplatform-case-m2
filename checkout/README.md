# Checkout/ Payment Microservice
Frontend and backend can be deployed seperatly. For simplicty of this lecture it is one directory in a monorepo instead of two seperate repositories.

Every microservice as well as the root of the checkout directory contains a docker directory. This provides some docker-compose files for the corresponding services. 

## Prerequisites
* A postgresql database where the configuration and credentials are known
* See [backend/README.md](backend/README.md) for docker postgresdb instructions (the network arg can be removed when the other services are not deployed with docker) 
* A kafka instance e. g. using the AiO solution or the example inside the backend docker directory
* Make sure to install `npm`, `angular` and `rustc` compared with `cargo` when running in bare metal mode

## Configuration
All configuration instructions can be viewed in the corresponding READMEs of the backend and frontend directory.

## How to run - VM
Follow the instructions in the [RunInVM.md](RunInVM.md) of this directory.

## How to run - Docker
An All-in-One Solution is provided in the `docker` directory. Follow the [/docker/README.md](/docker/README.md) instructions for more information.

When running the frontend and backend seperatly follow the instructions in the READMEs located at:
[/frontend/README.md](/frontend/README.md) and [/backend/README.md](/backend/README.md).

## How to run the k8s manifests
Follow the instructions located in [ApplyManifests.md](ApplyManifests.md)

## How to run - Bare Metal
Follow the instructions in the [RunBareMetal.md](RunBareMetal.md) of this directory.

## How the multi platform images were made
Create the builder:
```bash
 sudo docker buildx create --name armbuilder --driver=docker-container
```
Then build and push the multi platform images: 
```bash
sudo docker buildx build --push --platform linux/amd64,linux/arm64 --builder=armbuilder -t dak4408/travma-checkout-<frontend/backend>:latest .
```

## Technology Stack
* Angular + typescript + npm + TailwindCSS + daisyUI
* Rust + Actix Web + Diesel

## Additional Information
* Project management done with self-hosted [Leantime](https://github.com/Leantime/leantime)
* Verification of the JWT: 
  * Username included 
  * -> extract JWT via browser dev tools and paste into [https://jwt.io/](https://jwt.io/)
  * Different users have different usernames

## Future Work
* Add UUIDs for db scheme
* Payment method using actual services 