import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { analyzeFoodImageWithGemini } from '../../services/geminiService';
import { TN_CITIES } from '../maps/TamilNaduMap';
import {
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Thermometer,
  ShieldCheck,
  MapPin,
  Info,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DonateFoodForm: React.FC = () => {
  const { user } = useAuth();
  const { addFoodListing } = useData();
  const navigate = useNavigate();

  // Form State
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [foodCategory, setFoodCategory] = useState<any>('cooked_meals');
  const [dietaryCategory, setDietaryCategory] = useState<any>('veg');
  const [quantity, setQuantity] = useState<number>(30);
  const [unit, setUnit] = useState<any>('kg');
  const [estimatedPortions, setEstimatedPortions] = useState<number>(75);
  const [storageCondition, setStorageCondition] = useState<any>('hot_holding');
  const [temperature, setTemperature] = useState<number>(65);
  const [storageInfo, setStorageInfo] = useState('Insulated thermal containers (>= 60°C)');
  const [ingredients, setIngredients] = useState('Rice, Dal, Vegetables, Ghee, Spices');
  const [allergens, setAllergens] = useState<string[]>(['mustard']);
  const [packagingInfo, setPackagingInfo] = useState('Stainless food-grade containers sealed with clamps');
  const [handlingInfo, setHandlingInfo] = useState('Maintain temperature. Handle with food safety gloves.');
  const [pickupLocation, setPickupLocation] = useState('Avinashi Road, Peelamedu, Coimbatore');
  const [selectedCity, setSelectedCity] = useState('Coimbatore');
  const [latitude, setLatitude] = useState(11.0284);
  const [longitude, setLongitude] = useState(77.0104);
  const [prepTime, setPrepTime] = useState(new Date().toISOString().slice(0, 16));
  const [deadlineHours, setDeadlineHours] = useState(4); // 4 hours permitted window for cooked food

  // AI Vision Assistant State
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [aiAnalysisNotes, setAiAnalysisNotes] = useState<string | null>(null);

  // Safety Checklist
  const [safetyChecklist, setSafetyChecklist] = useState({
    freshlyCooked: true,
    safeStorage: true,
    cleanPackaging: true,
    timeVerified: true,
    allergensDeclared: true,
  });

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const city = TN_CITIES.find((c) => c.name === cityName);
    if (city) {
      setLatitude(city.coords[0]);
      setLongitude(city.coords[1]);
      setPickupLocation(`${cityName} Center, Tamil Nadu`);
    }
  };

  // Trigger Gemini AI Image Extraction Simulation
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    try {
      const result = await analyzeFoodImageWithGemini(file);
      setFoodName(result.suggestedFoodName);
      setFoodCategory(result.suggestedCategory);
      setDietaryCategory(result.suggestedDietary);
      setEstimatedPortions(result.estimatedPortions);
      setStorageCondition(result.suggestedStorageCondition);
      setIngredients(result.identifiedIngredients.join(', '));
      setAllergens(result.suggestedAllergens);
      setAiAnalysisNotes(result.aiNotes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify all safety checkboxes are confirmed
    const allChecked = Object.values(safetyChecklist).every(Boolean);
    if (!allChecked) {
      alert('All food safety compliance checkpoints must be verified before listing surplus.');
      return;
    }

    const permittedDeadline = new Date(Date.now() + deadlineHours * 3600000).toISOString();

    const created = addFoodListing({
      donor_id: user?.id || 'd0000000-0000-0000-0000-000000000001',
      donor_name: user?.full_name || 'Verified Donor',
      food_name: foodName,
      description,
      image_path:
        foodCategory === 'bakery_items'
          ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
          : foodCategory === 'raw_produce'
          ? 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
          : 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
      food_category: foodCategory,
      dietary_category: dietaryCategory,
      quantity,
      unit,
      estimated_portions: estimatedPortions,
      preparation_time: new Date(prepTime).toISOString(),
      storage_information: storageInfo,
      storage_condition: storageCondition,
      current_temperature_celsius: temperature,
      ingredients,
      allergens,
      packaging_information: packagingInfo,
      handling_information: handlingInfo,
      permitted_handling_deadline: permittedDeadline,
      pickup_location: pickupLocation,
      latitude,
      longitude,
      pickup_start: new Date().toISOString(),
      pickup_end: permittedDeadline,
      safety_status: 'eligible',
      listing_status: 'available',
    });

    navigate(`/passport/${created.batch_id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      {/* Title & Guidelines */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-deepCharcoal">
              Register Surplus Food Donation
            </h2>
            <p className="text-xs text-mutedGrey mt-1">
              Food Safety First • Automatic QR Passport Generation • FairShare Matching
            </p>
          </div>
          <span className="text-xs font-bold text-forest bg-forest/10 px-3 py-1 rounded-full border border-forest/20">
            Verified Donor Portal
          </span>
        </div>
      </div>

      {/* AI Vision Assistant Section */}
      <div className="bg-gradient-to-r from-forest/5 via-warmCream to-warmOrange/10 p-5 rounded-2xl border border-softSage shadow-subtle">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-6 h-6 text-warmOrange shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-deepCharcoal">
                AI-Assisted Food Image Understanding (Gemini Vision)
              </h4>
              <span className="text-[10px] uppercase font-bold tracking-wider text-mutedGrey bg-white px-2 py-0.5 rounded shadow-sm">
                Optional Assistant
              </span>
            </div>
            <p className="text-xs text-mutedGrey mt-1">
              Upload a photograph of your surplus food containers. Gemini Vision extracts suggested food categories, estimated portions, and ingredients. You must verify all suggested details before publishing.
            </p>

            <div className="mt-3 flex items-center gap-3">
              <label className="cursor-pointer bg-white hover:bg-warmCream/60 border border-softSage px-3.5 py-2 rounded-xl text-xs font-bold text-deepCharcoal flex items-center gap-2 shadow-sm transition">
                <Upload className="w-4 h-4 text-forest" />
                {isAnalyzingImage ? 'Analyzing with Gemini...' : 'Upload Food Photograph'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {aiAnalysisNotes && (
                <span className="text-xs font-semibold text-statusGreen flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Gemini draft extracted! Please confirm fields below.
                </span>
              )}
            </div>

            {aiAnalysisNotes && (
              <div className="mt-3 p-3 bg-white/90 rounded-xl border border-softSage text-xs text-deepCharcoal">
                <strong className="text-forest block mb-1">Gemini Vision Observation:</strong>
                {aiAnalysisNotes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 1: Food Details */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-mutedGrey">
          1. Food Batch Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Food Item / Feast Name *
            </label>
            <input
              type="text"
              required
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g. Sambar Rice, Potato Poriyal & Appalam"
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Food Category *
            </label>
            <select
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            >
              <option value="cooked_meals">Cooked Meals (Hot Buffet / Banquet)</option>
              <option value="bakery_items">Bakery Items (Bread, Loaves, Puffs)</option>
              <option value="raw_produce">Raw Produce (Fresh Fruits & Vegetables)</option>
              <option value="dairy">Dairy (Chilled Milk, Curd, Paneer)</option>
              <option value="packaged_groceries">Packaged Groceries</option>
              <option value="buffet_spread">Buffet Spread (Assorted items)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Dietary Category *
            </label>
            <select
              value={dietaryCategory}
              onChange={(e) => setDietaryCategory(e.target.value)}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            >
              <option value="veg">Pure Vegetarian (சைவம்)</option>
              <option value="non_veg">Non-Vegetarian (அசைவம்)</option>
              <option value="vegan">Vegan</option>
              <option value="halal">Halal</option>
              <option value="jain">Jain (No Root Vegetables)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-deepCharcoal mb-1">
                Quantity & Unit *
              </label>
              <div className="flex space-x-1">
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-2/3 bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-1/3 bg-warmCream/40 border border-softSage rounded-xl px-2 py-2 text-xs text-deepCharcoal font-medium"
                >
                  <option value="kg">kg</option>
                  <option value="portions">portions</option>
                  <option value="litres">litres</option>
                  <option value="boxes">boxes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-deepCharcoal mb-1">
                Estimated Portions *
              </label>
              <input
                type="number"
                min="1"
                required
                value={estimatedPortions}
                onChange={(e) => setEstimatedPortions(Number(e.target.value))}
                className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-deepCharcoal mb-1">
            Food Description & Context
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Surplus from 350-guest marriage reception. Untouched, kept covered in thermal containers."
            className="w-full bg-warmCream/40 border border-softSage rounded-xl p-3 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
          />
        </div>
      </div>

      {/* Section 2: Storage & Food Safety Gate Check */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-mutedGrey flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-forest" /> 2. Storage & Food Safety Gate Data
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Storage Condition *
            </label>
            <select
              value={storageCondition}
              onChange={(e) => setStorageCondition(e.target.value)}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            >
              <option value="hot_holding">Hot Holding (&gt;= 60°C)</option>
              <option value="refrigerated">Chilled / Refrigerated (0°C - 5°C)</option>
              <option value="ambient">Ambient Dry Counter</option>
              <option value="frozen">Frozen (&lt;= -18°C)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Current Temperature (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Permitted Handling Window (Hours) *
            </label>
            <select
              value={deadlineHours}
              onChange={(e) => setDeadlineHours(Number(e.target.value))}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            >
              <option value={2}>2 Hours (Urgent Hot Rescue)</option>
              <option value={4}>4 Hours (Standard Safe Window)</option>
              <option value={8}>8 Hours (Chilled Dairy/Produce)</option>
              <option value={24}>24 Hours (Bakery / Dry Goods)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Ingredients Declared
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Allergens (comma separated)
            </label>
            <input
              type="text"
              value={allergens.join(', ')}
              onChange={(e) =>
                setAllergens(
                  e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="e.g. mustard, dairy, gluten, nuts"
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Tamil Nadu Pickup Location */}
      <div className="bg-white p-6 rounded-2xl border border-softSage shadow-subtle space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-mutedGrey flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-forest" /> 3. Tamil Nadu Pickup Location & Dispatch
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Tamil Nadu City / District *
            </label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            >
              {TN_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-deepCharcoal mb-1">
              Detailed Pickup Address & Landmark *
            </label>
            <input
              type="text"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-warmCream/40 border border-softSage rounded-xl px-3 py-2 text-xs text-deepCharcoal font-medium focus:ring-2 focus:ring-forest outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Mandatory Food Safety Gate Compliance Checkboxes */}
      <div className="bg-forest/5 p-6 rounded-2xl border border-forest/20 space-y-3">
        <h4 className="font-bold text-sm text-forest flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-forest" />
          Mandatory Food Safety Gate Compliance Checklist
        </h4>
        <p className="text-xs text-mutedGrey">
          Under Tamil Nadu Food Rescue Regulations and UnavuLink protocol, donors must affirm all points before a batch can be cleared by the automated safety gate.
        </p>

        <div className="space-y-2 pt-2 text-xs text-deepCharcoal font-medium">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={safetyChecklist.freshlyCooked}
              onChange={(e) =>
                setSafetyChecklist({ ...safetyChecklist, freshlyCooked: e.target.checked })
              }
              className="w-4 h-4 text-forest rounded"
            />
            <span>Food was prepared in a hygienic kitchen and remained protected from contamination.</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={safetyChecklist.safeStorage}
              onChange={(e) =>
                setSafetyChecklist({ ...safetyChecklist, safeStorage: e.target.checked })
              }
              className="w-4 h-4 text-forest rounded"
            />
            <span>Stored in appropriate temperature conditions ({storageCondition}) without break in chain.</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={safetyChecklist.cleanPackaging}
              onChange={(e) =>
                setSafetyChecklist({ ...safetyChecklist, cleanPackaging: e.target.checked })
              }
              className="w-4 h-4 text-forest rounded"
            />
            <span>Packaging is clean, food-grade, covered, and ready for volunteer collection.</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={safetyChecklist.allergensDeclared}
              onChange={(e) =>
                setSafetyChecklist({ ...safetyChecklist, allergensDeclared: e.target.checked })
              }
              className="w-4 h-4 text-forest rounded"
            />
            <span>All common allergens and dietary restrictions have been declared truthfully.</span>
          </label>
        </div>
      </div>

      {/* Form Submission Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => navigate('/donor/dashboard')}
          className="text-xs font-bold text-mutedGrey hover:text-deepCharcoal px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-forest hover:bg-forest-dark text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          Verify Safety Gate & Create QR Passport
        </button>
      </div>
    </form>
  );
};
