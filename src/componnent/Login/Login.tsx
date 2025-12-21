import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {

  const schemaRegister = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(8, "Min length is 5").max(12, "Max length is 12").regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain upper, lower, number & special char"),

  })


  type UserRegisterSchema = z.infer<typeof schemaRegister>;


  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      password: "",

    },
  });

  const navegate = useNavigate()

  async function signIn(values: UserRegisterSchema) {


    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email
      }));
      toast.success("Success", {
        position: "top-center",

      }
      )
      navegate("/")

    } catch (error: any) {
      toast.error("Error", {
        position: "top-center"
      })
    }

  }
  return (
    <div className='flex justify-center items-center h-screen bg-white text-black dark:bg-slate-900'>
      <div className='md:w-[45%] w-72 bg-gray-200 px-5 rounded-2xl shadow-[20px_20px_40px_rgba(0,0,0,0.3)] dark:bg-slate-800 dark:text-white'>
        <h1 className="mb-12 font-bold text-center text-3xl pt-4">Login</h1>


        <form onSubmit={handleSubmit(signIn)}>


          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="input px-4 py-2 rounded-lg bg-white
              border border-gray-300
              text-gray-800 dark:text-slate-200 placeholder-gray-400
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
              text-gray-800 dark:text-slate-200 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 w-full mb-4 dark:bg-slate-700"
            {...register("password")}
          />
          {errors?.password && touchedFields?.password && (
            <p className="mb-3 text-red-500">{errors.password.message}</p>
          )}


            <Link className="text-blue-600 ms-2" to={"/ForgotPassword"}>forget password</Link>

          {/* Submit Button */}
          <button type="submit" className=" bg-green-700 py-2 my-3 rounded-xl text-white w-full">
            {"Login"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login
