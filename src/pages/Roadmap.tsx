import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle, Clock, Calendar, Target, TrendingUp, Users, Award } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { 
  parseRoadmapYaml, 
  getStatusColor, 
  getStatusTextColor, 
  getProgressPercentage,
  type RoadmapData,
  type RoadmapPhase,
  type CurrentPriority,
  type Metric
} from '../utils/roadmapUtils';

// Sample YAML data (in production, this would be loaded from the actual file)
const SAMPLE_ROADMAP_YAML = `
roadmap:
  current_phase: "Expansion & Optimization"
  last_updated: "2025-01-10"
  
  phases:
    - name: "Foundation Phase"
      status: "completed"
      timeline: "Q4 2024"
      description: "Establish core alliance structure and initial team coordination"
      objectives:
        - title: "Discord Infrastructure"
          status: "completed"
          description: "Set up comprehensive Discord server with strategic channels"
        - title: "Initial Team Formation"
          status: "completed"
          description: "Recruit and organize first 3 coordinated teams"
        - title: "Coordination Protocols"
          status: "completed"
          description: "Develop team coordination and communication protocols"

    - name: "Expansion & Optimization"
      status: "in_progress"
      timeline: "Q1-Q2 2025"
      description: "Scale operations and optimize coordination strategies"
      objectives:
        - title: "Platform Development"
          status: "in_progress"
          description: "Build comprehensive web platform for alliance management"
          progress: 60
        - title: "Team Scaling"
          status: "in_progress"
          description: "Expand to 8-10 coordinated teams across major hackathons"
          progress: 40
        - title: "Project Preservation System"
          status: "planning"
          description: "Implement automated project documentation and preservation"
          progress: 20
        - title: "Intelligence Network"
          status: "in_progress"
          description: "Develop hackathon intelligence gathering and sharing system"
          progress: 70

    - name: "Market Dominance"
      status: "planning"
      timeline: "Q3-Q4 2025"
      description: "Establish DKK as the premier hackathon alliance"
      objectives:
        - title: "Major League Presence"
          status: "planning"
          description: "Deploy teams to all top-tier hackathons (MIT, Stanford, etc.)"
        - title: "Incubator Partnerships"
          status: "planning"
          description: "Establish formal partnerships with startup incubators"
        - title: "Corporate Sponsorships"
          status: "planning"
          description: "Secure corporate sponsors for alliance operations"
        - title: "Alumni Network"
          status: "planning"
          description: "Build network of successful DKK alumni in tech industry"

    - name: "Ecosystem Leadership"
      status: "future"
      timeline: "2026+"
      description: "Lead and shape the hackathon ecosystem"
      objectives:
        - title: "Hackathon Consulting"
          status: "future"
          description: "Provide strategic consulting to hackathon organizers"
        - title: "Educational Programs"
          status: "future"
          description: "Develop hackathon strategy courses and certifications"
        - title: "Industry Standards"
          status: "future"
          description: "Help establish industry standards for hackathon coordination"
        - title: "Global Expansion"
          status: "future"
          description: "Expand alliance operations to international hackathons"

  current_priorities:
    - title: "Q1 2025 Hackathon Season"
      description: "Successfully coordinate teams across 5 major hackathons"
      deadline: "2025-03-31"
      owner: "Strategy Team"
      
    - title: "Platform Beta Launch"
      description: "Launch beta version of alliance management platform"
      deadline: "2025-02-15"
      owner: "Tech Team"
      
    - title: "Project Preservation Pipeline"
      description: "Implement system to preserve and develop winning projects"
      deadline: "2025-03-01"
      owner: "Project Team"
      
    - title: "Recruitment Drive"
      description: "Recruit 50 new active members across all skill levels"
      deadline: "2025-02-28"
      owner: "Community Team"

  metrics:
    - name: "Active Teams"
      current: 5
      target: 10
      timeline: "Q2 2025"
      
    - name: "Hackathon Win Rate"
      current: "35%"
      target: "50%"
      timeline: "Q4 2025"
      
    - name: "Projects Preserved"
      current: 12
      target: 50
      timeline: "Q4 2025"
      
    - name: "Incubator Placements"
      current: 2
      target: 10
      timeline: "Q4 2025"
      
    - name: "Active Members"
      current: 85
      target: 200
      timeline: "Q3 2025"
`;

