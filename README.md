## Technologies

- Vite
- Material UI
- Typescript
- Firebase
- Jest

## Description

This is a small example of a TODO app, where you can authenticate, and manage your tasks, all with serverless solution!

## Documentation

Firebase is powerfull and a easy configuration Backend as a Service tool, from a management console we can control our app and see in real time the information, with a Component library as Material UI we can develop fast prototypes, I decided to use a modular arquitecture, somthing like angular, React gives you this freedom, the testing of the components is focused in evaluate how works the main aspects of the app, because we already have a UI library (One of the most populars) It is not important to retest everything again

there is a lot of aspects to have in considerations to improve, one is the bundle size, we have already prebuilt soutions, but somethings for small projects this can be overwhelming and unnecesary, we can use something more simple like Tailwind + ShadCD,
for mediums projects is easy to surpass the limit of costs in firebase, so it is important to not be too tied to an specific technilogy, although firebase provide us a great developer experience and a lot of documentation to integrate with differente technologies

## Installation

```bash
$ npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Test

```bash
# unit tests
$ npm run test

```

## Folder Structure

```bash
.
└── src/
    ├── assets/
    ├── components/
    │   ├── shared/
    │   │   ├── *.tsx
    │   │   └── ...
    │   ├── **/
    │   │   ├── *.tsx
    │   │   ├── *.test.tsx
    │   │   ├── use*.tsx
    │   │   ├── *.helper.tsx
    │   │   ├── *.interface.tsx
    │   │   └── ...
    │   └── svg/
    │       ├── *.tsx
    │       └── ...
    ├── hooks/
    │   ├── use*.tsx
    │   └── ...
    ├── interfaces/
    │   ├── common.d.ts
    │   ├── ...
    ├── routes/
    │   ├── App.tsx
    │   ├── ...
    ├── services
    │   ├── *.service.tsx
    ├── App.css
    ├── main.tsx
    └── ...configuration files
```
