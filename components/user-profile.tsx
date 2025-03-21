"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Edit,
  LogOut,
  MessageSquare,
  MapPin,
  Mail,
  Globe,
  Twitter,
  Linkedin,
  Github,
  BarChart3,
  BookOpen,
  Save,
  X,
  Camera,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"

interface UserProfileProps {
  language: "en" | "bn"
  onClose: () => void
}

export default function UserProfile({ language, onClose }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and tech lover. Interested in natural language processing and machine learning. Exploring the intersection of technology and creativity.",
    location: "Dhaka, Bangladesh",
    joinDate: "March 2023",
    conversationCount: 42,
    website: "johndoe.dev",
    twitter: "johndoe",
    linkedin: "johndoe",
    github: "johndoe",
    interests: ["AI", "Technology", "Education", "Science", "Machine Learning", "Data Science"],
    avatarUrl: "",
    coverUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
    stats: {
      conversations: 42,
      tokens: 15420,
      questions: 156,
      savedResponses: 23,
    },
    recentTopics: [
      { name: "Machine Learning", count: 12 },
      { name: "Web Development", count: 8 },
      { name: "Data Science", count: 7 },
      { name: "AI Ethics", count: 5 },
    ],
    activity: [
      { date: "2023-10-15", count: 5 },
      { date: "2023-10-16", count: 3 },
      { date: "2023-10-17", count: 7 },
      { date: "2023-10-18", count: 2 },
      { date: "2023-10-19", count: 4 },
      { date: "2023-10-20", count: 6 },
      { date: "2023-10-21", count: 8 },
    ],
  })

  const translations = {
    en: {
      profile: "Profile",
      editProfile: "Edit Profile",
      userProfile: "User Profile",
      name: "Name",
      email: "Email",
      bio: "Bio",
      location: "Location",
      website: "Website",
      joined: "Joined",
      conversations: "Conversations",
      interests: "Interests",
      settings: "Settings",
      logout: "Log Out",
      save: "Save Changes",
      cancel: "Cancel",
      overview: "Overview",
      activity: "Activity",
      settings: "Settings",
      social: "Social Profiles",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      github: "GitHub",
      stats: "Stats",
      tokens: "Tokens Used",
      questions: "Questions Asked",
      savedResponses: "Saved Responses",
      recentTopics: "Recent Topics",
      changeCover: "Change Cover",
      changeAvatar: "Change Avatar",
      personalInfo: "Personal Information",
      socialProfiles: "Social Profiles",
      accountPreferences: "Account Preferences",
    },
    bn: {
      profile: "প্রোফাইল",
      editProfile: "প্রোফাইল সম্পাদনা করুন",
      userProfile: "ব্যবহারকারীর প্রোফাইল",
      name: "নাম",
      email: "ইমেইল",
      bio: "বায়ো",
      location: "অবস্থান",
      website: "ওয়েবসাইট",
      joined: "যোগদান করেছেন",
      conversations: "কথোপকথন",
      interests: "আগ্রহ",
      settings: "সেটিংস",
      logout: "লগ আউট",
      save: "পরিবর্তনগুলি সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      overview: "ওভারভিউ",
      activity: "অ্যাক্টিভিটি",
      settings: "সেটিংস",
      social: "সোশ্যাল প্রোফাইল",
      twitter: "টুইটার",
      linkedin: "লিংকডইন",
      github: "গিটহাব",
      stats: "পরিসংখ্যান",
      tokens: "ব্যবহৃত টোকেন",
      questions: "জিজ্ঞাসিত প্রশ্ন",
      savedResponses: "সংরক্ষিত উত্তর",
      recentTopics: "সাম্প্রতিক বিষয়",
      changeCover: "কভার পরিবর্তন করুন",
      changeAvatar: "অবতার পরিবর্তন করুন",
      personalInfo: "ব্যক্তিগত তথ্য",
      socialProfiles: "সোশ্যাল প্রোফাইল",
      accountPreferences: "অ্যাকাউন্ট পছন্দসমূহ",
    },
  }

  const t = translations[language]

  const handleSaveProfile = () => {
    // In a real app, you would save to a database or API
    setIsEditing(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const ActivityBar = ({ count, max }: { count: number; max: number }) => (
    <div className="h-20 w-8 bg-background/50 rounded-md relative flex items-end overflow-hidden">
      <motion.div
        className="w-full bg-primary/70 rounded-b-md"
        initial={{ height: 0 }}
        animate={{ height: `${(count / max) * 100}%` }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
    </div>
  )

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">{t.userProfile}</DialogTitle>
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-40 w-full relative overflow-hidden">
            <img
              src={profile.coverUrl || "/placeholder.svg?height=160&width=800"}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />

            {isEditing && (
              <Button
                size="sm"
                variant="secondary"
                className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
              >
                <Camera size={14} className="mr-1" />
                {t.changeCover}
              </Button>
            )}
          </div>

          {/* Profile Header */}
          <div className="px-6 pb-4 relative">
            <div className="flex justify-between items-start mt-[-40px] relative z-10">
              <Avatar className="h-20 w-20 border-4 border-background shadow-md relative">
                {profile.avatarUrl ? (
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                ) : (
                  <AvatarFallback className="text-xl bg-primary/90 text-primary-foreground">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                )}
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <Camera size={12} />
                  </Button>
                )}
              </Avatar>

              <div className="flex gap-2 mt-2">
                {!isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5">
                      <Edit size={14} />
                      {t.editProfile}
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 gap-1.5">
                      <LogOut size={14} />
                      {t.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="gap-1.5">
                      <X size={14} />
                      {t.cancel}
                    </Button>
                    <Button variant="default" size="sm" onClick={handleSaveProfile} className="gap-1.5">
                      <Save size={14} />
                      {t.save}
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{profile.location}</span>
                </div>
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <Globe size={14} />
                    <a
                      href={`https://${profile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="border-b">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    {t.overview}
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    {t.activity}
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    {t.settings}
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6 pt-4">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="edit-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{t.personalInfo}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.name}</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">{t.bio}</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">{t.location}</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">{t.website}</Label>
                          <Input
                            id="website"
                            value={profile.website}
                            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{t.socialProfiles}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="twitter" className="flex items-center gap-1">
                            <Twitter size={14} />
                            {t.twitter}
                          </Label>
                          <Input
                            id="twitter"
                            value={profile.twitter}
                            onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin" className="flex items-center gap-1">
                            <Linkedin size={14} />
                            {t.linkedin}
                          </Label>
                          <Input
                            id="linkedin"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github" className="flex items-center gap-1">
                            <Github size={14} />
                            {t.github}
                          </Label>
                          <Input
                            id="github"
                            value={profile.github}
                            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="view-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">{t.bio}</h3>
                        <p className="text-muted-foreground">{profile.bio}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">{t.interests}</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="px-3 py-1">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">{t.stats}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-accent/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare size={16} className="text-primary" />
                              <span className="text-sm font-medium">{t.conversations}</span>
                            </div>
                            <p className="text-2xl font-bold">{profile.stats.conversations}</p>
                          </div>
                          <div className="bg-accent/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <BarChart3 size={16} className="text-primary" />
                              <span className="text-sm font-medium">{t.tokens}</span>
                            </div>
                            <p className="text-2xl font-bold">{profile.stats.tokens.toLocaleString()}</p>
                          </div>
                          <div className="bg-accent/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen size={16} className="text-primary" />
                              <span className="text-sm font-medium">{t.questions}</span>
                            </div>
                            <p className="text-2xl font-bold">{profile.stats.questions}</p>
                          </div>
                          <div className="bg-accent/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen size={16} className="text-primary" />
                              <span className="text-sm font-medium">{t.savedResponses}</span>
                            </div>
                            <p className="text-2xl font-bold">{profile.stats.savedResponses}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">{t.recentTopics}</h3>
                        <div className="space-y-2">
                          {profile.recentTopics.map((topic, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{topic.name}</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium mr-2">{topic.count}</span>
                                <div className="w-24 h-2 bg-accent rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(topic.count / profile.recentTopics[0].count) * 100}%` }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{t.social}</h3>
                      <div className="flex flex-wrap gap-3">
                        {profile.twitter && (
                          <a
                            href={`https://twitter.com/${profile.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-accent/50 hover:bg-accent px-3 py-2 rounded-md transition-colors"
                          >
                            <Twitter size={16} className="text-[#1DA1F2]" />
                            <span className="text-sm">@{profile.twitter}</span>
                          </a>
                        )}
                        {profile.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${profile.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-accent/50 hover:bg-accent px-3 py-2 rounded-md transition-colors"
                          >
                            <Linkedin size={16} className="text-[#0077B5]" />
                            <span className="text-sm">{profile.linkedin}</span>
                          </a>
                        )}
                        {profile.github && (
                          <a
                            href={`https://github.com/${profile.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-accent/50 hover:bg-accent px-3 py-2 rounded-md transition-colors"
                          >
                            <Github size={16} />
                            <span className="text-sm">{profile.github}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="p-6 pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  <div className="flex items-end justify-between h-24 gap-1">
                    {profile.activity.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <ActivityBar count={day.count} max={Math.max(...profile.activity.map((d) => d.count))} />
                        <span className="text-xs mt-1">{day.date.split("-")[2]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Conversations</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="border rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Conversation about Machine Learning</h4>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          We discussed neural networks, deep learning architectures, and practical applications in
                          natural language processing...
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            ML
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            AI
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="p-6 pt-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t.accountPreferences}</h3>

                  <div className="space-y-4 border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Language</h4>
                        <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                      </div>
                      <select className="border rounded-md px-2 py-1 bg-background">
                        <option value="en">English</option>
                        <option value="bn">Bengali</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Theme</h4>
                        <p className="text-sm text-muted-foreground">Choose light or dark theme</p>
                      </div>
                      <select className="border rounded-md px-2 py-1 bg-background">
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="system">System</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive email updates</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy</h3>

                  <div className="space-y-4 border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Conversation History</h4>
                        <p className="text-sm text-muted-foreground">Save your chat history</p>
                      </div>
                      <input type="checkbox" checked className="toggle" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Collection</h4>
                        <p className="text-sm text-muted-foreground">Allow anonymous usage data</p>
                      </div>
                      <input type="checkbox" checked className="toggle" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="destructive" className="w-full sm:w-auto">
                    Delete Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

