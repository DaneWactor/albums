This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

After running install, park an .env.local file in the root of the project 

```bash
NEXT_PUBLIC_IMGUR_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also open [127.0.0.1:3000](http://127.0.0.1:3000) with your browser to see the result if you find that your browser is lying to you.

I chose Next.js for this project to leverage some of the best parts - namely, the app routing system and server actions. 

## Routing 

In a real world scenario, I would have wired up the Next.js router to handle dynamic routing for two parameters as required by the API endpoint. That structure would have looked like this... 

```bash
 app/image/[albumHash]/[imageHash]/page.tsx 
```

... but for brevity, I am using static routes with the additional parameters as query parameters.

## Server Actions

If the brochure for Next.js undersells anything, its server actions. Sever actions never come to the surface of the client meaning as long as error boundaries are implemented, you don't have to worry about them showing up in the client. This is an excellent design when you need to hide end points from the client. Another reason I like them is because it provides a way to organize communication logic between the client and server in one central location.

I also installed Axios to make HTTP requests to the Imgur API as this eliminates the second step of parsing the JSON response from the API that is usually associated with using fetch. 


