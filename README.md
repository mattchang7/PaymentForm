This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notes

- Wrap entire account info with label to make the whole block clickable
- Use deprecated name attribute on radio inputs to allow labels pointing to each option but grouping each option into one input group
- Smart price input field
  - Currency symbol needs to be visible
  - Shouldn't allow any characters except digits and one period
  - Shouldn't allow more than two decimal places
  - Should show two decimal places and at least one dollar digit no matter what the input
  - Should be empty for any input equal to 0
- Smart account number input field
  - Use built in number validation
  - Will require turning off of the increment arrows and scroll behavior
  - Don't want to disable copy/paste, but can't stop users from copy/pasting invalid characters. Should check on submit
- Prorating logic
  - Largest remainder method to avoid rounding errors and ensure the sum of payments is equal to the total payment
  - with Math.round: 40000.33 -> 27578.52, 9100.62, 3321.2
  - Thus requires Math.floor, even though it's not always exactly accurate
- Input field validation
  - To minimize invalid inputs,
  - Some fields have two potential errors
