import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id'),
      base_uri: 'https://api.themoviedb.org/3/tv/',
      img_uri: 'https://image.tmdb.org/t/p/w500/',
      poster_uri: 'https://image.tmdb.org/t/p/w185',
      seasons: [],
      backdrop_path: '',
      original_name: '',
      overview: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(
        this.state.base_uri +
          this.state.id +
          '?api_key=68ec3d360a218f15edc61d513c81d4ee',
      )
      .then(response => {
        const {backdrop_path, original_name, overview, seasons} = response.data;
        this.setState({
          backdrop_path,
          original_name,
          overview,
          seasons,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderRow = ({item}) => {
    return (
      <View style={Styles.card}>
        <View>
          <Image
            source={{uri: this.state.poster_uri + item.poster_path}}
            style={Styles.poster}
          />
        </View>
        <View style={{marginLeft: 8, flex: 1}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text>
          <Text style={{fontSize: 16, fontWeight: '500'}}>
            {item.air_date ? item.air_date.substr(0, 4) : null} |{' '}
            {item.episode_count} Episodes
          </Text>
          <Text>{item.overview}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <View style={Styles.backButton}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../asset/back.png')}
              style={{height: 25, width: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View>
            <Image
              source={{uri: this.state.img_uri + this.state.backdrop_path}}
              style={{width: '100%', height: 250, resizeMode: 'stretch'}}
            />
          </View>
          <View>
            <View style={{padding: 10}}>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', marginBotoom: 10}}>
                {this.state.original_name}
              </Text>
              <Text>{this.state.overview}</Text>
            </View>
            <View style={{paddingHorizontal: 5}}>
              <Text style={{paddingLeft: 5, fontSize: 20, fontWeight: 'bold'}}>
                Seasons
              </Text>
            </View>
          </View>
          <FlatList
            style={{paddingHorizontal: 5}}
            data={this.state.seasons}
            renderItem={this.renderRow}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </>
    );
  }
}

const Styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    position: 'relative',
    padding: 5,
  },
  poster: {
    width: 100,
    height: 140,
    resizeMode: 'stretch',
  },
  backButton: {position: 'absolute', left: 15, top: 15, zIndex: 2},
});

export default Detail;
