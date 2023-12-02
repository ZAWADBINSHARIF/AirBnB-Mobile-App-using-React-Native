import { View, Text } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
      <StatusBar style='dark' />

      <Link href={'/(modal)/booking'}>Bookings</Link>
      <Link href={'/(modal)/login'}>Login</Link>
      <Link href={'/listing/1122'}>listing</Link>
    </View>
  );
}
