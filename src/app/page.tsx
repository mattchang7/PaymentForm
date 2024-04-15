"use client";

import PaymentForm from "./PaymentForm/PaymentForm";
import { useState } from "react";

export default function Home() {
  // Using state to track form submission. Probably would put some posting/redirecting logic here if the backend were connected.
  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <main className="flex h-full flex-col items-center justify-between p-10 lg:w-2/3 sm:w-5/6 w-full ">
      {submitted ? (
        <div className="h-full flex flex-col justify-center">
          Form submitted!
        </div>
      ) : (
        <PaymentForm handleSubmit={setSubmitted} />
      )}
    </main>
  );
}
