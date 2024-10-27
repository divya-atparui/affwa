import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/core';
import { Button, ControlledInput, SafeAreaView, Text, View } from '@/ui';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormType = z.infer<typeof schema>;
export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data : FormType) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <SafeAreaView>
    <View className="p-5">
      <Text className="mt-20 text-3xl font-bold">Login</Text>
      <ControlledInput
        control={control}
        name="username"
        label="Username"
        textContentType="username"
        autoCapitalize="none"
      />
      <ControlledInput
        control={control}
        name="password"
        label="Password"
        secureTextEntry
        textContentType="password"
        
      />
      <Button
        label="Login"
        onPress={handleSubmit(onSubmit)}
        // disabled={isLoading}
      />
      {/* {
        isError && <Text className="text-red-500">Invalid credentials</Text>
      } */}
    </View>
  </SafeAreaView>
  );
}
