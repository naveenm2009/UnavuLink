import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { FoodListingCard } from '../../components/cards/FoodListingCard';
import { TN_CITIES } from '../../components/maps/TamilNaduMap';
import { Search, Filter, UtensilsCrossed, Sparkles } from 'lucide-react';

export const ExploreFoodPage: React.FC = () => {
  const { listings, requestFood } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.food_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pickup_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batch_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || item.food_category === selectedCategory;
    const matchesDiet = selectedDiet === 'all' || item.dietary_category === selectedDiet;
    const matchesCity =
      selectedCity === 'all' || item.pickup_location.toLowerCase().includes(selectedCity.toLowerCase());

    return matchesSearch && matchesCategory && matchesDiet && matchesCity;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle">
        <h2 className="text-2xl font-extrabold text-deepCharcoal">
          Explore Available Food Surplus
        </h2>
        <p className="text-xs text-mutedGrey mt-1">
          Surplus food batches cleared by the automated Food Safety Gate across Tamil Nadu
        </p>

        {/* Filter Controls */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-mutedGrey absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by meal, batch ID, or area..."
              className="w-full bg-warmCream/50 border border-softSage rounded-xl pl-9 pr-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-warmCream/50 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
          >
            <option value="all">All Food Categories</option>
            <option value="cooked_meals">Cooked Meals</option>
            <option value="bakery_items">Bakery Items</option>
            <option value="raw_produce">Raw Produce</option>
            <option value="dairy">Dairy Products</option>
          </select>

          {/* Dietary Filter */}
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
            className="bg-warmCream/50 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
          >
            <option value="all">All Dietary Types</option>
            <option value="veg">Pure Veg (சைவம்)</option>
            <option value="non_veg">Non-Veg (அசைவம்)</option>
          </select>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-warmCream/50 border border-softSage rounded-xl px-3 py-2 text-deepCharcoal font-medium outline-none focus:ring-2 focus:ring-forest"
          >
            <option value="all">All Tamil Nadu Regions</option>
            {TN_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-mutedGrey">
        <span>Showing {filteredListings.length} surplus batches</span>
        <span className="font-semibold text-forest">Updated live with active countdown timers</span>
      </div>

      {/* Grid of Listings */}
      {filteredListings.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-softSage text-center space-y-2">
          <UtensilsCrossed className="w-10 h-10 text-mutedGrey mx-auto" />
          <h4 className="font-bold text-base text-deepCharcoal">No surplus matches found</h4>
          <p className="text-xs text-mutedGrey">
            Try adjusting your search criteria or clear filters to view all active food batches.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <FoodListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
