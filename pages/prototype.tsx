import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Prototype() {
  // State for flex sensors (0-100)
  const [flexValues, setFlexValues] = useState([50, 50, 50, 50, 50]);
  // State for gyroscope orientation (x, y, z)
  const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
  // State for detected letter
  const [detectedLetter, setDetectedLetter] = useState('');
  // State for translation text
  const [translationText, setTranslationText] = useState('');
  // State for active tab
  const [activeTab, setActiveTab] = useState('control');
  
  // Reference for phone display canvas
  const phoneCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // ASL alphabet sensor configurations
  const aslAlphabet: {
    [key: string]: { 
      flex: number[]; 
      orientation: { x: number; y: number; z: number; }; 
    }
  } = {
    'A': { flex: [20, 90, 90, 90, 90], orientation: { x: 0, y: 0, z: 0 } },
    'B': { flex: [90, 10, 10, 10, 10], orientation: { x: 0, y: 0, z: 0 } },
    'C': { flex: [40, 50, 50, 50, 50], orientation: { x: 10, y: 0, z: 0 } },
    'D': { flex: [20, 10, 80, 80, 80], orientation: { x: 0, y: 0, z: 0 } },
    'E': { flex: [40, 80, 80, 80, 80], orientation: { x: 0, y: 0, z: 0 } },
    'F': { flex: [30, 30, 10, 10, 10], orientation: { x: 0, y: 0, z: 0 } },
    'G': { flex: [20, 10, 90, 90, 90], orientation: { x: 0, y: 0, z: 90 } },
    'H': { flex: [20, 10, 10, 90, 90], orientation: { x: 0, y: 0, z: 90 } },
    'I': { flex: [20, 90, 90, 90, 10], orientation: { x: 0, y: 0, z: 0 } },
    'J': { flex: [20, 90, 90, 90, 10], orientation: { x: 0, y: 0, z: 45 } },
    'K': { flex: [20, 10, 10, 90, 90], orientation: { x: 0, y: 0, z: 45 } },
    'L': { flex: [10, 10, 90, 90, 90], orientation: { x: 0, y: 0, z: 0 } },
    'M': { flex: [40, 70, 70, 70, 90], orientation: { x: -15, y: 0, z: 0 } },
    'N': { flex: [40, 70, 70, 90, 90], orientation: { x: -15, y: 0, z: 0 } },
    'O': { flex: [40, 60, 60, 60, 60], orientation: { x: 0, y: 0, z: 0 } },
    'P': { flex: [20, 10, 30, 90, 90], orientation: { x: 0, y: 0, z: 90 } },
    'Q': { flex: [20, 10, 90, 90, 90], orientation: { x: 0, y: 0, z: -45 } },
    'R': { flex: [20, 10, 10, 90, 90], orientation: { x: 0, y: 0, z: 45 } },
    'S': { flex: [90, 90, 90, 90, 90], orientation: { x: 0, y: 0, z: 0 } },
    'T': { flex: [40, 60, 90, 90, 90], orientation: { x: 0, y: 0, z: 0 } },
    'U': { flex: [20, 10, 10, 90, 90], orientation: { x: 0, y: 0, z: 0 } },
    'V': { flex: [20, 10, 10, 90, 90], orientation: { x: 0, y: 0, z: 0 } },
    'W': { flex: [20, 10, 10, 10, 90], orientation: { x: 0, y: 0, z: 0 } },
    'X': { flex: [40, 30, 90, 90, 90], orientation: { x: 0, y: 0, z: 0 } },
    'Y': { flex: [10, 90, 90, 90, 10], orientation: { x: 0, y: 0, z: 0 } },
    'Z': { flex: [20, 10, 90, 90, 90], orientation: { x: 0, y: 20, z: 0 } },
  };
  
  // Update the detected letter based on flex sensor values and orientation
  useEffect(() => {
    // Find the closest matching letter in our ASL alphabet
    let closestLetter = '';
    let lowestDifference = Infinity;

    Object.entries(aslAlphabet).forEach(([letter, config]) => {
      // Calculate difference in flex values
      const flexDiff = config.flex.reduce((sum, val, idx) => {
        return sum + Math.abs(val - flexValues[idx]);
      }, 0);
      
      // Calculate difference in orientation
      const orientDiff = 
        Math.abs(config.orientation.x - orientation.x) +
        Math.abs(config.orientation.y - orientation.y) +
        Math.abs(config.orientation.z - orientation.z);
      
      // Weight flex values more than orientation (adjust weights as needed)
      const totalDiff = flexDiff * 0.8 + orientDiff * 0.2;
      
      // If this is the closest match so far, update
      if (totalDiff < lowestDifference) {
        lowestDifference = totalDiff;
        closestLetter = letter;
      }
    });
    
    // Only detect if the difference is below a threshold
    if (lowestDifference < 200) {
      setDetectedLetter(closestLetter);
    } else {
      setDetectedLetter('');
    }
  }, [flexValues, orientation]);
  
  // Update the phone display
  useEffect(() => {
    const canvas = phoneCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw phone UI
    drawPhoneUI(ctx, canvas.width, canvas.height);
    
    // Display detected letter
    if (detectedLetter) {
      ctx.font = 'bold 60px Roboto';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.fillText(detectedLetter, canvas.width / 2, canvas.height / 2 - 50);
      
      // Add detected letter to translation
      if (detectedLetter && !translationText.endsWith(detectedLetter)) {
        setTranslationText(prev => {
          if (prev.length > 20) {
            return detectedLetter;
          } else {
            return prev + detectedLetter;
          }
        });
      }
    }
    
    // Display translation
    ctx.font = '16px Roboto';
    ctx.fillStyle = '#4b5563';
    ctx.textAlign = 'center';
    ctx.fillText('Translation:', canvas.width / 2, canvas.height - 160);
    
    ctx.font = 'bold 18px Roboto';
    ctx.fillStyle = '#000000';
    ctx.fillText(translationText || '...', canvas.width / 2, canvas.height - 130);
    
    // Draw hand visualization based on flex sensors
    drawHandVisualization(ctx, canvas.width, canvas.height, flexValues, orientation);
    
  }, [detectedLetter, translationText, flexValues, orientation]);
  
  // Draw the phone UI
  const drawPhoneUI = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Phone body
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Status bar
    ctx.fillStyle = '#3b75d9';
    ctx.fillRect(0, 0, width, 30);
    
    // Time
    ctx.font = '12px Roboto';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    ctx.fillText(time, width / 2, 20);
    
    // App title
    ctx.font = 'bold 18px Roboto';
    ctx.fillStyle = '#3b75d9';
    ctx.textAlign = 'center';
    ctx.fillText('Signal', width / 2, 60);
    
    // Bottom navigation bar
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, height - 50, width, 50);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height - 50);
    ctx.lineTo(width, height - 50);
    ctx.stroke();
    
    // Navigation buttons
    const iconSize = 20;
    const iconSpacing = width / 4;
    
    // Home icon
    ctx.beginPath();
    ctx.moveTo(iconSpacing - iconSize/2, height - 30);
    ctx.lineTo(iconSpacing, height - 40);
    ctx.lineTo(iconSpacing + iconSize/2, height - 30);
    ctx.lineTo(iconSpacing + iconSize/2, height - 20);
    ctx.lineTo(iconSpacing - iconSize/2, height - 20);
    ctx.closePath();
    ctx.fillStyle = '#3b75d9';
    ctx.fill();
    
    // Back icon
    ctx.beginPath();
    ctx.moveTo(iconSpacing * 2 + iconSize/2, height - 30);
    ctx.lineTo(iconSpacing * 2 - iconSize/2, height - 30);
    ctx.lineTo(iconSpacing * 2, height - 20);
    ctx.closePath();
    ctx.fillStyle = '#9ca3af';
    ctx.fill();
    
    // Menu icon
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(iconSpacing * 3 - iconSize/2, height - 35, iconSize, 3);
    ctx.fillRect(iconSpacing * 3 - iconSize/2, height - 30, iconSize, 3);
    ctx.fillRect(iconSpacing * 3 - iconSize/2, height - 25, iconSize, 3);
  };
  
  // Draw hand visualization
  const drawHandVisualization = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    flexValues: number[],
    orientation: { x: number; y: number; z: number }
  ) => {
    const centerX = width / 2;
    const centerY = height / 2 + 50;
    const palmRadius = 30;
    const fingerLength = 60;
    
    // Apply rotation based on orientation
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Apply all rotations for more realistic 3D effect
    ctx.rotate((orientation.z * Math.PI) / 180); // Z-axis rotation (palm facing left/right)
    
    // X and Y rotations would require more complex 3D transformations
    // This is a simplified approximation
    const xTilt = (orientation.x * Math.PI) / 180 / 10;
    const yTilt = (orientation.y * Math.PI) / 180 / 10;
    
    ctx.transform(
      Math.cos(yTilt), 0, 
      0, Math.cos(xTilt), 
      0, 0
    );
    
    // Draw palm
    ctx.beginPath();
    ctx.arc(0, 0, palmRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(59, 117, 217, 0.2)';
    ctx.fill();
    ctx.stroke();
    
    // Draw fingers
    const fingerAngles = [-30, -15, 0, 15, 30];
    
    fingerAngles.forEach((angle, index) => {
      const bendFactor = (100 - flexValues[index]) / 100; // Convert flex to bend
      
      // Calculate finger joints
      const radianAngle = (angle * Math.PI) / 180;
      const joint1X = Math.sin(radianAngle) * palmRadius;
      const joint1Y = -Math.cos(radianAngle) * palmRadius;
      
      const joint2Angle = radianAngle - bendFactor * 0.7;
      const joint2X = joint1X + Math.sin(joint2Angle) * (fingerLength * 0.5);
      const joint2Y = joint1Y - Math.cos(joint2Angle) * (fingerLength * 0.5);
      
      const joint3Angle = joint2Angle - bendFactor * 0.7;
      const joint3X = joint2X + Math.sin(joint3Angle) * (fingerLength * 0.5);
      const joint3Y = joint2Y - Math.cos(joint3Angle) * (fingerLength * 0.5);
      
      // Draw finger
      ctx.beginPath();
      ctx.moveTo(joint1X, joint1Y);
      ctx.lineTo(joint2X, joint2Y);
      ctx.lineTo(joint3X, joint3Y);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#3b75d9';
      ctx.stroke();
      
      // Draw joints
      ctx.beginPath();
      ctx.arc(joint1X, joint1Y, 4, 0, 2 * Math.PI);
      ctx.arc(joint2X, joint2Y, 4, 0, 2 * Math.PI);
      ctx.arc(joint3X, joint3Y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
    });
    
    ctx.restore();
  };
  
  // Reset all values
  const resetSimulation = () => {
    setFlexValues([50, 50, 50, 50, 50]);
    setOrientation({ x: 0, y: 0, z: 0 });
    setTranslationText('');
  };
  
  // Handle flex sensor change
  const handleFlexChange = (index: number, value: number[]) => {
    const newFlexValues = [...flexValues];
    newFlexValues[index] = value[0];
    setFlexValues(newFlexValues);
  };
  
  // Apply letter preset
  const applyLetterPreset = (letter: string) => {
    const preset = aslAlphabet[letter];
    if (preset) {
      setFlexValues([...preset.flex]);
      setOrientation({...preset.orientation});
    }
  };
  
  return (
    <Layout title="Interactive Prototype - Signal">
      <section className="section-light py-28">
        <div className="content max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              <span className="accent-text highlight">Signal Website Prototype</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-700">
              Experiment with our interactive sign language simulation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="shadow-lg border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-xl accent-text">Flex Sensor & Gyroscope Control</CardTitle>
                <CardDescription>Adjust the sensors to simulate different hand positions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="control" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-2">
                    <TabsTrigger value="control">Manual Control</TabsTrigger>
                    <TabsTrigger value="presets">Letter Presets</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="control" className="space-y-8">
                    <div>
                      <h3 className="font-semibold mb-4">Flex Sensors (bend level)</h3>
                      <div className="space-y-4">
                        {['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].map((finger, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{finger} Finger: {flexValues[index]}%</span>
                              <span>{flexValues[index] < 30 ? 'Straight' : flexValues[index] > 70 ? 'Bent' : 'Neutral'}</span>
                            </div>
                            <Slider 
                              value={[flexValues[index]]} 
                              min={0} 
                              max={100} 
                              step={1} 
                              onValueChange={(value) => handleFlexChange(index, value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">GY-91 Module (orientation)</h3>
                      <div className="space-y-4">
                        {['x', 'y', 'z'].map((axis) => (
                          <div key={axis} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{axis.toUpperCase()}-axis Rotation: {orientation[axis as keyof typeof orientation]}°</span>
                            </div>
                            <Slider 
                              value={[orientation[axis as keyof typeof orientation]]} 
                              min={-180} 
                              max={180} 
                              step={1} 
                              onValueChange={(value) => setOrientation({ ...orientation, [axis]: value[0] })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        variant="ghost" 
                        className="text-gray-500"
                        onClick={resetSimulation}
                      >
                        Reset All Values
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="presets">
                    <div className="space-y-4">
                      <h3 className="font-semibold mb-2">ASL Alphabet Presets</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Click on any letter to see the corresponding hand position
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                        {Object.keys(aslAlphabet).map((letter) => (
                          <Button 
                            key={letter} 
                            variant={detectedLetter === letter ? "default" : "outline"} 
                            className={`h-12 w-12 ${detectedLetter === letter ? 'bg-primary text-white' : 'border-primary/70 text-primary hover:bg-primary/5'}`}
                            onClick={() => applyLetterPreset(letter)}
                          >
                            {letter}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-sm mb-2">Current Selected Letter</h4>
                        <div className="bg-blue-50 p-4 rounded-md">
                          <div className="flex justify-between items-center">
                            <span className="text-4xl font-bold text-primary">{detectedLetter || '-'}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs"
                              onClick={resetSimulation}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-xl accent-text">Android App Simulation</CardTitle>
                <CardDescription>See how the Signal app would interpret your gestures</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-full max-w-[300px] mx-auto">
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-50 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-50 rounded-full opacity-50"></div>
                  <div className="relative">
                    {/* Phone frame */}
                    <div className="bg-gray-800 rounded-[36px] p-2 shadow-xl border-4 border-gray-700">
                      <div className="bg-black rounded-[28px] overflow-hidden shadow-inner">
                        {/* Phone notch */}
                        <div className="bg-black h-6 w-32 mx-auto rounded-b-xl relative z-10">
                          <div className="absolute left-1/2 top-1 -translate-x-1/2 w-4 h-1 bg-gray-600 rounded-full"></div>
                        </div>
                        {/* Phone display */}
                        <canvas 
                          ref={phoneCanvasRef} 
                          width={300} 
                          height={500} 
                          className="bg-white w-full touch-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 w-full p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Detection Status</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-600">Detected Letter</p>
                      <p className="text-xl font-bold text-black">{detectedLetter || '-'}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-600">Confidence</p>
                      <p className="text-xl font-bold text-black">{detectedLetter ? '95%' : '0%'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-lg border-2 border-blue-100 bg-primary/10 mb-16">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">How It Works</h3>
                  <p className="text-gray-700 mb-4">
                    This simulation mimics how the Signal glove&apos;s sensors would work in a real-world application. 
                    The flex sensors detect finger bending, while the GY-91 MPU9050 module detects orientation. 
                    These signals are processed and translated into letters using machine learning algorithms.
                  </p>
                  <p className="text-gray-700">
                    In the full version, the glove wirelessly transmits data to an Android app via Bluetooth, 
                    which uses Vertex AI Gemini to interpret more complex gestures and provide real-time translation.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button className="bg-primary/80 hover:bg-primary text-slate-100 font-semibold px-6 py-5 rounded-full shadow-md">
                    View Technical Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
} 