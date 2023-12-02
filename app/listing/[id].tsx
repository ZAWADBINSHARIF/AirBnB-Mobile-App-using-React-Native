import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>This is listing page. The ID is {id}</Text>
    </View>
  );
};

export default Page;
