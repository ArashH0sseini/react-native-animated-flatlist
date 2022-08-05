import { View, FlatList, Image, Text, StatusBar, StyleSheet, Dimensions, Animated } from 'react-native';

import { faker } from '@faker-js/faker';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    kay: faker.datatype.uuid(),
    image: faker.image.avatar(),
    name: faker.internet.userName(),
    company: faker.company.companyName(),
    email: faker.internet.email(),
  }
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BG_IMG = require('./assets/background.jpeg')
const SPACING = 20;
const AVATAR_SIZE = 70

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={BG_IMG}
        style={{
          width: windowWidth, height: windowHeight, position: "absolute",
        }}
        blurRadius={80}
      />
      <FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={item => item.kay}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42
        }}
        renderItem={({ item }) => {
          return <View
            style={styles.shadowProp}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
                marginRight: SPACING / 2
              }}
            />
            <View>
              <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ fontSize: 18, opacity: .7 }}>{item.company}</Text>
              <Text style={{ fontSize: 14, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
            </View>
          </View >
        }}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  shadowProp: {
    flexDirection: 'row', padding: SPACING,
    marginBottom: SPACING, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})

export default App;