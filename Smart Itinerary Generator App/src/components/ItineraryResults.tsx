import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Users, IndianRupee, Download, Share2, Edit3, ChevronDown, ChevronUp, Train, Car, Plane, Camera, Utensils, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  duration: string;
  type: 'transport' | 'food' | 'attraction' | 'accommodation';
  image: string;
}

interface DayPlan {
  day: number;
  date: string;
  title: string;
  totalCost: number;
  activities: Activity[];
}

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number[];
  groupSize: number;
  interests: string[];
}

const mockItinerary: DayPlan[] = [
  {
    day: 1,
    date: '2024-12-15',
    title: 'Arrival & Old Delhi Exploration',
    totalCost: 2500,
    activities: [
      {
        id: '1',
        time: '09:00',
        title: 'Airport to Hotel',
        description: 'Private cab from Indira Gandhi International Airport',
        cost: 800,
        duration: '1 hour',
        type: 'transport',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '2',
        time: '11:00',
        title: 'Check-in at Hotel',
        description: 'Luxury hotel in Connaught Place',
        cost: 0,
        duration: '30 mins',
        type: 'accommodation',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '3',
        time: '14:00',
        title: 'Red Fort Visit',
        description: 'Historic Mughal fortress and UNESCO World Heritage Site',
        cost: 600,
        duration: '2.5 hours',
        type: 'attraction',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '4',
        time: '18:00',
        title: 'Chandni Chowk Street Food',
        description: 'Authentic Delhi street food experience',
        cost: 400,
        duration: '2 hours',
        type: 'food',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ]
  },
  {
    day: 2,
    date: '2024-12-16',
    title: 'New Delhi & Modern Attractions',
    totalCost: 3200,
    activities: [
      {
        id: '5',
        time: '09:00',
        title: 'India Gate',
        description: 'War memorial and iconic landmark',
        cost: 0,
        duration: '1 hour',
        type: 'attraction',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '6',
        time: '11:00',
        title: 'Lotus Temple',
        description: 'Bahá\'í House of Worship with unique architecture',
        cost: 0,
        duration: '1.5 hours',
        type: 'attraction',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '7',
        time: '14:00',
        title: 'Lunch at Khan Market',
        description: 'Trendy market with diverse dining options',
        cost: 1200,
        duration: '1.5 hours',
        type: 'food',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        id: '8',
        time: '16:30',
        title: 'Qutub Minar',
        description: 'UNESCO World Heritage Site and tallest brick minaret',
        cost: 600,
        duration: '2 hours',
        type: 'attraction',
        image: 'https://images.unsplash.com/photo-1735379252923-1af7ef0fb4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMGluZGlhJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1NzQyNTEzNHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ]
  }
];

const activityIcons = {
  transport: Car,
  food: Utensils,
  attraction: Camera,
  accommodation: Home,
};

interface ItineraryResultsProps {
  formData: FormData;
  onEdit: () => void;
  onBack: () => void;
}

export function ItineraryResults({ formData, onEdit, onBack }: ItineraryResultsProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [animatingCosts, setAnimatingCosts] = useState(true);

  const toggleDay = (day: number) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const totalCost = mockItinerary.reduce((sum, day) => sum + day.totalCost, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <motion.h1 
                className="text-2xl text-white mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {formData.destination} Itinerary
              </motion.h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  3 days
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {formData.groupSize} travelers
                </div>
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  <motion.span
                    key={totalCost}
                    initial={{ scale: 1.2, color: '#22d3ee' }}
                    animate={{ scale: 1, color: '#d1d5db' }}
                    transition={{ duration: 0.3 }}
                  >
                    ₹{totalCost.toLocaleString()}
                  </motion.span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={onEdit} className="border-white/20 text-white hover:bg-white/10">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Map Placeholder */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          className="relative h-64 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl border border-white/10 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-cyan-400" />
              <p>Interactive Route Map</p>
              <p className="text-sm text-gray-300">Animated route visualization</p>
            </div>
          </div>
          
          {/* Animated Route Line */}
          <motion.div
            className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          
          {/* Animated Markers */}
          {[25, 50, 75].map((position, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-y-1/2 shadow-lg"
              style={{ left: `${position}%` }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                boxShadow: ['0 0 0 0 rgba(34, 211, 238, 0.7)', '0 0 0 20px rgba(34, 211, 238, 0)', '0 0 0 0 rgba(34, 211, 238, 0)']
              }}
              transition={{ duration: 1, delay: 1 + index * 0.2, repeat: Infinity, repeatDelay: 3 }}
            />
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {mockItinerary.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden">
                <motion.div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleDay(day.day)}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="text-white mb-1">{day.title}</h3>
                        <p className="text-gray-300 text-sm">{day.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-cyan-400">
                          ₹{day.totalCost.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {day.activities.length} activities
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedDays.has(day.day) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {expandedDays.has(day.day) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-4">
                        {day.activities.map((activity, activityIndex) => {
                          const Icon = activityIcons[activity.type];
                          return (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: activityIndex * 0.1 }}
                              className="flex gap-4 group"
                            >
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-2">
                                  <Icon className="w-5 h-5 text-cyan-400" />
                                </div>
                                {activityIndex < day.activities.length - 1 && (
                                  <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-cyan-400 text-sm">{activity.time}</span>
                                      <Badge variant="outline" className="text-xs border-white/20 text-white">
                                        {activity.duration}
                                      </Badge>
                                    </div>
                                    <h4 className="text-white group-hover:text-cyan-400 transition-colors">
                                      {activity.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm mt-1">
                                      {activity.description}
                                    </p>
                                  </div>
                                  
                                  <div className="text-right ml-4">
                                    <motion.div
                                      className="text-green-400"
                                      animate={animatingCosts ? { scale: [1, 1.1, 1] } : {}}
                                      transition={{ duration: 0.5, delay: activityIndex * 0.1 }}
                                    >
                                      {activity.cost > 0 ? `₹${activity.cost}` : 'Free'}
                                    </motion.div>
                                  </div>
                                </div>
                                
                                <div className="w-full h-20 bg-white/5 rounded-lg overflow-hidden">
                                  <ImageWithFallback
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* IRCTC Integration Card */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 backdrop-blur-xl border-orange-500/20">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                  <Train className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white">IRCTC Train Booking</h3>
                  <p className="text-orange-200 text-sm">Book your train tickets seamlessly</p>
                </div>
                <motion.button
                  className="ml-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-orange-300 mb-1">Route</div>
                  <div className="text-white">Delhi → Mumbai</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-orange-300 mb-1">Duration</div>
                  <div className="text-white">16h 20m</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-orange-300 mb-1">Price</div>
                  <div className="text-white">₹1,245</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8 pb-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={onBack} className="border-white/20 text-white hover:bg-white/10">
              Create New Itinerary
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}