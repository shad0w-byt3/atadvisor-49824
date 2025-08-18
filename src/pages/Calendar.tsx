import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { WeatherWidget } from '@/components/WeatherWidget';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, Plus, Clock, Droplets, CheckCircle, AlertCircle, Leaf, Bug, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('today');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    task: '',
    time: '',
    type: 'watering',
    urgent: false,
    date: 'today'
  });
  const { toast } = useToast();

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [activities, setActivities] = useState([
    {
      date: 'Today',
      dateValue: 'today',
      tasks: [
        { id: 1, time: '6:00 AM', task: 'Water banana plants', type: 'watering', urgent: true, completed: false },
        { id: 2, time: '8:00 AM', task: 'Check cassava pest traps', type: 'inspection', urgent: false, completed: true },
        { id: 3, time: '2:00 PM', task: 'Harvest sweet potatoes', type: 'harvest', urgent: false, completed: false },
      ]
    },
    {
      date: 'Tomorrow',
      dateValue: 'tomorrow',
      tasks: [
        { id: 4, time: '7:00 AM', task: 'Apply fertilizer to maize', type: 'fertilizing', urgent: false, completed: false },
        { id: 5, time: '10:00 AM', task: 'Prune coffee trees', type: 'maintenance', urgent: false, completed: false },
      ]
    },
    {
      date: 'This Week',
      dateValue: 'week',
      tasks: [
        { id: 6, time: 'Friday', task: 'Soil testing for beans', type: 'inspection', urgent: true, completed: false },
        { id: 7, time: 'Saturday', task: 'Equipment maintenance', type: 'maintenance', urgent: false, completed: false },
      ]
    }
  ]);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'watering': return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'harvest': return <Leaf className="h-4 w-4 text-green-500" />;
      case 'inspection': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'fertilizing': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'maintenance': return <Bug className="h-4 w-4 text-purple-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleTaskComplete = (taskId: number) => {
    setActivities(prev => prev.map(day => ({
      ...day,
      tasks: day.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    })));
    
    toast({
      title: "Task Updated!",
      description: "Task status has been changed successfully.",
    });
  };

  const handleAddTask = () => {
    if (!newTask.task || !newTask.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newTaskId = Math.max(...activities.flatMap(day => day.tasks.map(t => t.id))) + 1;
    
    setActivities(prev => prev.map(day => 
      day.dateValue === newTask.date 
        ? {
            ...day,
            tasks: [...day.tasks, {
              id: newTaskId,
              time: newTask.time,
              task: newTask.task,
              type: newTask.type,
              urgent: newTask.urgent,
              completed: false
            }]
          }
        : day
    ));

    setNewTask({
      task: '',
      time: '',
      type: 'watering',
      urgent: false,
      date: 'today'
    });
    
    setIsAddTaskOpen(false);
    
    toast({
      title: "Task Added!",
      description: "Your new farming task has been added successfully.",
    });
  };

  const currentActivities = activities.find(day => day.dateValue === selectedDate) || activities[0];
  const completedTasks = currentActivities.tasks.filter(task => task.completed).length;
  const urgentTasks = currentActivities.tasks.filter(task => task.urgent && !task.completed).length;
  const completionRate = Math.round((completedTasks / currentActivities.tasks.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-50" 
         style={{
           backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23ffffff" stroke-width="1" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>')`,
           backgroundSize: '50px 50px'
         }}>
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-agriculture-green">Farm Calendar & Weather</h2>
            <p className="text-muted-foreground">Plan your farming activities with weather insights</p>
          </div>
          
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogTrigger asChild>
              <Button className="agriculture-gradient w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Farm Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="task">Task Description</Label>
                  <Input
                    id="task"
                    value={newTask.task}
                    onChange={(e) => setNewTask(prev => ({ ...prev, task: e.target.value }))}
                    placeholder="e.g., Water tomato plants"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask(prev => ({ ...prev, time: e.target.value }))}
                    placeholder="e.g., 6:00 AM or Friday"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Task Type</Label>
                  <Select value={newTask.type} onValueChange={(value) => setNewTask(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="watering">Watering</SelectItem>
                      <SelectItem value="harvest">Harvest</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                      <SelectItem value="fertilizing">Fertilizing</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Schedule For</Label>
                  <Select value={newTask.date} onValueChange={(value) => setNewTask(prev => ({ ...prev, date: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={newTask.urgent}
                    onChange={(e) => setNewTask(prev => ({ ...prev, urgent: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="urgent">Mark as urgent</Label>
                </div>
                <Button onClick={handleAddTask} className="w-full agriculture-gradient">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Weather Widget Integration */}
        <WeatherWidget />

        {/* Date Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {activities.map((day) => (
            <Button
              key={day.dateValue}
              variant={selectedDate === day.dateValue ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${selectedDate === day.dateValue ? 'agriculture-gradient' : 'hover:bg-green-50'}`}
              onClick={() => setSelectedDate(day.dateValue)}
            >
              {day.date}
            </Button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="agriculture-card p-3 text-center hover:shadow-md transition-shadow">
            <div className="text-lg font-bold text-agriculture-green">{currentActivities.tasks.length}</div>
            <div className="text-xs text-muted-foreground">Tasks {currentActivities.date}</div>
          </Card>
          <Card className="agriculture-card p-3 text-center hover:shadow-md transition-shadow">
            <div className="text-lg font-bold text-orange-500">{urgentTasks}</div>
            <div className="text-xs text-muted-foreground">Urgent</div>
          </Card>
          <Card className="agriculture-card p-3 text-center hover:shadow-md transition-shadow">
            <div className="text-lg font-bold text-blue-500">{completionRate}%</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </Card>
        </div>

        {/* Activities List */}
        <Card className="agriculture-card p-4">
          <h3 className="font-semibold text-agriculture-green mb-4">{currentActivities.date}</h3>
          <div className="space-y-3">
            {currentActivities.tasks.map((task) => (
              <div key={task.id} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                task.completed ? 'bg-green-50/50 opacity-75' : 'bg-white border hover:shadow-sm'
              }`}>
                <button
                  onClick={() => handleTaskComplete(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {task.completed && <CheckCircle className="h-4 w-4 text-white" />}
                </button>
                
                {getTaskIcon(task.type)}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.task}
                    </span>
                    {task.urgent && !task.completed && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weather Context */}
        <Card className="agriculture-card p-4">
          <h3 className="font-semibold text-agriculture-green mb-3">🌤️ Weather-Based Recommendations</h3>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">• Perfect weather for outdoor tasks today in Kigali</p>
            <p className="text-muted-foreground">• Rain expected Friday - plan indoor activities</p>
            <p className="text-muted-foreground">• Optimal conditions for watering early morning</p>
            <p className="text-muted-foreground">• High humidity ideal for banana and coffee cultivation</p>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Calendar;
