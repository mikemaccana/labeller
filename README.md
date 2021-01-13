# Labeller

A tool for labelling named entities in text.

## Layout

The app uses TypeScript and Svelte. 

 - Components are in `src/components` - `.svelte` files contain all the HTML / CSS / JS for the component.
 - The store (which handles global state) is `src/store.ts` 
 - Global CSS (eg colors, layout settings) is in `public/global.css`. CSS is plain CSS grid and variables. 
## Get started

Install the dependencies...

```bash
cd labeller
npm install
```

Then run:

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). 