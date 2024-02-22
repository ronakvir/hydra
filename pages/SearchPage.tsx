import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Feather, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { ThemeContext, t } from '../contexts/ThemeContext';
import { HistoryContext } from '../contexts/HistoryContext';
import { Subreddit, getTrending } from '../api/Subreddits';
import { SearchResult, SearchType, SearchTypes, getSearchResults } from '../api/Search';
import { Post } from '../api/Posts';
import PostComponent from '../components/RedditDataRepresentations/Post/PostComponent';
import SubredditComponent from '../components/RedditDataRepresentations/Subreddit/SubredditComponent';
import List from '../components/UI/List';
import Scroller from '../components/UI/Scroller';
import UserComponent from '../components/RedditDataRepresentations/User/UserComponent';

export default function SearchPage() {
  const { theme } = useContext(ThemeContext);
  const history = useContext(HistoryContext);

  const [trending, setTrending] = useState<Subreddit[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('posts');
  const [searchResults, setSearchResults] = useState<SearchResult[]>();

  const loadSearch = async (refresh = false) => {
    if (!search) {
      setSearchResults(undefined);
      return;
    }
    if (!refresh && searchType === 'users') {
      // API only allows 1 page of search for users
      return;
    }
    const newResults = await getSearchResults(searchType, search, {
      after: refresh ? undefined : searchResults?.slice(-1)[0]?.after
    });
    if (refresh) {
      setSearchResults(newResults);
    } else {
      setSearchResults([...(searchResults ?? []), ...newResults]);
    }
  }

  const loadTrending = async () => {
    const newTrending = await getTrending();
    setTrending(newTrending.filter(sub => !sub.subscribed && sub.name !== 'Home'));
  }

  useEffect(() => { loadTrending() }, []);

  useEffect(() => { loadSearch(true) }, [searchType]);

  return (
    <View style={t(styles.searchContainer, {
      backgroundColor: theme.background,
    })}>
      <View style={styles.searchOptionsContainer}>
        {SearchTypes.map(type => (
          <TouchableOpacity
            key={type}
            style={t(styles.searchOption, {
              backgroundColor: searchType === type ? theme.tint : 'transparent',
            })}
            activeOpacity={0.8}
            onPress={() => setSearchType(type)}
          >
            <Text
              key={type}
              style={t(styles.searchOptionText, {
                color: theme.text,
              })}
            >
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={t(styles.searchBarContainer, {
        backgroundColor: theme.tint,
      })}>
        <AntDesign name="search1" size={18} color={theme.text} style={styles.searchBarIcon}/>
        <TextInput
          style={t(styles.searchBar, {
            color: theme.text,
          })}
          returnKeyType='search'
          value={search}
          onChangeText={setSearch}
          onBlur={() => loadSearch(true)}
        />
      </View>
      <Scroller
        loadMore={loadSearch}
        beforeLoad={
          !searchResults && (
            <List
              title='Trending Subreddits'
              items={trending.map(sub => ({
                key: sub.id,
                icon: <Feather name='trending-up' size={22} color={theme.iconPrimary}/>,
                text: sub.name,
                onPress: () => history.pushPath(sub.url),
              }))}
            />
          )
        }
      >
        {searchResults && searchResults.map(result => {
          if (result.type === 'post')
            return <PostComponent key={result.id} initialPostState={result}/>
          if (result.type === 'subreddit')
            return <SubredditComponent key={result.id} subreddit={result}/>
            if (result.type === 'user')
              return <UserComponent key={result.id} user={result}/>
        })}
      </Scroller>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  searchOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 5,
  },
  searchOption: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  searchOptionText: {

  },
  searchBarContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 7,
    paddingLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  loaderContainer: {
    marginTop: 20,
  },
  trendingContainer: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
