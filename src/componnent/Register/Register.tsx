import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase"; 
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Register = () => {

  const navegate = useNavigate()


    const schemaRegister = z.object({
    name: z.string().min(3, "Min length is 3").max(20, "Max length is 20"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(8, "Min length is 5").max(12, "Max length is 12").regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain upper, lower, number & special char"),
    rePassword: z.string().min(8, "Min length is 5").max(12, "Max length is 12").regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain upper, lower, number & special char"),
      phone: z.string().regex(/^01[0-9]{9}$/,"Invalid Egyptian phone number" ),
   
  })
    .refine((values) => values.password === values.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

      type UserRegisterSchema = z.infer<typeof schemaRegister>;


    const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone:"",

    },
  });
  async function signUp(values: UserRegisterSchema) {


 try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: values.name,
      email: values.email,
      phone: values.phone,
      createdAt: new Date(),
    });

     toast.success("Success", {
        position: "top-center",

      }
    )
          navegate("/login")



  } catch (error: any) {
    console.error(error.code, error.message);
    
    toast.error(error.message ,{
      position:"top-center"
    })
  }    

  }

  return (
    <div className='flex justify-center items-center h-screen bg-white text-black dark:bg-slate-900 '>
      <div className='md:w-[45%] w-72 bg-gray-200 px-5 rounded-2xl shadow-[20px_20px_40px_rgba(0,0,0,0.3)] dark:bg-slate-800 dark:text-white'>
              <h1 className="mb-12 font-bold text-center text-3xl pt-4">Register Now</h1>


        <form onSubmit={handleSubmit(signUp)}>
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          id="name"
          className="input px-4 py-2 rounded-lg bg-white
              border border-gray-300
              text-gray-800 dark:text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 w-full mb-4 dark:bg-slate-700"
          {...register("name")}
        />
        {errors?.name && touchedFields?.name && (
          <p className="mb-3 text-red-500">{errors.name.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="input px-4 py-2 rounded-lg bg-white
              border border-gray-300
              text-gray-800 dark:text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 w-full mb-4 dark:bg-slate-700"
          {...register("email")}
        />
        {errors?.email && touchedFields?.email && (
          <p className="mb-3 text-red-500">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="input px-4 py-2 rounded-lg bg-white
              border border-gray-300
              text-gray-800 dark:text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 w-full mb-4 dark:bg-slate-700"
          {...register("password")}
        />
        {errors?.password && touchedFields?.password && (
          <p className="mb-3 text-red-500">{errors.password.message}</p>
        )}

        {/* RePassword */}
        <input
          type="password"
          placeholder="Repassword"
          id="rePassword"
          className="input px-4 py-2 rounded-lg bg-white
              border border-gray-300
              text-gray-800 dark:text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 w-full mb-4 dark:bg-slate-700"
          {...register("rePassword")}
        />
        {errors?.rePassword && touchedFields?.rePassword && (
          <p className="mb-3 text-red-500">{errors.rePassword.message}</p>
        )}



        {/* Email */}
        <input
          type="tel"
          placeholder="Phone Number"
          id="phone"
          className="input px-4 py-2 rounded-lg bg-white
              border border-gray-300
              text-gray-800 dark:text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 w-full mb-4 dark:bg-slate-700"
          {...register("phone")}
        />
        {errors?.phone && touchedFields?.phone && (
          <p className="mb-3 text-red-500">{errors.phone.message}</p>
        )}

        
        {/* Submit Button */}
        <button type="submit" className=" bg-green-700 py-2 my-3 rounded-xl text-white w-full">
          {"Register"}
        </button>
      </form>
        
      </div>
    </div>
  )
}

export default Register
