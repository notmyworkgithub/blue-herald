import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Building, Target, AlertCircle, Heart, Zap, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AnnouncementTool = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!title || !message || !audience || !tone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending the announcement.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Announcement Sent!",
      description: `Your announcement has been sent to ${audience.toLowerCase()}.`,
    });

    // Reset form
    setTitle("");
    setMessage("");
    setAudience("");
    setTone("");
  };

  const getAudienceIcon = (audienceType: string) => {
    switch (audienceType) {
      case "All Staff":
        return <Users className="h-4 w-4" />;
      case "Department":
        return <Building className="h-4 w-4" />;
      case "Team":
        return <Target className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getToneIcon = (toneType: string) => {
    switch (toneType) {
      case "Formal":
        return <AlertCircle className="h-4 w-4" />;
      case "Friendly":
        return <Heart className="h-4 w-4" />;
      case "Urgent":
        return <Zap className="h-4 w-4" />;
      case "Celebratory":
        return <PartyPopper className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getToneStyles = (toneType: string) => {
    switch (toneType) {
      case "Formal":
        return {
          containerClass: "bg-slate-50 border-slate-200",
          titleClass: "text-slate-800 font-semibold",
          messageClass: "text-slate-700 leading-relaxed",
          badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
          prefix: "OFFICIAL NOTICE: "
        };
      case "Friendly":
        return {
          containerClass: "bg-blue-50 border-blue-200",
          titleClass: "text-blue-800 font-medium",
          messageClass: "text-blue-700 leading-relaxed",
          badgeClass: "bg-blue-100 text-blue-700 border-blue-300",
          prefix: "Hey everyone! "
        };
      case "Urgent":
        return {
          containerClass: "bg-red-50 border-red-300 border-l-4 border-l-red-500",
          titleClass: "text-red-800 font-bold uppercase",
          messageClass: "text-red-700 font-medium",
          badgeClass: "bg-red-100 text-red-700 border-red-300",
          prefix: "⚠️ URGENT: "
        };
      case "Celebratory":
        return {
          containerClass: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
          titleClass: "text-purple-800 font-bold",
          messageClass: "text-purple-700 leading-relaxed",
          badgeClass: "bg-purple-100 text-purple-700 border-purple-300",
          prefix: "🎉 Great news! "
        };
      default:
        return {
          containerClass: "bg-corporate-bg border-corporate-shadow/20",
          titleClass: "text-foreground font-semibold",
          messageClass: "text-foreground leading-relaxed",
          badgeClass: "bg-corporate-accent text-corporate-blue border-corporate-blue/20",
          prefix: ""
        };
    }
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Employee Announcement Tool
          </h1>
          <p className="text-muted-foreground text-lg">
            Create and send professional announcements to your team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <Card className="shadow-medium border-0 bg-card">
            <CardHeader className="bg-gradient-corporate text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold">
                Create Announcement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Announcement Title
                </label>
                <Input
                  placeholder="Enter announcement title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-corporate-shadow/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  placeholder="Enter your announcement message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="border-corporate-shadow/20 focus:border-primary resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Audience
                </label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger className="border-corporate-shadow/20 focus:border-primary">
                    <SelectValue placeholder="Select audience..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-corporate-shadow/20">
                    <SelectItem value="All Staff">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        All Staff
                      </div>
                    </SelectItem>
                    <SelectItem value="Department">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Department
                      </div>
                    </SelectItem>
                    <SelectItem value="Team">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Team
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Tone
                </label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="border-corporate-shadow/20 focus:border-primary">
                    <SelectValue placeholder="Select tone..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-corporate-shadow/20">
                    <SelectItem value="Formal">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Formal
                      </div>
                    </SelectItem>
                    <SelectItem value="Friendly">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Friendly
                      </div>
                    </SelectItem>
                    <SelectItem value="Urgent">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Urgent
                      </div>
                    </SelectItem>
                    <SelectItem value="Celebratory">
                      <div className="flex items-center gap-2">
                        <PartyPopper className="h-4 w-4" />
                        Celebratory
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSend}
                className="w-full bg-gradient-corporate hover:bg-corporate-blue-dark text-white font-medium py-3 shadow-soft hover:shadow-medium transition-all duration-200"
                disabled={!title || !message || !audience || !tone}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="shadow-medium border-0 bg-card">
            <CardHeader className="bg-corporate-accent border-b border-corporate-shadow/20">
              <CardTitle className="text-xl font-semibold text-corporate-blue">
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {title || message || audience || tone ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {formatDate()}
                    </div>
                    <div className="flex gap-2">
                      {audience && (
                        <Badge className="bg-corporate-accent text-corporate-blue border-corporate-blue/20">
                          <span className="flex items-center gap-1">
                            {getAudienceIcon(audience)}
                            {audience}
                          </span>
                        </Badge>
                      )}
                      {tone && (
                        <Badge className={getToneStyles(tone).badgeClass}>
                          <span className="flex items-center gap-1">
                            {getToneIcon(tone)}
                            {tone}
                          </span>
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 border ${getToneStyles(tone).containerClass}`}>
                    <h3 className={`text-xl mb-3 ${getToneStyles(tone).titleClass}`}>
                      {tone && getToneStyles(tone).prefix}
                      {title || "Announcement Title"}
                    </h3>
                    <div className={`whitespace-pre-wrap ${getToneStyles(tone).messageClass}`}>
                      {message || "Your announcement message will appear here..."}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-8 h-8 bg-gradient-corporate rounded-full flex items-center justify-center text-white font-medium">
                      HR
                    </div>
                    <div>
                      <div className="font-medium">Human Resources</div>
                      <div className="text-xs">Company Administrator</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 bg-corporate-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-corporate-blue" />
                  </div>
                  <p className="text-lg font-medium mb-2">No Preview Available</p>
                  <p className="text-sm">
                    Fill in the announcement details to see a preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTool;