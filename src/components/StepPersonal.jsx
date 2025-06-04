import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useResume } from '../context/ResumeContext'

const StepPersonal = ({formData, updateFormData}) => {

  const {register, watch, formState:{ errors}} = useForm({
    mode: "onChange",
    defaultValues: { 
      firstname: formData.personal?.firstname || '',
      lastname: formData.personal?.lastname || '',
      district: formData.personal?.district || '',
      postalCode: formData.personal?.postalCode || '',
      country: formData.personal?.country || '',
      phoneNumber: formData.personal?.phoneNumber || '',
      email: formData.personal?.email || ''
    }
  })
  
  const watchedPersonal = watch();
  // Update the form data in the context whenever personal info changes

  useEffect(() => {
    updateFormData("personal", watchedPersonal);

  },[watchedPersonal, updateFormData]);

  return (
    <div className='w-full px-4 md:px-8'>
      <h2 className='text-2xl md:text-4xl font-extrabold'>Let's start with your personal info</h2>
      <p className='text-sm md:text-base'>Include your full name and multiple ways for employers to reach you.</p>

      <div className='form-wrapper w-full mt-7 p-4 rounded-md'>
        <form >
          <div className="fullname w-full flex flex-col md:flex-row gap-4">
            <div className="firstname w-full md:w-1/2">
              <label className='text-[12px] text-black'>FIRST NAME</label>
              <input
                {...register("firstname", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  }
                })}
                placeholder='Amina '
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 '
              />
              {errors.firstname && <span className='text-red-500 text-sm'>{errors.firstname.message}</span>}
            </div>
            <div className="lastname w-full md:w-1/2">
              <label className='text-[12px] text-black'>LAST NAME</label>
              <input
              {...register("lastname", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters"
                }
              })}
                type="text"
                placeholder='Binu'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
              />
              {errors.lastname && <span className='text-red-500 text-sm'>{errors.lastname.message}</span>}
            </div>
          </div>
          <div className="location w-full flex flex-col md:flex-row gap-4 mt-2.5">
            <div className="district">
                <label className='text-[12px] text-black'>DISTRICT</label>
                <input
                {...register("district", {
                  required: "District is required",
                  minLength: {
                    value: 2,
                    message: "District must be at least 2 characters"
                  }
                })}
                type="text"
                placeholder='Port harcourt'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                />
                {errors.district && <span className='text-red-500 text-sm'>{errors.district.message}</span>}
            </div>
            <div className="Postal Code">
                <label className='text-[12px] text-black'>POSTAL CODE</label>
                <input
                {...register("postalCode", {
                  required: "Postal code is required",
                  minLength:{
                    value: 5,
                    message: "Postal code must be at least 5 characters"
                  }
                })}
                type="text"
                placeholder='100271'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                />
                {errors.postalCode && <span className='text-red-500 text-sm'>{errors.postalCode.message}</span>}
            </div>
            <div className="country">
                <label className='text-[12px] text-black'>COUNTRY</label>
                <input
                {...register("country", {
                  required: "Country is required",
                  minLength: {
                    value: 2,
                    message: "Country must be at least 2 characters"
                  }
                })}
                type="text"
                placeholder='Nigeria'
                className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                />
                {errors.country && <span className='text-red-500 text-sm'>{errors.country.message}</span>}
            </div>
          </div>
          <div className="contact w-full flex flex-col md:flex-row gap-4 mt-2.5">
                <div className="PHONE NUMBER">
                    <label className='text-[12px] text-black'>PHONE NUMBER</label>
                    <input
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[0-9]{10,15}$/,
                        message: "Phone number must be between 10 to 15 digits"
                      }
                    })}
                    type="text"
                    placeholder='+2345678903456'
                    className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                    focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                    />
                    {errors.phoneNumber && <span className='text-red-500 text-sm'>{errors.phoneNumber.message}</span>}
                </div>
                <div className="EMAIL">
                    <label className='text-[12px] text-black'>EMAIL</label>
                    <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address"
                      }
                    })}
                    type="text"
                    placeholder='zoe@gmail.com'
                    className='w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none 
                    focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 focus:shadow-lg shadow-sky-100'
                    />
                    {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
                </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StepPersonal
