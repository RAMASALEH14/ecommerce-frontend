import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/products/ProductCard';
import { EmptyState, Button } from '../components/common/UIElements';

export default function Products() {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [priceRange, setPriceRange] = useState(1500);
  const [sortBy, setSortBy] = useState('default');
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.isActive)
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
                              p.description.toLowerCase().includes(localSearch.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesPrice = p.price <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, localSearch, selectedCategory, priceRange, sortBy]);

  const handleReset = () => {
    setLocalSearch('');
    setSelectedCategory('All');
    setPriceRange(1500);
    setSortBy('default');
    setSearchParams({});
  };

  return (
    <div className="container" style={{ padding: '30px 20px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '28px' }}>Explore Products</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px', alignItems: 'start' }}>
        {/* Filters Sidebar */}
        <aside style={{
          background: 'var(--surface-color)',
          padding: '20px',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Filter Products</h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Search</label>
            <input
              type="text"
              placeholder="Search name..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Max Price: ${priceRange}
            </label>
            <input
              type="range"
              min="20"
              max="1500"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <Button variant="outline" onClick={handleReset} style={{ width: '100%', fontSize: '13px' }}>
            Reset Filters
          </Button>
        </aside>

        {/* Products Grid */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ color: 'var(--muted-text-color)', fontSize: '14px' }}>
              Showing <b>{filteredProducts.length}</b> results
            </p>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '14px' }}
              >
                <option value="default">Sort By: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No Matching Products"
              description="Try adjusting your search query or price filter to find what you are looking for."
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}