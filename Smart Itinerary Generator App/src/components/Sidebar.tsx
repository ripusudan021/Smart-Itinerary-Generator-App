import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Sun, CloudRain, Wind, ThermometerSun, MessageCircle, X, Send, Zap, Percent, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SidebarProps {
  destination: string;
}

const weatherData = {
  Delhi: {
    temp: 28,
    condition: 'Sunny',
    humidity: 65,
    wind: 12,
    icon: Sun,
    forecast: [
      { day: 'Today', temp: 28, icon: Sun },
      { day: 'Tomorrow', temp: 26, icon: CloudRain },
      { day: 'Thu', temp: 24, icon: Cloud },
    ]
  },
  Mumbai: {
    temp: 32,
    condition: 'Humid',
    humidity: 78,
    wind: 8,
    icon: Cloud,
    forecast: [
      { day: 'Today', temp: 32, icon: Cloud },
      { day: 'Tomorrow', temp: 30, icon: CloudRain },
      { day: 'Thu', temp: 29, icon: CloudRain },
    ]
  },
  Goa: {
    temp: 30,
    condition: 'Breezy',
    humidity: 72,
    wind: 15,
    icon: Wind,
    forecast: [
      { day: 'Today', temp: 30, icon: Wind },
      { day: 'Tomorrow', temp: 31, icon: Sun },
      { day: 'Thu', temp: 29, icon: Cloud },
    ]
  }
};

const deals = [
  {
    id: 1,
    title: 'Hotel Stay 40% Off',
    description: 'Premium hotels with breakfast',
    discount: 40,
    expires: '2 days left',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Flight Booking',
    description: 'Domestic flights at best prices',
    discount: 25,
    expires: '1 week left',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 3,
    title: 'Local Tours',
    description: 'Guided city tours and experiences',
    discount: 30,
    expires: '3 days left',
    color: 'from-purple-500 to-pink-500'
  }
];

export function Sidebar({ destination }: SidebarProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hi! I\'m your AI travel assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const weather = weatherData[destination as keyof typeof weatherData] || weatherData.Delhi;
  const WeatherIcon = weather.icon;

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), text: newMessage, sender: 'user' }
    ]);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: 'Thanks for your message! I\'m analyzing your request and will help you optimize your itinerary.', sender: 'bot' }
      ]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <>
      {/* Weather Widget */}
      <motion.div
        className="fixed top-20 right-4 z-40"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="w-64 bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-white text-sm">{destination}</span>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <WeatherIcon className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </div>
            
            <div className="text-center mb-4">
              <motion.div
                className="text-3xl text-white mb-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {weather.temp}°C
              </motion.div>
              <div className="text-gray-300 text-sm">{weather.condition}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Humidity {weather.humidity}%
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Wind {weather.wind} km/h
              </div>
            </div>
            
            <div className="flex justify-between text-xs">
              {weather.forecast.map((day, index) => {
                const DayIcon = day.icon;
                return (
                  <motion.div
                    key={day.day}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-gray-300 mb-1">{day.day}</div>
                    <DayIcon className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                    <div className="text-white">{day.temp}°</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Deals Widget */}
      <motion.div
        className="fixed top-72 right-4 z-40"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="w-64 bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Hot Deals</span>
            </div>
            
            <div className="space-y-3">
              {deals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  className={`relative p-3 rounded-lg bg-gradient-to-r ${deal.color} bg-opacity-20 border border-white/10 cursor-pointer group overflow-hidden`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{deal.title}</span>
                      <div className="flex items-center gap-1 text-green-400">
                        <Percent className="w-3 h-3" />
                        <span className="text-xs">{deal.discount}%</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs mb-2">{deal.description}</p>
                    <div className="text-yellow-400 text-xs">{deal.expires}</div>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />
                  
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Chatbot */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              className="mb-4 w-80 h-96"
            >
              <Card className="h-full bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl flex flex-col">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white text-sm">AI Travel Assistant</div>
                      <div className="text-green-400 text-xs flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Online
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatOpen(false)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                            : 'bg-white/10 text-gray-300 border border-white/10'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 text-sm"
                    />
                    <Button
                      onClick={sendMessage}
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-3"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(34, 211, 238, 0.4)',
              '0 0 0 20px rgba(34, 211, 238, 0)',
              '0 0 0 0 rgba(34, 211, 238, 0.4)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {chatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.button>
      </motion.div>
    </>
  );
}