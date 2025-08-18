
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Sprout, CloudRain, Bug, Trophy } from 'lucide-react';

const FarmingGame = () => {
  const [gameState, setGameState] = useState({
    day: 1,
    crops: 0,
    water: 100,
    health: 100,
    pests: 0,
    score: 0,
    gameOver: false,
    won: false
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameState.gameOver && !gameState.won) {
        setGameState(prev => {
          const newState = { ...prev };
          newState.day += 1;
          
          // Random events
          if (Math.random() < 0.3) {
            const randomEvent = Math.random();
            if (randomEvent < 0.33) {
              newState.pests += Math.floor(Math.random() * 20);
              setEvents(prev => [...prev, `Day ${newState.day}: Pest attack! 🐛`]);
            } else if (randomEvent < 0.66) {
              newState.water = Math.max(0, newState.water - Math.floor(Math.random() * 30));
              setEvents(prev => [...prev, `Day ${newState.day}: Drought conditions! 🌵`]);
            } else {
              newState.water = Math.min(100, newState.water + 20);
              setEvents(prev => [...prev, `Day ${newState.day}: Rain boost! 🌧️`]);
            }
          }

          // Natural growth
          if (newState.water > 50 && newState.pests < 50) {
            newState.crops += Math.floor(Math.random() * 10);
            newState.health = Math.min(100, newState.health + 5);
          }

          // Check win/lose conditions
          if (newState.crops >= 100) {
            newState.won = true;
            newState.score = Math.floor((newState.health + newState.water) / newState.day * 100);
          }
          
          if (newState.health <= 0 || newState.day > 30) {
            newState.gameOver = true;
          }

          return newState;
        });
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [gameState.gameOver, gameState.won]);

  const waterCrops = () => {
    setGameState(prev => ({
      ...prev,
      water: Math.min(100, prev.water + 20),
      crops: prev.crops + 2
    }));
  };

  const treatPests = () => {
    setGameState(prev => ({
      ...prev,
      pests: Math.max(0, prev.pests - 30),
      health: Math.min(100, prev.health + 10)
    }));
  };

  const plantSeeds = () => {
    setGameState(prev => ({
      ...prev,
      crops: prev.crops + 5,
      water: Math.max(0, prev.water - 10)
    }));
  };

  const resetGame = () => {
    setGameState({
      day: 1,
      crops: 0,
      water: 100,
      health: 100,
      pests: 0,
      score: 0,
      gameOver: false,
      won: false
    });
    setEvents([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            🎮 Farming Simulation Game
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Learn farming through an interactive simulation
          </p>
        </div>

        <Card className="agriculture-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Day</p>
              <p className="text-2xl font-bold text-agriculture-green dark:text-green-400">{gameState.day}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Crops</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{gameState.crops}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Water</p>
              <Progress value={gameState.water} className="mt-1" />
              <p className="text-sm text-gray-600 dark:text-gray-400">{gameState.water}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Health</p>
              <Progress value={gameState.health} className="mt-1" />
              <p className="text-sm text-gray-600 dark:text-gray-400">{gameState.health}%</p>
            </div>
          </div>

          {gameState.pests > 0 && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-red-600 dark:text-red-400 font-medium">
                🐛 Pest Level: {gameState.pests}%
              </p>
            </div>
          )}

          {!gameState.gameOver && !gameState.won && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button onClick={waterCrops} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                <CloudRain className="h-4 w-4 mr-2" />
                Water Crops
              </Button>
              <Button onClick={treatPests} className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                <Bug className="h-4 w-4 mr-2" />
                Treat Pests
              </Button>
              <Button onClick={plantSeeds} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                <Sprout className="h-4 w-4 mr-2" />
                Plant Seeds
              </Button>
            </div>
          )}

          {(gameState.gameOver || gameState.won) && (
            <div className="text-center space-y-4">
              {gameState.won ? (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You successfully grew 100 crops!
                  </p>
                  <p className="text-2xl font-bold text-agriculture-green dark:text-green-400 mt-2">
                    Score: {gameState.score}
                  </p>
                </div>
              ) : (
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                    Game Over! 😔
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Better luck next time! Keep practicing to improve your farming skills.
                  </p>
                </div>
              )}
              
              <Button onClick={resetGame} className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Play Again
              </Button>
            </div>
          )}
        </Card>

        {events.length > 0 && (
          <Card className="agriculture-card p-4">
            <h3 className="font-semibold text-agriculture-green dark:text-green-400 mb-3">Recent Events</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {events.slice(-5).map((event, index) => (
                <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {event}
                </p>
              ))}
            </div>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default FarmingGame;
