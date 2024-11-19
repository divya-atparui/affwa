/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import Swiper from 'react-native-swiper';

import {
  accountDetailsSchema,
  addressInfoSchema,
  contactDetailsSchema,
  personalInfoSchema,
} from '@/schema/register';
import {
  type AccountDetails,
  type AddressInfo,
  type ContactDetails,
  type PersonalInfo,
} from '@/types';
import { Button, SafeAreaView, ScrollView, Text, View } from '@/ui';
import { ControlledInput } from '@/ui'; // Your custom controlled input component
type FormType = PersonalInfo & AddressInfo & ContactDetails & AccountDetails;



export default function SignUp() {
  const swiperRef = useRef<Swiper>(null);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  console.log(currentStep);

  const { control, handleSubmit, getValues , trigger} = useForm<FormType>({
    resolver: zodResolver(
      personalInfoSchema
        .merge(addressInfoSchema)
        .merge(contactDetailsSchema)
        .merge(accountDetailsSchema),
    ),
  });
  const validateStep = async (step: number) => {

    let isValid = false
    switch (step) {
      case 0 :
        isValid = await trigger([
          'USER_TITLE',
          'USER_FIRST_NAME',
          'USER_LAST_NAME',
          'CUSTOMER_EMAIL',
        ]);
        break;
      case 1:
        isValid = await trigger([
          'CUSTOMER_ADDRESS1',
          'CUSTOMER_CITY',
          'CUSTOMER_POSTAL_CODE',
          'CUSTOMER_STATE',
          'CUSTOMER_COUNTRY',
        ]);
        break;
      case 2:
        isValid = await trigger([
          'CUSTOMER_HOME_CONTACT',
          'CUSTOMER_MOBILE_CONTACT',
        ]);
        break;
      case 3:
        isValid = await trigger(['USERNAME', 'PASSWORD', 'CONFIRM_PASSWORD']);
        break;
    }
    return isValid;
  };

  const onSubmit = async () => {
    console.log(getValues() );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex h-10 items-center justify-center">
        <Text>Hello</Text>
        <Text>If you are already a member, please 
          <Text className="text-blue-700" onPress={() => router.push('/login')}>Login</Text>
        </Text>
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        scrollEnabled={false}
        showsButtons={true}
        onIndexChanged={(index) => setCurrentStep(index)}
        onScrollBeginDrag={async (e: any) => {
          // Prevent forward swipe if validation fails
          if (e.nativeEvent.velocity.x < 0) { // Attempting to go forward
            const isValid = await validateStep(currentStep);
            if (!isValid) {
              Alert.alert('Error', 'Please fill in all required fields correctly.');
              return false;
            }
          }
          return true;
        }}
        buttonWrapperStyle={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          top: 350,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        nextButton={
          currentStep === 3 ? (
            <View className="flex w-40 items-center rounded-lg bg-blue-700 p-3">
              <Text 
                className="text-lg font-semibold text-white"
                onPress={handleSubmit(onSubmit)}
              >
                Submit
              </Text>
            </View>
          ) : (
            <View className="flex w-40 items-center rounded-lg bg-blue-700 p-3">
              <Text 
                className="text-lg font-semibold text-white"
                onPress={async () => {
                  const isValid = await validateStep(currentStep);
                  if (isValid) {
                    swiperRef.current?.scrollBy(1);
                  } else {
                    Alert.alert('Error', 'Please fill in all required fields correctly.');
                  }
                }}
              >
                Next
              </Text>
            </View>
          )
        }
        prevButton={
          currentStep > 0 ? (
            <View className="flex w-40 items-center rounded-lg bg-blue-700 p-3">
              <Text 
                className="text-lg font-semibold text-white"
                onPress={() => swiperRef.current?.scrollBy(-1)}
              >
                Back
              </Text>
            </View>
          ) : null
        }
      >
        {/* Step 1: Personal Information */}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Step 1: Personal Information
          </Text>
          <ControlledInput
            control={control}
            name="USER_TITLE"
            label="Gender (Mr, Mrs, Miss)"
          />
          <ControlledInput
            control={control}
            name="USER_FIRST_NAME"
            label="First Name"
          />
          <ControlledInput
            control={control}
            name="USER_MIDDLE_NAME"
            label="Middle Name"
          />
          <ControlledInput
            control={control}
            name="USER_LAST_NAME"
            label="Last Name"
          />
          <ControlledInput
            control={control}
            name="CUSTOMER_EMAIL"
            label="Email"
          />
          {/* <Button title="Next" onPress={onNext} /> */}
        </ScrollView>

        {/* Step 2: Address Information */}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Step 2: Address Information
          </Text>
          <ControlledInput
            control={control}
            name="CUSTOMER_ADDRESS1"
            label="Address Line 1"
          />
          <ControlledInput
            control={control}
            name="CUSTOMER_ADDRESS2"
            label="Address Line 2"
          />
          <ControlledInput
            control={control}
            name="CUSTOMER_CITY"
            label="City"
          />
          <ControlledInput
            control={control}
            name="CUSTOMER_POSTAL_CODE"
            label="Postal Code"
          />
          <ControlledInput
            control={control}
            name="CUSTOMER_STATE"
            label="State"
          />
          <ControlledInput
            control={control}
            name="CUSTOMER_COUNTRY"
            label="Country"
          />
        </ScrollView>

        {/* Step 3: Contact Details */}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Step 3: Contact Details
          </Text>
          <ControlledInput
            control={control}
            name="CUSTOMER_HOME_CONTACT"
            label="Home Contact Number"
          />
          <ControlledInput
            control={control}
            name="CUSTOMER_MOBILE_CONTACT"
            label="Mobile Number"
          />
        </ScrollView>

        {/* Step 4: Account Details */}
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Step 4: Account Details
          </Text>
          <ControlledInput control={control} name="USERNAME" label="Username" />
          <ControlledInput
            control={control}
            name="PASSWORD"
            label="Password"
            secureTextEntry
          />
          <ControlledInput
            control={control}
            name="CONFIRM_PASSWORD"
            label="Confirm Password"
            secureTextEntry
          />
          <Button label="Submit" onPress={onSubmit} />
        </ScrollView>
      </Swiper>
    </SafeAreaView>
  );
}
