
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Github, Linkedin, Mail, Code, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const developers = [
    {
      name: "CYIMANA NTWALI Ivan",
      role: "Lead Developer & AI Specialist",
      expertise: ["React", "TypeScript", "AI Integration", "Mobile Development"],
      avatar: "🧑‍💻"
    },
    {
      name: "GANZA KARAMBZI Axel",
      role: "Full-Stack Developer & UI/UX Designer",
      expertise: ["Frontend Development", "Database Design", "User Experience", "API Development"],
      avatar: "👨‍🎨"
    },
    {
      name: "GATETE Boy",
      role: "Backend Developer & DevOps Engineer",
      expertise: ["Backend Systems", "Cloud Infrastructure", "Authentication", "Performance Optimization"],
      avatar: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30">
      <Header />
      
      <main className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-4 p-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="text-center mb-8">
              <div className="w-20 h-20 agriculture-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🌱</span>
              </div>
              <h1 className="text-3xl font-bold text-agriculture-green mb-2">
                About AgriTech Advisor
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Empowering farmers with cutting-edge technology and AI-driven insights 
                for sustainable and profitable agriculture.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <Card className="agriculture-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-agriculture-green">
                <Award className="h-5 w-5" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                AgriTech Advisor is dedicated to revolutionizing agriculture through innovative 
                technology solutions. We combine artificial intelligence, real-time data analysis, 
                and mobile technology to provide farmers with the tools they need to make informed 
                decisions, increase productivity, and promote sustainable farming practices.
              </p>
            </CardContent>
          </Card>

          {/* Development Team */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-agriculture-green mb-6 text-center flex items-center justify-center gap-2">
              <Users className="h-6 w-6" />
              Meet Our Development Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developers.map((developer, index) => (
                <Card key={index} className="agriculture-card hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-agriculture-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">{developer.avatar}</span>
                    </div>
                    <CardTitle className="text-lg text-agriculture-green">
                      {developer.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {developer.role}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise:</h4>
                        <div className="flex flex-wrap gap-1">
                          {developer.expertise.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              variant="secondary" 
                              className="text-xs bg-agriculture-green/10 text-agriculture-green"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Github className="h-3 w-3 mr-1" />
                          GitHub
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Linkedin className="h-3 w-3 mr-1" />
                          LinkedIn
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <Card className="agriculture-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-agriculture-green">
                <Code className="h-5 w-5" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">⚛️</div>
                  <p className="text-sm font-medium">React</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📱</div>
                  <p className="text-sm font-medium">Mobile First</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🤖</div>
                  <p className="text-sm font-medium">AI/ML</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">☁️</div>
                  <p className="text-sm font-medium">Cloud Native</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="agriculture-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-agriculture-green">
                <Mail className="h-5 w-5" />
                Get In Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Have questions, suggestions, or want to collaborate? We'd love to hear from you!
              </p>
              <Button className="w-full bg-agriculture-green hover:bg-agriculture-green/90">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default About;
