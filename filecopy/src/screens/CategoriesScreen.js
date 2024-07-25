import { FlatList } from 'react-native';
import { CATEGORIES } from '../data/static-data';
import CategoryGridTile from '../components/CategoryGridTile';

function CategoriesScreen({ navigation }) { // navigation is available as a prop here as this is a defined navigation screen
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('Recipes', {
        mealType: itemData.item.searchPhrase,
      });
    }
  
    return (
      <CategoryGridTile
        title={itemData.item.title}
        image={itemData.item.image}
        onPress={pressHandler}
      />
    );
  };

  return (
    <FlatList
      key={'_'}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;