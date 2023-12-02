import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import useWarmUpBrowser from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

enum Strategy {
  APPLE = 'oauth_apple',
  GOOGLE = 'oauth_google',
  FACEBOOK = 'oauth_facebook',
}

export default function Page() {
  useWarmUpBrowser();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: 'oauth_facebook',
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.APPLE]: appleAuth,
      [Strategy.GOOGLE]: googleAuth,
      [Strategy.FACEBOOK]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: '#000',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text style={styles.seperator}>or</Text>

        <View
          style={{
            flex: 1,
            borderBottomColor: '#000',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={defaultStyles.btnOutline}>
          <Ionicons
            name='call-outline'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={defaultStyles.btnOutlineText}>Contiune with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.btnOutline}
          onPress={() => onSelectAuth(Strategy.APPLE)}
        >
          <Ionicons
            name='md-logo-apple'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={defaultStyles.btnOutlineText}>Contiune with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.btnOutline}
          onPress={() => onSelectAuth(Strategy.GOOGLE)}
        >
          <Ionicons
            name='md-logo-google'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={defaultStyles.btnOutlineText}>Contiune with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.btnOutline}
          onPress={() => onSelectAuth(Strategy.FACEBOOK)}
        >
          <Ionicons
            name='md-logo-facebook'
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={defaultStyles.btnOutlineText}>
            Contiune with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    color: Colors.grey,
    fontFamily: 'mon-sb',
  },
});
