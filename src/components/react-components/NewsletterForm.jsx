import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Por favor, ingresa un email válido.");
      return;
    }
    const apiKey = import.meta.env.PUBLIC_API_KEY;
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/suscribers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        const error = await response.json();

        toast.error(error.message);
        setEmail("");
        throw new Error("Error al suscribirse");
      } else {
        toast.success("Te has suscrito correctamente");
        setEmail("");
      }
    } catch (error) {
      setEmail("");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="flex gap-4 font-semibold" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="ingresa tu email"
          className="px-4 py-2 xl:w-full text-black"
          name="NewsLetter"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          className="w-32 border-2 border-white px-4 py-2 hover:bg-slate-50 hover:text-black cursor-pointer transition flex items-center justify-center"
          value="Ingresar"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div
              className="w-6 h-6 rounded-full border-4 border-blue-200 border-r-orange-500 animate-spin"
              style={{ borderRightColor: "black" }}
            ></div>
          ) : (
            "Ingresar"
          )}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default NewsletterForm;
