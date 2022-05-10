import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  VStack,
  Flex,
  Box,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

// https://stackblitz.com/edit/react-hook-form-typescript-rmjsuw?file=App.tsx
// https://react-hook-form.com/advanced-usage#AccessibilityA11y

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

type LoginFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: LoginFormInputs) => console.log(values);

  return (
    <Box style={{ width: 350 }}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors?.email?.message} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors?.email ? (
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Email should be in the format</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.password?.message} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          {errors?.password ? (
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          ) : (
            <FormHelperText>password should be in the format</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.confirmPassword?.message} isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="confirmPassword"
            {...register("confirmPassword")}
          />

          {errors?.confirmPassword ? (
            <FormErrorMessage>
              {errors?.confirmPassword?.message}
            </FormErrorMessage>
          ) : (
            <FormHelperText>
              confirmPassword should be in the format
            </FormHelperText>
          )}
        </FormControl>

        <Button
          onClick={handleSubmit(onSubmit)}
          isFullWidth
          isLoading={isSubmitting}
          disabled={!!errors.email || !!errors.password}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

const Home = () => {
  return (
    <Flex justify="center" h="100vh" w="100vw" align="center">
      <Center w="100%">
        <LoginForm />
      </Center>
    </Flex>
  );
};

export default Home;