function Roadmap() {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string>('');

  useEffect(() => {
    // In production, you would fetch this from the actual YAML file
    const data = parseRoadmapYaml(SAMPLE_ROADMAP_YAML);
    setRoadmapData(data);
    if (data.roadmap.phases.length > 0) {
      setSelectedPhase(data.roadmap.phases[0].name);
    }
  }, []);

  if (!roadmapData) {
    return <div className="container mx-auto px-4 py-8">Loading roadmap...</div>;
  }

  const { roadmap } = roadmapData;
  const selectedPhaseData = roadmap.phases.find(phase => phase.name === selectedPhase);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'planning':
        return <Calendar className="h-5 w-5 text-yellow-500" />;
      case 'future':
        return <Target className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Koalition Roadmap</h1>
        <p className="text-gray-300 mb-4">
          Strategic objectives and milestones for alliance dominance
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Current Phase: <span className="text-primary font-semibold">{roadmap.current_phase}</span></span>
          <span>Last Updated: {format(parseISO(roadmap.last_updated), 'MMM d, yyyy')}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Phase Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800/70 border border-primary/40 sticky top-4">
            <CardHeader>
              <CardTitle className="text-primary">Roadmap Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roadmap.phases.map((phase, idx) => (
                  <button
                    key={phase.name}
                    onClick={() => setSelectedPhase(phase.name)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-colors
                      ${selectedPhase === phase.name 
                        ? 'bg-primary/20 border border-primary/40' 
                        : 'bg-gray-700/50 hover:bg-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(phase.status)}
                      <span className="font-medium text-white text-sm">{phase.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">{phase.timeline}</div>
                    <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                      <div 
                        className={`h-1.5 rounded-full ${getStatusColor(phase.status)}`}
                        style={{ width: `${getProgressPercentage(phase.objectives)}%` }}
                      ></div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Selected Phase Details */}
          {selectedPhaseData && (
            <Card className="bg-gray-800/70 border border-primary/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(selectedPhaseData.status)}
                    <div>
                      <CardTitle className="text-primary text-2xl">{selectedPhaseData.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {selectedPhaseData.timeline} • {selectedPhaseData.status.replace('_', ' ').toUpperCase()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {getProgressPercentage(selectedPhaseData.objectives)}%
                    </div>
                    <div className="text-xs text-gray-400">Complete</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">{selectedPhaseData.description}</p>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Objectives</h4>
                  {selectedPhaseData.objectives.map((objective, idx) => (
                    <div key={idx} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(objective.status)}
                          <h5 className="font-medium text-white">{objective.title}</h5>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusTextColor(objective.status)} bg-gray-600`}>
                          {objective.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{objective.description}</p>
                      {objective.progress !== undefined && (
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${objective.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Priorities */}
          <Card className="bg-gray-800/70 border border-primary/40">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Current Priorities
              </CardTitle>
              <CardDescription className="text-gray-400">
                Active initiatives requiring immediate focus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {roadmap.current_priorities.map((priority, idx) => (
                  <div key={idx} className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{priority.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{priority.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">
                        Due: {format(parseISO(priority.deadline), 'MMM d, yyyy')}
                      </span>
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                        {priority.owner}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card className="bg-gray-800/70 border border-primary/40">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Award className="h-5 w-5" />
                Key Metrics
              </CardTitle>
              <CardDescription className="text-gray-400">
                Tracking our progress toward strategic dominance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roadmap.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-white mb-2">{metric.name}</h4>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {metric.current}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      Target: {metric.target}
                    </div>
                    <div className="text-xs text-gray-500">
                      By {metric.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline Overview */}
          <Card className="bg-gray-800/70 border border-primary/40">
            <CardHeader>
              <CardTitle className="text-primary">Strategic Timeline</CardTitle>
              <CardDescription className="text-gray-400">
                High-level view of our evolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roadmap.phases.map((phase, idx) => (
                  <div key={phase.name} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(phase.status)}`}></div>
                      {idx < roadmap.phases.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-600 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-white">{phase.name}</h4>
                        <span className="text-xs text-gray-400">{phase.timeline}</span>
                      </div>
                      <p className="text-sm text-gray-400">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;