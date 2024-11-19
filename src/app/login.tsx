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

  const onSubmit = (data: FormType) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };

  return (
    <SafeAreaView>
      <View className=" h-full w-full justify-center px-10">
        {/* Affwa Branding Section */}
        <View className="items-center ">
          <Text className="mb-10 text-4xl font-bold">Affwa</Text>
          {/* Uncomment and provide the source for the image */}
          {/* <Image 
            source={require('@/assets/affwa-logo.png')} 
            style={{ width: 100, height: 100, marginTop: 10 }} 
          /> */}
        </View>
      
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
        <View className='my-10 flex-row items-center justify-center'>
        <Text className='text-xl'>
          If you are not registered, please <Text className='text-xl text-blue-500' onPress={() => router.push('/register')}>register</Text>
        </Text>
        </View>

        {/* Display error messages (if needed) */}
        
        {/* {
          isError && <Text className="text-red-500">Invalid credentials</Text>
        } */}
      </View>
    </SafeAreaView>
  );
}
