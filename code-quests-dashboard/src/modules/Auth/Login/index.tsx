import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../../shared/components/atoms";
import { Loader2 } from "lucide-react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Too short!").required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    const fakeToken = "mocked-jwt-token-" + Date.now();
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userEmail", values.email);

    toast.success("Login successful");
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <div
      className="max-w-md w-full mx-auto p-6 bg-white rounded-lg 
      sm:max-w-sm sm:p-4 
      md:max-w-md md:p-6
      lg:max-w-lg
      flex flex-col justify-center  
      "
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full py-2 text-base sm:text-sm flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
