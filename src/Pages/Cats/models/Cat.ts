import Breed from './Breed';
import Category from './Category';

interface Cat {
  breeds: Breed[];
  categories: Category[];
  id: string;
  url: string;
}

export default Cat;
