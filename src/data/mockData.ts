export const mockPosts = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      title: "Product Manager at TechCorp",
      avatar: ""
    },
    content: "Just shipped our latest feature! 🚀 Amazing to see how user feedback drives innovation. The collaboration between design, engineering, and product was seamless.\n\nWhat's your experience with cross-functional teams?",
    timestamp: "2024-08-02T14:30:00Z",
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: "2",
    author: {
      name: "Michael Rodriguez",
      title: "Software Engineer at StartupXYZ",
      avatar: ""
    },
    content: "Attended an incredible AI conference yesterday. The advancements in machine learning are mind-blowing! Key takeaways:\n\n• Edge computing is revolutionizing real-time processing\n• Ethical AI practices are becoming mainstream\n• The intersection of AI and creativity is fascinating\n\nExcited to implement some of these concepts in our next sprint.",
    timestamp: "2024-08-02T10:15:00Z",
    likes: 67,
    comments: 15,
    isLiked: true
  },
  {
    id: "3",
    author: {
      name: "Emily Johnson",
      title: "UX Designer at DesignStudio",
      avatar: ""
    },
    content: "User research reveals such powerful insights! Today's session reminded me why empathy is at the core of great design.\n\nEvery user story matters. Every pain point is an opportunity to create something better.",
    timestamp: "2024-08-02T08:45:00Z",
    likes: 32,
    comments: 12,
    isLiked: false
  },
  {
    id: "4",
    author: {
      name: "David Kim",
      title: "Marketing Director at GrowthCo",
      avatar: ""
    },
    content: "Content marketing tip: Authenticity beats perfection every time.\n\nYour audience connects with genuine stories, not polished advertisements. Share your journey, including the challenges and failures. That's where real connection happens.\n\n#MarketingTips #ContentStrategy",
    timestamp: "2024-08-01T16:20:00Z",
    likes: 89,
    comments: 23,
    isLiked: true
  },
  {
    id: "5",
    author: {
      name: "Lisa Thompson",
      title: "Data Scientist at AnalyticsPro",
      avatar: ""
    },
    content: "Working with messy data today reminded me: 80% of data science is data cleaning, 20% is the fun modeling part.\n\nBut that 80% is where the real magic happens. Clean data = reliable insights = better decisions.\n\nWhat's your biggest data challenge?",
    timestamp: "2024-08-01T12:30:00Z",
    likes: 45,
    comments: 18,
    isLiked: false
  }
];

export const mockUsers = {
  "sarah-chen": {
    name: "Sarah Chen",
    title: "Product Manager at TechCorp",
    bio: "Passionate about building products that solve real problems. 5+ years in product management, focused on user-centered design and data-driven decisions.",
    email: "sarah.chen@techcorp.com",
    avatar: "",
    posts: ["1"]
  },
  "michael-rodriguez": {
    name: "Michael Rodriguez", 
    title: "Software Engineer at StartupXYZ",
    bio: "Full-stack developer with a passion for AI/ML. Building the future one line of code at a time. Love mentoring junior developers.",
    email: "michael.r@startupxyz.com",
    avatar: "",
    posts: ["2"]
  },
  "emily-johnson": {
    name: "Emily Johnson",
    title: "UX Designer at DesignStudio", 
    bio: "Creating delightful user experiences through research-driven design. Advocate for accessibility and inclusive design practices.",
    email: "emily.j@designstudio.com",
    avatar: "",
    posts: ["3"]
  }
};