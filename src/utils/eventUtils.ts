import yaml from 'js-yaml';
import { format, parseISO, addWeeks, addMonths, addDays, isBefore, isAfter } from 'date-fns';
import { createEvent, EventAttributes } from 'ics';

export interface KoalitionEvent {
  title: string;
  type: 'hackathon' | 'coworking' | 'meeting' | 'showcase' | 'networking' | 'workshop';
  description: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time: string;
  timezone: string;
  location: string;
  url?: string;
  teams_deployed?: number;
  recurring?: 'weekly' | 'monthly' | 'quarterly';
  recurring_until?: string;
  tags: string[];
}

export interface EventsData {
  events: KoalitionEvent[];
}

// Parse YAML events data
export const parseEventsYaml = (yamlContent: string): EventsData => {
  try {
    return yaml.load(yamlContent) as EventsData;
  } catch (error) {
    console.error('Error parsing events YAML:', error);
    return { events: [] };
  }
};

// Generate recurring events
export const generateRecurringEvents = (event: KoalitionEvent, endDate: Date = new Date('2025-12-31')): KoalitionEvent[] => {
  if (!event.recurring || !event.recurring_until) {
    return [event];
  }

  const events: KoalitionEvent[] = [];
  const startDate = parseISO(event.start_date);
  const recurringEndDate = parseISO(event.recurring_until);
  let currentDate = startDate;

  while (isBefore(currentDate, Math.min(endDate.getTime(), recurringEndDate.getTime()))) {
    const eventCopy = {
      ...event,
      start_date: format(currentDate, 'yyyy-MM-dd'),
      end_date: event.end_date ? format(addDays(currentDate, parseISO(event.end_date!).getTime() - startDate.getTime()), 'yyyy-MM-dd') : undefined
    };
    events.push(eventCopy);

    // Calculate next occurrence
    switch (event.recurring) {
      case 'weekly':
        currentDate = addWeeks(currentDate, 1);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
      case 'quarterly':
        currentDate = addMonths(currentDate, 3);
        break;
    }
  }

  return events;
};

// Convert to ICS format
export const generateICSEvent = (event: KoalitionEvent): EventAttributes => {
  const startDateTime = parseISO(`${event.start_date}T${event.start_time}`);
  const endDateTime = event.end_date 
    ? parseISO(`${event.end_date}T${event.end_time}`)
    : parseISO(`${event.start_date}T${event.end_time}`);

  return {
    title: event.title,
    description: event.description + (event.url ? `\n\nMore info: ${event.url}` : ''),
    start: [
      startDateTime.getFullYear(),
      startDateTime.getMonth() + 1,
      startDateTime.getDate(),
      startDateTime.getHours(),
      startDateTime.getMinutes()
    ],
    end: [
      endDateTime.getFullYear(),
      endDateTime.getMonth() + 1,
      endDateTime.getDate(),
      endDateTime.getHours(),
      endDateTime.getMinutes()
    ],
    location: event.location,
    url: event.url,
    categories: event.tags,
    status: 'CONFIRMED'
  };
};

// Generate ICS file for all events
export const generateICSFile = (events: KoalitionEvent[]): string => {
  const allEvents: KoalitionEvent[] = [];
  
  // Generate all recurring events
  events.forEach(event => {
    allEvents.push(...generateRecurringEvents(event));
  });

  const icsEvents = allEvents.map(generateICSEvent);
  
  let icsContent = '';
  icsEvents.forEach(event => {
    const { error, value } = createEvent(event);
    if (!error && value) {
      icsContent += value;
    }
  });

  return icsContent;
};

// Get events for a specific month
export const getEventsForMonth = (events: KoalitionEvent[], year: number, month: number): KoalitionEvent[] => {
  const allEvents: KoalitionEvent[] = [];
  
  events.forEach(event => {
    allEvents.push(...generateRecurringEvents(event));
  });

  return allEvents.filter(event => {
    const eventDate = parseISO(event.start_date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
};

// Get upcoming events
export const getUpcomingEvents = (events: KoalitionEvent[], limit: number = 5): KoalitionEvent[] => {
  const allEvents: KoalitionEvent[] = [];
  const now = new Date();
  
  events.forEach(event => {
    allEvents.push(...generateRecurringEvents(event));
  });

  return allEvents
    .filter(event => isAfter(parseISO(event.start_date), now))
    .sort((a, b) => parseISO(a.start_date).getTime() - parseISO(b.start_date).getTime())
    .slice(0, limit);
};

// Get event type color
export const getEventTypeColor = (type: string): string => {
  const colors = {
    hackathon: 'bg-red-500',
    coworking: 'bg-blue-500',
    meeting: 'bg-green-500',
    showcase: 'bg-purple-500',
    networking: 'bg-yellow-500',
    workshop: 'bg-indigo-500'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-500';
};

// Get event type icon
export const getEventTypeIcon = (type: string): string => {
  const icons = {
    hackathon: '🏆',
    coworking: '💻',
    meeting: '📋',
    showcase: '🎭',
    networking: '🤝',
    workshop: '🎓'
  };
  return icons[type as keyof typeof icons] || '📅';
};