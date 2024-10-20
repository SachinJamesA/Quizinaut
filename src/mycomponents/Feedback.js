import React from 'react';
import Swal from 'sweetalert2';

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "265b29c9-07e8-4396-8d97-e9eb0e211a06");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    }).then((res) => res.json());

    if (res.success) {
        Swal.fire({
            title: "Success!",
            text: "Message Sent Successfully!",
            icon: "success",
        });
    }
};

const Feedback = () => {
    return (
        <section className="flex justify-center items-center min-h-screen py-8 dark:bg-gray-900">
            <form className="max-w-[600px] w-full bg-white dark:bg-gray-800 px-8 py-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white" onSubmit={onSubmit}>
                <h2 className="text-3xl font-semibold text-center mb-6">Contact Form</h2>
                <div className="input-box mb-4">
                    <label className="block mb-2">Full Name</label>
                    <input
                        type="text"
                        className="field w-full h-[50px] bg-transparent border border-gray-300 dark:border-gray-600 outline-none rounded-md p-2 text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                        placeholder="Enter your name"
                        name="name"
                        required
                    />
                </div>
                <div className="input-box mb-4">
                    <label className="block mb-2">Email Address</label>
                    <input
                        type="email"
                        className="field w-full h-[50px] bg-transparent border border-gray-300 dark:border-gray-600 outline-none rounded-md p-2 text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                        placeholder="Enter your email"
                        name="email"
                        required
                    />
                </div>
                <div className="input-box mb-4">
                    <label className="block mb-2">Your Message</label>
                    <textarea
                        name="message"
                        className="field w-full bg-transparent border border-gray-300 dark:border-gray-600 outline-none rounded-md p-2 text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 h-[200px] resize-none"
                        placeholder="Enter Your Message"
                        required
                    ></textarea>
                </div>
                <button className="w-full h-[55px] bg-blue-600 dark:bg-blue-700 border-none rounded-md cursor-pointer text-base text-white font-medium duration-300 hover:bg-blue-700 dark:hover:bg-blue-800" type="submit">
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default Feedback;
