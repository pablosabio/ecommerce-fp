import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductsGrid } from '../components/Cards';
import { products } from '../data/products';

const CategoryPage = () => {
  const { category } = useParams();
  
  const formatCategoryName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="container mx-auto p-4 md:p-8 mt-16 md:mt-20 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          {formatCategoryName(category)} Products
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore our selection of {categoryProducts.length} {category.toLowerCase()} products
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <ProductsGrid 
          title="" 
          productList={categoryProducts} 
        />
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">No products found in this category.</p>
          <p className="text-gray-400 mt-2">Please check back later or explore other categories.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;