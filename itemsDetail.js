import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Linking,
  Button,
} from 'react-native';
import {Card, Title, Paragraph, Searchbar} from 'react-native-paper';
import {SliderBox} from 'react-native-image-slider-box';

export default class itemsDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree', // Network image
        // require('./images/cr.png'), // Local image
      ],
    };
  }

  render() {
    const {Title, DDate, Price, Contact, Description, image} =
      this.props.route.params;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        {/* <SliderBox images={this.state.images} /> */}
        <Card>
          <Card.Cover
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/demoprooject.appspot.com/o/tomas-jasovsky-d5SZqLkpIrY-unsplash.jpg?alt=media&token=fb3e0eac-88b1-48c7-886b-4d458de9e192',
            }}
          />
        </Card>
        <View style={{padding: 14}}>
          <Text
            style={{
              fontSize: 25,
            }}>
            {Title}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}>
            ${Price}
          </Text>
          <View
            style={{
              marginTop: '11%',
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <Image style={styles.image} source={require('./images/crr.png')} />
            <View
              style={{
                marginTop: '3%',
                marginLeft: 10,
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{Name}</Text>
              <Text
                style={{
                  color: 'grey',
                }}>
                RajputHamza@gmail.com
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: '3%',
              alignItems: 'center',
            }}>
            <TextInput style={styles.input} placeholder="First Name" />
            <TouchableOpacity
              style={[styles.loginBtn, {backgroundColor: '#f34a50'}]}
              onPress={() => Linking.openURL(`tel:${Contact}`)}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                }}>
                Contact Seller
              </Text>
            </TouchableOpacity>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{
                marginTop: '9%',
                width: Dimensions.get('window').width,
                height: '44%',
              }}
              region={{
                latitude: 31.5525,
                longitude: 74.3653,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={{latitude: 31.5525, longitude: 74.3653}}
                title={Name}
                description={'My Location'}
              />
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    width: 40,
    height: 60,
  },
  input: {
    width: '90%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '11%',
    marginBottom: '-6%',

    backgroundColor: '#ffe9ff',
  },
  container: {
    padding: '5%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  error: {
    borderWidth: 4,
    borderColor: 'red',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '90%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#ff141e',
  },
  image: {
    width: '15.8%',
    height: '120%',
  },
  labelInputText: {
    textAlign: 'left',
    marginVertical: 10,
    fontSize: 13,
  },
});
