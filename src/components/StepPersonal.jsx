import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useResume } from '../context/ResumeContext'

const StepPersonal = () => {
  const { register, handleSubmit, watch, reset } = useForm()
  const {formData, setFormData } = useResume();

  const {} = useForm({
    defaultValues:{
      firstname: "",
      lastname: "",
      district:"",
      postalCode:  "",
      country: "",
      phoneNumber: "",
      email: ""
    }
  })
  

  return (
    <div className='w-full px-4 md:px-8'>
      <h2 className='text-2xl md:text-4xl font-extrabold'>Let's start with your personal info</h2>
      <p className='text-sm md:text-base'>Include your full name and multiple ways for employers to reach you.</p>

      <div className='form-wrapper w-full mt-7 p-4 rounded-md'>
        <form action="" onSubmit={handleSubmit} >
          <div className="fullname w-full flex flex-col md:flex-row gap-4">
            <div className="firstname w-full md:w-1/2">
              <label className='text-[12px] text-black'>FIRST NAME</label>
              <input
                {...register("firstname", {required:true, minLength:2})}
                placeholder='Amina '
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 '
              />
            </div>
            <div className="lastname w-full md:w-1/2">
              <label className='text-[12px] text-black'>LAST NAME</label>
              <input
                type="text"
                placeholder='Binu'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
              />
            </div>
          </div>
          <div className="location w-full flex flex-col md:flex-row gap-4 mt-2.5">
            <div className="district">
                <label className='text-[12px] text-black'>DISTRICT</label>
                <input
                type="text"
                placeholder='Port harcourt'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                />
            </div>
            <div className="Postal Code">
                <label className='text-[12px] text-black'>POSTAL CODE</label>
                <input
                type="text"
                placeholder='100271'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                />
            </div>
            <div className="country">
                <label className='text-[12px] text-black'>COUNTRY</label>
                <input
                type="text"
                placeholder='Nigeria'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                />
            </div>
          </div>
          <div className="contact w-full flex flex-col md:flex-row gap-4 mt-2.5">
                <div className="PHONE NUMBER">
                    <label className='text-[12px] text-black'>PHONE NUMBER</label>
                    <input
                    type="text"
                    placeholder='+2345678903456'
                    className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                    focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                    />
                </div>
                <div className="EMAIL">
                    <label className='text-[12px] text-black'>EMAIL</label>
                    <input
                    type="text"
                    placeholder='zoe@gmail.com'
                    className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                    focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                    />
                </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StepPersonal
