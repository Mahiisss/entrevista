Entrevista, a versatile platform for making notes! Makes studing easier and better

## Tech Stack
Next.js, Node.js, Redux, MongoDB, Material UI

## Debugging
Create a file `.env.local` in the root directory and add the following fields in it.
`DB_CONNECTION` = https://your_mongodb_connection
`JWT_SECRET` = some_secret_key
Add the following line in helpers/_frontendConstants.ts
`export const API_URL = "http://127.0.0.1:3000"`

After that, run the following commands:
```
rm package-lock.json
npm install
npm run dev
```


## Deployment
In _frontendConstants.ts, set the API_URL to the url where you're going to deploy the application. For example, `https://your_server.com` and then run the following commands:

```
npm run build
npm run start
```

