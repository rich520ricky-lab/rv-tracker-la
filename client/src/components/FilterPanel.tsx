import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  minPrice?: number;
  maxPrice?: number;
  maxDistance?: number;
}

export interface FilterState {
  priceRange: [number, number];
  distance: number;
  features: string[];
  year: number[];
}

const FEATURE_OPTIONS = [
  { id: 'pop-top', label: 'Pop-top' },
  { id: 'murphy-bed', label: 'Murphy Bed' },
  { id: 'solar', label: 'Solar Ready' },
  { id: 'generator', label: 'Generator' },
];

const YEAR_OPTIONS = [2025, 2026, 2027];

export default function FilterPanel({
  onFilterChange,
  minPrice = 100000,
  maxPrice = 150000,
  maxDistance = 200,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [minPrice, maxPrice],
    distance: maxDistance,
    features: [],
    year: [2026],
  });

  const handlePriceChange = (range: [number, number]) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDistanceChange = (value: number[]) => {
    const newFilters = { ...filters, distance: value[0] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = filters.features.includes(featureId)
      ? filters.features.filter(f => f !== featureId)
      : [...filters.features, featureId];
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      priceRange: [minPrice, maxPrice],
      distance: maxDistance,
      features: [],
      year: [2026],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs"
          >
            Reset
          </Button>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="space-y-2">
            <Slider
              min={minPrice}
              max={maxPrice}
              step={5000}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Distance from LA (miles)</Label>
          <div className="space-y-2">
            <Slider
              min={0}
              max={maxDistance}
              step={10}
              value={[filters.distance]}
              onValueChange={handleDistanceChange}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              Up to {filters.distance} miles
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Features</Label>
          <div className="space-y-2">
            {FEATURE_OPTIONS.map(feature => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature.id}`}
                  checked={filters.features.includes(feature.id)}
                  onCheckedChange={() => handleFeatureToggle(feature.id)}
                />
                <Label htmlFor={`feature-${feature.id}`} className="font-normal cursor-pointer">
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
