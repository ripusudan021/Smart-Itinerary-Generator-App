import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Users, Heart, IndianRupee, ArrowLeft, ArrowRight, Search, Plane, Mountain, Camera, Utensils, ShoppingBag, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

const steps = [
  { id: 'destination', title: 'Where to?', icon: MapPin },
  { id: 'dates', title: 'When?', icon: Calendar },
  { id: 'budget', title: 'Budget', icon: IndianRupee },
  { id: 'group', title: 'Group Size', icon: Users },
  { id: 'interests', title: 'Interests', icon: Heart },
];

const destinations = [
  { name: 'Delhi', image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080', description: 'Historic capital' },
  { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1662408976803-d94e2e0cb57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdW1iYWklMjBpbmRpYSUyMHNreWxpbmV8ZW58MXx8fHwxNzU3NDI1MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080', description: 'City of dreams' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1668262120979-a1af71765107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxnb2ElMjBpbmRpYSUyMGJlYWNofGVufDF8fHx8MTc1NzMyODY1N3ww&ixlib=rb-4.1.0&q=80&w=1080', description: 'Beach paradise' },
];

const interests = [
  { id: 'adventure', icon: Mountain, label: 'Adventure', color: 'from-orange-500 to-red-600' },
  { id: 'culture', icon: Camera, label: 'Culture', color: 'from-purple-500 to-pink-600' },
  { id: 'food', icon: Utensils, label: 'Food', color: 'from-green-500 to-emerald-600' },
  { id: 'shopping', icon: ShoppingBag, label: 'Shopping', color: 'from-blue-500 to-cyan-600' },
  { id: 'nightlife', icon: Music, label: 'Nightlife', color: 'from-yellow-500 to-orange-600' },
  { id: 'nature', icon: Plane, label: 'Nature', color: 'from-teal-500 to-green-600' },
];

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number[];
  groupSize: number;
  interests: string[];
}

interface ItineraryFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export function ItineraryForm({ onSubmit, onBack }: ItineraryFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: [50000],
    groupSize: 2,
    interests: [],
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl">
        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? 'text-cyan-400' : 'text-gray-500'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${
                        index <= currentStep
                          ? 'border-orange-400 bg-orange-400/20'
                          : 'border-gray-500 bg-gray-500/20'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-xs hidden sm:block">{step.title}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-orange-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px] flex flex-col"
            >
              {/* Destination Step */}
              {currentStep === 0 && (
                <div className="flex flex-col h-full">
                  <h2 className="mb-6 text-white">Where would you like to go?</h2>
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search destinations..."
                      value={formData.destination}
                      onChange={(e) => updateFormData('destination', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                    {destinations.map((dest, index) => (
                      <motion.div
                        key={dest.name}
                        className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                          formData.destination === dest.name ? 'ring-2 ring-cyan-400' : ''
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        onClick={() => updateFormData('destination', dest.name)}
                      >
                        <ImageWithFallback
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-medium">{dest.name}</h3>
                          <p className="text-sm text-gray-300">{dest.description}</p>
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates Step */}
              {currentStep === 1 && (
                <div className="flex flex-col h-full">
                  <h2 className="mb-6 text-white">When are you traveling?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Start Date</label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData('startDate', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">End Date</label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateFormData('endDate', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-300 text-sm">
                      ✨ Pro Tip: Travel during weekdays for better deals and fewer crowds!
                    </p>
                  </div>
                </div>
              )}

              {/* Budget Step */}
              {currentStep === 2 && (
                <div className="flex flex-col h-full">
                  <h2 className="mb-6 text-white">What's your budget?</h2>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-center mb-8">
                      <motion.div
                        className="text-4xl font-bold text-cyan-400 mb-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ₹{formData.budget[0].toLocaleString()}
                      </motion.div>
                      <p className="text-gray-300">per person</p>
                    </div>
                    <div className="px-4">
                      <Slider
                        value={formData.budget}
                        onValueChange={(value) => updateFormData('budget', value)}
                        max={200000}
                        min={10000}
                        step={5000}
                        className="mb-8"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>₹10,000</span>
                        <span>₹200,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Group Size Step */}
              {currentStep === 3 && (
                <div className="flex flex-col h-full">
                  <h2 className="mb-6 text-white">How many travelers?</h2>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center gap-8">
                      <motion.button
                        onClick={() => updateFormData('groupSize', Math.max(1, formData.groupSize - 1))}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        -
                      </motion.button>
                      <motion.div
                        className="text-6xl font-bold text-cyan-400"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.3 }}
                        key={formData.groupSize}
                      >
                        {formData.groupSize}
                      </motion.div>
                      <motion.button
                        onClick={() => updateFormData('groupSize', Math.min(20, formData.groupSize + 1))}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-center text-gray-300">travelers</p>
                </div>
              )}

              {/* Interests Step */}
              {currentStep === 4 && (
                <div className="flex flex-col h-full">
                  <h2 className="mb-6 text-white">What are you interested in?</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1">
                    {interests.map((interest, index) => {
                      const Icon = interest.icon;
                      const isSelected = formData.interests.includes(interest.id);
                      return (
                        <motion.div
                          key={interest.id}
                          className={`relative p-6 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? `bg-gradient-to-br ${interest.color} shadow-lg`
                              : 'bg-white/10 border border-white/20 hover:bg-white/15'
                          }`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleInterest(interest.id)}
                        >
                          <Icon className={`w-8 h-8 mb-3 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                          <p className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                            {interest.label}
                          </p>
                          {isSelected && (
                            <motion.div
                              className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 0 ? 'Back' : 'Previous'}
            </Button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg"
              >
                {currentStep === steps.length - 1 ? 'Generate Itinerary' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
}