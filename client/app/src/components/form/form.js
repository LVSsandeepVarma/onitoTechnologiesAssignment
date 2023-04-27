import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Select, initTE } from "tw-elements";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// for tailwind elements 
initTE({ Select });

//*** */ schema for form validation only for required fields !! ***
const schema = yup.object({
    name: yup.string().required(),
    DOB: yup.string().required(),
    gender: yup.mixed().oneOf(["male", "female", "other"]).required("gender is required"),
    mobile: yup.string().length(10).required(),
    govtIDType: yup.mixed().oneOf(["Aadhar", "Pan"]).required("type required"),
    govtId: yup.string().when(["govtIDType"], {
        is: "Aadhar",
        then: () => yup.string().length(12, "aadhar should contain 12 digits").matches(/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/).required("not valid"),
        otherwise: () => yup.string().length(10, "Pan is invalid ").matches(/[A-Z]{5}\d{4}[A-Z]{1}/i).required(),
        // otherwise:yup.required(true,"invalid pan")
    }),
    emergencyContact: yup.string(),
    email: yup.string().email().required()
}).required();

function Form() {
    const { register, handleSubmit, formState: { errors } , reset} = useForm({ 
        resolver: yupResolver(schema),
        defaultValues: {
            name:"",
            DOB:"",
            gender:"",
            mobile:"",
            govtIDType:"Aadhar",
            govtId:"",
            guardianType:"Father",
            guardianName:"",
            email:"",
            emergencyContact:"",
            address:"",
            state:"",
            city:"",
            country:"",
            pincode:"",
            occupation:"",
            religion:"religionOne",
            maritialStatus:"Married",
            BloodGroup:"O+",
            nationality:""
        }
     });
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post("http://localhost:3000/user/register", data = data).then((res) => navigate("/users")).catch((err) => { console.log("err", err) })
    }
    const onFailed = (data) => {
        alert(Object.values(data)[0].message)
    }

    return (
        <div className="w-[95%] m-[5%] mr-[5%] border border-grey-500">
            <form className="w-full" onSubmit={handleSubmit(onSubmit, onFailed)}>
                {/* personal detailes fields */}
                <div className="personalDetails p-4">
                    <h2 className="font-bold text-grey-900 tet-lg mb-6 underline ">Personal Details : </h2>
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full justify-evenly">
                        <div className="flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="name">Name</label>
                            <input {...register("name", { required: true })} aria-invalid={errors.name ? true : false} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter name" id="name" />
                            {errors.name?.type === 'required' && <p className="text-red-500 font-bold" role="alert"> name is required</p>}
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="age">Date of Birth/age</label>
                            <input {...register("DOB", { required: true })} aria-invalid={errors.age ? true : false} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="DD/MM/YYYY or Age in Years" id="age" />
                            {errors.DOB?.type === 'required' && <p className="text-red-500 font-bold" role="alert"> age is required</p>}
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="gender">Sex</label>
                            <select {...register("gender", { required: true })} aria-invalid={errors.gender ? true : false} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter sex" id="gender">
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">Other</option>
                            </select>
                            {/* {errors.gender?.type==="required"&& <p className="text-red-500 font-bold" role="alert"> gender is required</p>} */}
                        </div>
                    </div>
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full justify-evenly">
                        <div className="flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="mobile">Mobile</label>
                            <input {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} aria-invalid={errors.mobile ? true : false} className="p-2  w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter Mobile" id="mobile" />
                            {errors.mobile?.type === 'required' || errors.mobile?.message.length > 0 && <p className="text-red-500 font-bold" role="alert"> {errors.mobile?.message.length > 0 ? errors.mobile?.message : "mobile is required"}</p>}
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="govtId">Govt issued ID</label>
                            <select {...register("govtIDType")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-placeholder="select id type" id="govtId">
                                <option value="Aadhar">Aadhar</option>
                                <option value="Pan">Pan</option>
                            </select>
                            {errors.govtIDType?.type === 'required' || errors.govtIDType?.message.length > 0 && <p className="text-red-500 font-bold" role="alert"> {errors.govtIDType?.message.length > 0 ? errors.govtIDType?.message : "govtIDType is required"}</p>}

                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <input {...register("govtId", { required: true, minLength: 10, maxLength: 12 })} aria-invalid={errors.govtIdNumber ? true : false} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter id number" id="govtIdNumber" />
                            {errors.govtId?.type === 'required' || errors.govtId?.message.length > 0 && <p className="text-red-500 font-bold" role="alert">{errors.govtId?.message.length > 0 ? errors.govtIdNumber?.message : "govtIdNumber is required"}</p>}
                        </div>
                    </div>
                </div>
                {/* contact details fields */}
                <div className="contactDetails p-4">
                    <h2 className="font-bold text-grey-900 tet-lg mb-6 underline ">Contact Details : </h2>
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full justify-evenly">
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="Guardian">Guardian Relation</label>
                            <select {...register("guardianType")} className="p-2 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-placeholder="select guardian relation" id="guardian">
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="other">other</option>
                            </select>
                            <input {...register("guardianName")} className="ml-2 p-2 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter guardian name" />
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="email">Email</label>
                            <input {...register("email")} type="email" className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter email" id="email" />
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="emergency">Emergency contact number</label>
                            <input {...register("emergencyContact", { minLength: 10, maxLength: 10 })} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="emergency contact number" id="emergency" />
                        </div>
                    </div>
                </div>
                {/* address details fields */}
                <div className="addressdetails p-4">
                    <h2 className="font-bold text-grey-900 tet-lg mb-6 underline ">Address Details : </h2>
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full justify-evenly">
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="Address">Address</label>
                            <input  {...register("address")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="enter your address" id="address" />
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="state">state</label>
                            <input  {...register("state")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="enter your state" id="state" />
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="city">city</label>
                            <input  {...register("city")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="enter your city" id="city" />
                        </div>
                    </div>
                    {/* row -2 */}
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full justify-start">
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="country">country</label>
                            <input  {...register("country")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="enter your country" id="country" />
                        </div>
                        <div className=" flex w-full md:w-1/3 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="pincode">pincode</label>
                            <input  {...register("pincode")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="enter your pincode" id="pincode" />
                        </div>
                    </div>
                </div>
                {/* other details */}
                <div className="otherDetails p-4">
                    <h2 className="font-bold text-grey-900 tet-lg mb-6 underline ">Other Details : </h2>
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full justify-evenly">
                        <div className=" flex w-full md:w-1/4 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="occupation">Occupation</label>
                            <input  {...register("occupation")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter your occupation" id="occupation" />
                        </div>
                        <div className=" flex w-full md:w-1/4 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="religiion">Religion</label>
                            <select  {...register("religion")} className="p-2 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-placeholder="select guardian relation" id="guardian">
                                <option value="religionOne">religion One</option>
                                <option value="religionTwo">religion Two</option>
                                <option value="religionThree">religion Three</option>
                                <option value="religionFour">don't wnat to mention</option>
                            </select>
                        </div>
                        <div className=" flex w-full md:w-1/4 px-3 mb-6 md:mb-0 justify-center items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="maritialStatus">Maritial Status</label>
                            <select   {...register("maritialStatus")} className="p-2 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-placeholder="maritial status" id="maritialStatus">
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                                <option value="Other">not to mention</option>
                            </select>
                        </div>
                        <div className=" flex w-full md:w-1/4 px-3 mb-6 md:mb-0 justify-center items-center ">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="bloodGroup">blood group</label>
                            <select  {...register("BloodGroup")} className="p-2 appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" data-te-select-placeholder="bloodGroup" id="bloodGroup">
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                    </div>
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full justify-start">
                        <div className=" flex w-full md:w-1/4 px-3 mb-6 md:mb-0 justify-start items-center">
                            <label className="uppercase tracking-wide text-gray-700 text-xs font-bold pr-[10%]" htmlFor="nationality">Nationality</label>
                            <input  {...register("nationality")} className="p-2 w-full appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Enter your nationality" id="nationality" />
                        </div>
                    </div>
                </div>
                {/* form related buttons */}
                <div className="formButtons p-4">
                    <div className=" flex flex-wrap -mx-3 mb-6 w-full md:justify-end justify-center ml-5 mr-5">
                        <button onClick={()=>{reset()}} className=" ml-5 mr-5 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-black py-2 px-4 border border-red-500 hover:border-transparent rounded">Cancel</button>
                        <input type="submit" className="mr-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}


export default Form