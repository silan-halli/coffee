import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';

// Importing necessary modules and components

const FavoritesScreen = ({navigation}: any) => {
  // The main functional component for the Favorites screen

  const FavoritesList = useStore((state: any) => state.FavoritesList);
  // Accessing the list of favorite items from the store

  const tabBarHeight = useBottomTabBarHeight();
  // Getting the height of the bottom tab bar to adjust the layout

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
  // Functions to add or delete items from the favorite list

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  // Toggle function to add or remove an item from the favorites list

  return (
    <View style={styles.ScreenContainer}>
      {/* Main container view with styles applied */}
      
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {/* Setting the status bar background color */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* ScrollView to enable vertical scrolling and hide the scrollbar */}
        
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          {/* Inner view with styles applied, adjusting margin for the tab bar height */}
          
          <View style={styles.ItemContainer}>
            {/* Container for the items */}
            
            <HeaderBar title="Favourites" />
            {/* Header bar with the title "Favourites" */}
            
            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'No Favourites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {/* If the list is empty, show an animation with "No Favourites" */}
                {/* If the list is not empty, map through the list and render each item */}
                
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    {/* Touchable component to navigate to the details screen on press */}
                    
                    <FavoritesItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favourite={data.favourite}
                      ToggleFavouriteItem={ToggleFavourite}
                    />
                    {/* Favorites item card component with all the necessary props */}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Defining the styles for the components

  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    // The main container view with full flex and a black background color
  },
  ScrollViewFlex: {
    flexGrow: 1,
    // Ensures the ScrollView grows to fit its content
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
    // Inner view with full flex and content spaced between
  },
  ItemContainer: {
    flex: 1,
    // Container for the items with full flex
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
    // Container for the list items with horizontal padding and gap between items
  },
});

export default FavoritesScreen;

