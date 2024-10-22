import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Feedback = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null); // Reset any previous error

        const formData = new FormData(event.target);
        formData.append("access_key", "265b29c9-07e8-4396-8d97-e9eb0e211a06");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });
            const result = await res.json();

            if (result.success) {
                Swal.fire({
                    title: "Success!",
                    text: "Message Sent Successfully!",
                    icon: "success",
                });
                event.target.reset(); // Reset the form fields after successful submission
            } else {
                throw new Error(result.message || "Submission failed");
            }
        } catch (err) {
            setError(err.message); // Set error message to state
            Swal.fire({
                title: "Error!",
                text: error || "An unexpected error occurred.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex justify-center items-center min-h-screen py-8 dark:bg-gray-900">
            <form
                className="max-w-[600px] w-full bg-white dark:bg-gray-800 px-8 py-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                onSubmit={onSubmit}
                aria-labelledby="feedback-form-title"
            >
                <h2 id="feedback-form-title" className="text-3xl font-semibold text-center mb-6">Contact Form</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="input-box mb-4">
                    <label className="block mb-2" htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        className="field w-full h-[50px] bg-transparent border border-gray-300 dark:border-gray-600 outline-none rounded-md p-2 text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                        placeholder="Enter your name"
                        name="name"
                        required
                    />
                </div>
                <div className="input-box mb-4">
                    <label className="block mb-2" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="field w-full h-[50px] bg-transparent border border-gray-300 dark:border-gray-600 outline-none rounded-md p-2 text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                        placeholder="Enter your email"
                        name="email"
                        required
                    />
                </div>
                <div className="input-box mb-4">
                    <label className="block mb-2" htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="field w-full bg-transparent border border-gray-300 dark:border-gray-600 outline-none rounded-md p-2 text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 h-[200px] resize-none"
                        placeholder="Enter Your Message"
                        required
                    ></textarea>
                </div>
                <button
                    className={`w-full h-[55px] ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 dark:bg-blue-700"} border-none rounded-md cursor-pointer text-base text-white font-medium duration-300 hover:bg-blue-700 dark:hover:bg-blue-800`}
                    type="submit"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </section>
    );
};

export default Feedback;
