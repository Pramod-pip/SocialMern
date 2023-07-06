import * as React from "react";
import * as Yup from "yup";
import {
  TextField,
  Avatar,
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RegisterAPI } from "../../apis/Autentication";
import { useNavigate, Link } from "react-router-dom";

const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    RegisterAPI(values);
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Stack spacing={3}>
                      <div>
                        <Field
                          as={TextField}
                          type="text"
                          label="Full Name"
                          name="fullName"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div>
                        <Field
                          as={TextField}
                          type="email"
                          label="Email"
                          name="email"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div>
                        <Field
                          as={TextField}
                          type="password"
                          label="Password"
                          name="password"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div>
                        <Field
                          as={TextField}
                          type="password"
                          label="Confirm Password"
                          name="confirmPassword"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="error"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Register
                      </Button>
                      <Link to="/"> If already Registered. Please Login</Link>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
