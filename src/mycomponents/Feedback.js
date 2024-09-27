import React from 'react'
// import Navbar from './Navbar'
import Swal from 'sweetalert2'

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
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
        Swal.fire({
            title: "Success!",
            text: "Message Sent Successfully!",
            icon: "success"
        });    
    }
  };

const Feedback = () => {
  return (
    // <Navbar/>
    <section className='flex justify-center items-center'>
    <form className='max-w-[600px] w-full bg-[#F4F4F4] px-[30px] py-[25px] rounded-[8px] boxShadowContact text-[#333] m-[25px]'  onSubmit={onSubmit}>
        <h2 className='text-3xl text-center'>Contact Form</h2>
        <div className="input-box mt-20px ">
            <label>Full Name</label>
            <input type="text" className="field w-full h-[50px] bg-transparent border-2 border-solid border-[#ddd] outline-none rounded-[6px] p-[15px] text-base text-[#333] mt-2" placeholder='Enter your name' name='name' required />
        </div>
        <div className="input-box mt-20px ">
            <label>Email Address</label>
            <input type="emali" className="field w-full h-[50px] bg-transparent border-2 border-solid border-[#ddd] outline-none rounded-[6px] p-[15px] text-base text-[#333] mt-2" placeholder='Enter your email' name='email' required />
        </div>
        <div className="input-box mt-20px ">
            <label>Your Message</label>
            <textarea name="message" className="field mess w-full bg-transparent border-2 border-solid border-[#ddd] outline-none rounded-[6px] p-[15px] text-base text-[#333] mt-2 h-[200px] resize-none" placeholder='Enter Your Message' required></textarea>
        </div>
        <button className='w-full h-[55px] bg-[#E93740] border-none rounded-[6px] boxShadowContact cursor-pointer text-base text-white font-medium mt-[25px] duration-[0.5s] hover:bg-[#fc5961]' type='submit'>Send Message</button>
    </form>
</section>
  )
}

export default Feedback