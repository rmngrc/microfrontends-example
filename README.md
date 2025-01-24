# Microfrontends with Vite + React

## Getting started

To get started with this project, follow these steps:

**Clone the repository**:

```sh
git clone https://github.com/rmngrc/microfrontends-example.git
cd microfrontends-example
```

**Install dependencies and run the application**:

```
npm install
npm run dev
```

**Access the application**:

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## This set up is for local development, how can I deploy this at scale?

![Microfrontends at scale](docs/Microfrontends%20at%20scale.jpg)

The highlights of this diagram are:

- Remotes would be stored in one or multiple S3 buckets. If we want to have multiple teams
  working on it and owning the infrastructure for each of their microfrontends, the best operating
  model would be to create a separate S3 bucket for each (even within its own AWS account).

- The proposed folder structure within the S3 bucket is as follows. This way, we will be able to
  have multiple versions of the microfrontend in the bucket.

```
  .
  └── Navbar
      ├── v1.0.0
      │   ├── assets/
      │   ├── index.html
      │   └── RemoteNavbar.js
      ├── v1.1.0
      │   ├── assets/
      │   ├── index.html
      │   └── RemoteNavbar.js
      ├── v1.2.0
      │   ├── assets/
      │   ├── index.html
      │   └── RemoteNavbar.js
      └── app-manifest.json
```

- The `app-manifest.json` file will be updated on every deploy marking the active deployment and
  whether there is a blue/green deployment running or not.

- The host application can be Client Side Rendered or Server Side Rendered. If client side rendered,
  it will follow the same approach for hosting it as a microfrontend. If Server Side Rendered, it can be
  hosted using AWS Farget and accessed through an Application Load Balancer for horizontal scaling.

- The host application will access the remote microfrontends using Cloudfront. This is good for two
  reasons: this way we do not have to worry about the latest version and cost reduction, thanks to
  cloudfront caching capabilities.

- The version calculation will be done by a Lambda@Edge that can be either set up as Viewer Request
  or as Origin Request. The option chosen will depend on costs and how frequent updates to microfrontends
  happen. If set up as Viewer Request, the lambda will be executed always on every request, increasing
  the operating costs although we will get instant updates. If set up as a Origin Request, Cloudfront
  will be able to cache its result but the updates will not happen instantaneously, as it will depend on
  the `max-age` header of the resource.
