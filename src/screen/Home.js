import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import DateGenerator from '../generator/Date';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notFilteredData: [],
      data: [],
      base_uri:
        'https://api.themoviedb.org/3/tv/popular?api_key=68ec3d360a218f15edc61d513c81d4ee',
      img_uri: 'https://image.tmdb.org/t/p/w185',
      page: 1,
      isFetching: false,
      isLoading: true,
      loadMore: false,
      search: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(this.state.base_uri + '&page=' + this.state.page)
      .then(response => {
        let newData;
        if (this.state.page === 1) {
          newData = response.data.results;
        } else {
          newData = this.state.data.concat(response.data.results);
        }
        this.setState({
          notFilteredData: newData,
          data: newData,
          isLoading: false,
          loadMore: false,
        });
      })
      .then(err => {
        console.log(err);
      });
  };

  refreshData = () => {
    this.setState({isFetching: true, isLoading: true, page: 1}, this.getData);
    this.setState({isFetching: false});
  };

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1, loadMore: true}, this.getData);
  };

  onSearch = text => {
    let newData = this.state.notFilteredData.filter(preData => {
      return preData.original_name.toLowerCase().match(text.toLowerCase());
    });
    this.setState({search: text, data: newData});
  };

  renderRow = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Detail', {id: item.id})}>
        <View style={Styles.card}>
          <View>
            <Image
              source={{uri: this.state.img_uri + item.backdrop_path}}
              style={{width: 100, height: 55}}
            />
          </View>
          <View style={{justifyContent: 'space-between', marginLeft: 8}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {item.original_name}
            </Text>
            <Text style={{fontSize: 16}}>
              <DateGenerator date={item.first_air_date} />
            </Text>
          </View>
          <View style={Styles.vote}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              {item.vote_average}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (this.state.loadMore) {
      return (
        <ActivityIndicator
          size="large"
          color="#169016"
          style={{alignSelf: 'center', marginTop: 10}}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <Text style={Styles.title}>TV SHOW</Text>
          <TextInput
            placeholder="Search TV Show"
            value={this.state.search}
            onChangeText={text => this.onSearch(text)}
            style={Styles.input}
          />
        </View>
        <View style={{flex: 1}}>
          {this.state.isLoading ? (
            <ActivityIndicator
              size="large"
              color="#169016"
              style={{alignSelf: 'center', flex: 1}}
            />
          ) : (
            <FlatList
              style={{paddingHorizontal: 5}}
              data={this.state.data}
              renderItem={this.renderRow}
              keyExtractor={item => item.id.toString()}
              onRefresh={this.refreshData}
              refreshing={this.state.isFetching}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.0001}
              ListFooterComponent={this.renderFooter}
            />
          )}
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1},
  header: {alignItems: 'center', paddingHorizontal: 10},
  title: {paddingVertical: 25, fontSize: 16, fontWeight: 'bold'},
  input: {
    backgroundColor: '#eee',
    width: '100%',
    marginBottom: 30,
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  vote: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: '#169016',
    minWidth: 27,
    alignItems: 'center',
    borderRadius: 3,
  },
  card: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    position: 'relative',
    padding: 5,
  },
});

export default Home;
