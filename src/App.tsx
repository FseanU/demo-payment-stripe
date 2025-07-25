import "./App.css";
import CheckoutForm from "./StripeCheckoutForm";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const fetchClientSecret = () => {
  return fetch(`${import.meta.env.VITE_LAMBDA_BASE_PATH}/payment-api`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

function App() {
  return (
    <>
      {/* <PaymentForm /> */}
      <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <CheckoutForm />
      </CheckoutProvider>
    </>
  );
}

export default App;
