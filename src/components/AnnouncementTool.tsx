import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Building, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AnnouncementTool = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (!title || !message || !audience) {
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

              <Button
                onClick={handleSend}
                className="w-full bg-gradient-corporate hover:bg-corporate-blue-dark text-white font-medium py-3 shadow-soft hover:shadow-medium transition-all duration-200"
                disabled={!title || !message || !audience}
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
              {title || message || audience ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {formatDate()}
                    </div>
                    {audience && (
                      <Badge className="bg-corporate-accent text-corporate-blue border-corporate-blue/20">
                        <span className="flex items-center gap-1">
                          {getAudienceIcon(audience)}
                          {audience}
                        </span>
                      </Badge>
                    )}
                  </div>

                  <div className="bg-corporate-bg rounded-lg p-4 border border-corporate-shadow/20">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {title || "Announcement Title"}
                    </h3>
                    <div className="text-foreground leading-relaxed whitespace-pre-wrap">
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