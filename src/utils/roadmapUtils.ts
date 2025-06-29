import yaml from 'js-yaml';

export interface RoadmapObjective {
  title: string;
  status: 'completed' | 'in_progress' | 'planning' | 'future';
  description: string;
  progress?: number;
}

export interface RoadmapPhase {
  name: string;
  status: 'completed' | 'in_progress' | 'planning' | 'future';
  timeline: string;
  description: string;
  objectives: RoadmapObjective[];
}

export interface CurrentPriority {
  title: string;
  description: string;
  deadline: string;
  owner: string;
}

export interface Metric {
  name: string;
  current: string | number;
  target: string | number;
  timeline: string;
}

export interface RoadmapData {
  roadmap: {
    current_phase: string;
    last_updated: string;
    phases: RoadmapPhase[];
    current_priorities: CurrentPriority[];
    metrics: Metric[];
  };
}

// Parse YAML roadmap data
export const parseRoadmapYaml = (yamlContent: string): RoadmapData => {
  try {
    return yaml.load(yamlContent) as RoadmapData;
  } catch (error) {
    console.error('Error parsing roadmap YAML:', error);
    return {
      roadmap: {
        current_phase: '',
        last_updated: '',
        phases: [],
        current_priorities: [],
        metrics: []
      }
    };
  }
};

// Get status color
export const getStatusColor = (status: string): string => {
  const colors = {
    completed: 'bg-green-500',
    in_progress: 'bg-blue-500',
    planning: 'bg-yellow-500',
    future: 'bg-gray-500'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
};

// Get status text color
export const getStatusTextColor = (status: string): string => {
  const colors = {
    completed: 'text-green-600',
    in_progress: 'text-blue-600',
    planning: 'text-yellow-600',
    future: 'text-gray-600'
  };
  return colors[status as keyof typeof colors] || 'text-gray-600';
};

// Get progress percentage
export const getProgressPercentage = (objectives: RoadmapObjective[]): number => {
  if (objectives.length === 0) return 0;
  
  const totalProgress = objectives.reduce((sum, obj) => {
    if (obj.status === 'completed') return sum + 100;
    if (obj.progress) return sum + obj.progress;
    if (obj.status === 'in_progress') return sum + 50;
    return sum;
  }, 0);
  
  return Math.round(totalProgress / objectives.length);
};