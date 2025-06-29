import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, Download, Clock, MapPin, Users, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { 
  parseEventsYaml, 
  generateICSFile, 
  getEventsForMonth, 
  getUpcomingEvents, 
  getEventTypeColor, 
  getEventTypeIcon,
  type KoalitionEvent 
} from '../utils/eventUtils';

// Sample YAML data (in production, this would be loaded from the actual file)
const SAMPLE_EVENTS_YAML = `
events:
  - title: "Weekly Co-working Session"
    type: "coworking"
    description: "Open co-working session for all Koalition members to collaborate on projects"
    start_date: "2025-01-15"
    start_time: "19:00"
    end_time: "22:00"
    timezone: "America/New_York"
    location: "Discord Voice Channels"
    recurring: "weekly"
    recurring_until: "2025-12-31"
    tags: ["coworking", "collaboration", "weekly"]

  - title: "HackMIT 2025"
    type: "hackathon"
    description: "Major hackathon at MIT - Koalition deploying 3 coordinated teams"
    start_date: "2025-02-15"
    start_time: "18:00"
    end_date: "2025-02-17"
    end_time: "18:00"
    timezone: "America/New_York"
    location: "MIT Campus, Cambridge, MA"
    url: "https://hackmit.org"
    teams_deployed: 3
    tags: ["hackathon", "major", "in-person", "MIT"]

  - title: "Strategy Planning Session"
    type: "meeting"
    description: "Monthly strategic planning for upcoming hackathons and project reviews"
    start_date: "2025-01-20"
    start_time: "20:00"
    end_time: "21:30"
    timezone: "America/New_York"
    location: "Discord - Strategy Room"
    recurring: "monthly"
    recurring_until: "2025-12-31"
    tags: ["strategy", "planning", "monthly"]

  - title: "TreeHacks 2025"
    type: "hackathon"
    description: "Stanford's premier hackathon - Koalition coordinated deployment"
    start_date: "2025-02-21"
    start_time: "19:00"
    end_date: "2025-02-23"
    end_time: "17:00"
    timezone: "America/Los_Angeles"
    location: "Stanford University, CA"
    url: "https://treehacks.com"
    teams_deployed: 2
    tags: ["hackathon", "major", "in-person", "Stanford"]

  - title: "Project Showcase & Demo Day"
    type: "showcase"
    description: "Monthly showcase of preserved projects and incubator-ready demos"
    start_date: "2025-01-25"
    start_time: "15:00"
    end_time: "17:00"
    timezone: "America/New_York"
    location: "Discord - Main Stage"
    recurring: "monthly"
    recurring_until: "2025-12-31"
    tags: ["showcase", "demo", "projects", "monthly"]
`;

function Schedule() {
  const [events, setEvents] = useState<KoalitionEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  useEffect(() => {
    // In production, you would fetch this from the actual YAML file
    const eventsData = parseEventsYaml(SAMPLE_EVENTS_YAML);
    setEvents(eventsData.events);
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const monthEvents = getEventsForMonth(events, currentDate.getFullYear(), currentDate.getMonth() + 1);
  const upcomingEvents = getUpcomingEvents(events, 10);

  const handleDownloadICS = () => {
    const icsContent = generateICSFile(events);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dkk-events.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getEventsForDay = (date: Date) => {
    return monthEvents.filter(event => isSameDay(parseISO(event.start_date), date));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Koalition Schedule</h1>
            <p className="text-gray-300">
              Stay coordinated with hackathons, co-working sessions, and alliance events
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
              className="bg-primary/10 text-primary hover:bg-primary hover:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              {viewMode === 'calendar' ? 'List View' : 'Calendar View'}
            </Button>
            <Button
              onClick={handleDownloadICS}
              className="bg-primary text-black hover:bg-primary/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Calendar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Calendar/List View */}
        <div className="lg:col-span-2">
          {viewMode === 'calendar' ? (
            <Card className="bg-gray-800/70 border border-primary/40">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-primary text-2xl">
                    {format(currentDate, 'MMMM yyyy')}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                      className="bg-gray-700 border-gray-600 hover:bg-gray-600"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                      className="bg-gray-700 border-gray-600 hover:bg-gray-600"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-gray-400 font-medium text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map(day => {
                    const dayEvents = getEventsForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    
                    return (
                      <div
                        key={day.toISOString()}
                        className={`
                          min-h-[80px] p-1 border border-gray-700 cursor-pointer transition-colors
                          ${isCurrentMonth ? 'bg-gray-800' : 'bg-gray-900/50'}
                          ${isSelected ? 'ring-2 ring-primary' : ''}
                          hover:bg-gray-700
                        `}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className={`text-sm ${isCurrentMonth ? 'text-white' : 'text-gray-500'}`}>
                          {format(day, 'd')}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event, idx) => (
                            <div
                              key={idx}
                              className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                              title={event.title}
                            >
                              {getEventTypeIcon(event.type)} {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event, idx) => (
                <Card key={idx} className="bg-gray-800/70 border border-primary/40">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                          <div>
                            <h3 className="text-xl font-semibold text-primary">{event.title}</h3>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${getEventTypeColor(event.type)}`}>
                              {event.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {format(parseISO(event.start_date), 'MMM d, yyyy')} at {event.start_time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          {event.teams_deployed && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.teams_deployed} teams
                            </div>
                          )}
                        </div>
                      </div>
                      {event.url && (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="bg-gray-800/70 border border-primary/40">
            <CardHeader>
              <CardTitle className="text-primary">Upcoming Events</CardTitle>
              <CardDescription className="text-gray-400">
                Next strategic operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.slice(0, 5).map((event, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded bg-gray-700/50">
                    <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{event.title}</p>
                      <p className="text-xs text-gray-400">
                        {format(parseISO(event.start_date), 'MMM d')} at {event.start_time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Types Legend */}
          <Card className="bg-gray-800/70 border border-primary/40">
            <CardHeader>
              <CardTitle className="text-primary">Event Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { type: 'hackathon', label: 'Hackathons', desc: 'Major competitions' },
                  { type: 'coworking', label: 'Co-working', desc: 'Collaboration sessions' },
                  { type: 'meeting', label: 'Meetings', desc: 'Strategic planning' },
                  { type: 'showcase', label: 'Showcases', desc: 'Project demos' },
                  { type: 'networking', label: 'Networking', desc: 'Social events' },
                  { type: 'workshop', label: 'Workshops', desc: 'Learning sessions' }
                ].map(({ type, label, desc }) => (
                  <div key={type} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getEventTypeColor(type)}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800/70 border border-primary/40">
            <CardHeader>
              <CardTitle className="text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white"
                onClick={() => window.open('https://discord.com/invite/6GaWZAawUc', '_blank')}
              >
                Join Discord
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gray-700 text-white hover:bg-gray-600"
                onClick={handleDownloadICS}
              >
                <Download className="h-4 w-4 mr-2" />
                Export to Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Schedule;