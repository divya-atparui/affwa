import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      
      <Stack.Screen name="products/index" options={{ headerShown: false }} />
      <Stack.Screen name="products/[id]" options={{ headerShown: false }} />
     
    </Stack>
  );
};
export default Layout;