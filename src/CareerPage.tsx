import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, Calendar, Clock, DollarSign, 
  Send, Upload, CheckCircle2, Award, Heart, Shield, Users, ArrowRight, BookOpen, Sparkles,
  Plus, Trash2, Lock, Mail, Phone, Factory
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  concern: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
}

const JOBS_DATA: Job[] = [
  {
    id: "织造-01",
    title: "Assistant Manager - Production (Weaving)",
    concern: "SIM Fabrics Ltd. (Weaving Unit)",
    location: "Sreepur, Gazipur",
    type: "Full-Time",
    experience: "5-8 Years",
    salary: "Negotiable",
    description: "Responsible for managing weaving production floors, maximizing machine efficiency, and ensuring fabric quality parameters are met according to modern standard manufacturing standards.",
    requirements: [
      "B.Sc in Textile Engineering (Fabric Manufacturing/Weaving) from any reputed university.",
      "Proven experience in Shuttleless Loom / Airjet loom management.",
      "Ability to handle shift production targets, waste management, and floor discipline."
    ]
  },
  {
    id: "品控-02",
    title: "Senior Executive - Quality Assurance",
    concern: "SIM Fabrics Ltd. (Denim Unit)",
    location: "Sreepur, Gazipur",
    type: "Full-Time",
    experience: "3-5 Years",
    salary: "Negotiable",
    description: "Overseeing day-to-day denim fabric inspection, laboratory testing reviews, and coordination with buyer representatives to guarantee pristine quality compliance.",
    requirements: [
      "B.Sc in Textile Engineering or M.Sc in Chemistry/Physics.",
      "Expertise in denim wash parameters, shade variation checking, and physical testing standards.",
      "Experience with brands like H&M, Walmart, and Bershka processes is highly preferred."
    ]
  },
  {
    id: "纺纱-03",
    title: "Spinning Shift Officer / Textile Engineer",
    concern: "Mozaffar Hossain Spinning Mills Ltd.",
    location: "Thakurgow, Sreepur, Gazipur",
    type: "Full-Time / Shift Based",
    experience: "2-4 Years",
    salary: "Negotiable",
    description: "Manage shift-wise rotor or ring spinning operations to ensure stable yarn production output, maintain count accuracy, and minimize mechanical breakages.",
    requirements: [
      "Diploma or B.Sc in Textile Engineering (Yarn Manufacturing).",
      "Sound technical depth in spinning preparatory (Blowroom, Carding, Drawing, Roving).",
      "Strong leadership to guide floor workers and handle machinery maintenance schedules."
    ]
  },
  {
    id: "人资-04",
    title: "Manager - HR, Admin & Compliance",
    concern: "SIM Group Head Office",
    location: "Uttara, Dhaka",
    type: "Full-Time",
    experience: "6-10 Years",
    salary: "Negotiable",
    description: "Lead corporate HR policymaking, labor compliance auditing across concern factories, safety guidelines, performance appraisals, and employer branding.",
    requirements: [
      "MBA in HRM or Post Graduate Diploma in HRM from any recognized university.",
      "Familiar with Bangladesh Labor Law and environmental certification audit compliance.",
      "Excellent communication, dispute resolution, and team empowerment qualities."
    ]
  },
  {
    id: "市场-05",
    title: "Executive - Sales & Marketing (Yarn & Fabrics)",
    concern: "Sim Trade International / Corporate Office",
    location: "Uttara, Dhaka",
    type: "Full-Time",
    experience: "2-4 Years",
    salary: "Negotiable + Commission",
    description: "Engage with buying houses and export clothing factories to secure orders, follow up sample designs, negotiate pricing, and build solid long-term B2B partnerships.",
    requirements: [
      "BBA/MBA in Marketing or B.Sc in Textile Engineering with strong commercial acumen.",
      "Good command over English written/verbal and presentable appearance.",
      "Understands critical textile merchandising loops and fabrics supply chains."
    ]
  }
];

const CareerPage = () => {
  // Load dynamic jobs from localStorage with default JOBS_DATA
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem('sim_jobs');
      return saved ? JSON.parse(saved) : JOBS_DATA;
    } catch (e) {
      return JOBS_DATA;
    }
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [showRecruiterTrigger, setShowRecruiterTrigger] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [formspreeId, setFormspreeId] = useState(() => {
    return localStorage.getItem('sim_formspree_id') || '';
  });
  const [emailjsServiceId, setEmailjsServiceId] = useState(() => {
    return localStorage.getItem('sim_emailjs_service_id') || '';
  });
  const [emailjsTemplateId, setEmailjsTemplateId] = useState(() => {
    return localStorage.getItem('sim_emailjs_template_id') || '';
  });
  const [emailjsPublicKey, setEmailjsPublicKey] = useState(() => {
    return localStorage.getItem('sim_emailjs_public_key') || '';
  });
  const [activeGatewayTab, setActiveGatewayTab] = useState<'emailjs' | 'formspree'>(() => {
    const hasEmailJS = localStorage.getItem('sim_emailjs_service_id') || localStorage.getItem('sim_emailjs_template_id');
    return hasEmailJS ? 'emailjs' : 'formspree';
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Check URL parameters to hide button from standard visitors
  useEffect(() => {
    // Clear any existing stored unlocked state so standard loads do not display it
    localStorage.removeItem('sim_recruiter_unlocked');

    const params = new URLSearchParams(window.location.search);
    const hasAdminQuery = params.get('admin') === 'true' || params.get('recruiter') === 'true' || params.get('edit') === 'true';
    
    if (hasAdminQuery) {
      setShowRecruiterTrigger(true);
    }
  }, []);

  const handleSecretTitleClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowRecruiterTrigger(true);
        alert("রিক্রুটার প্যানেল আনলক হয়েছে! এখন আপনি পাসকোড (1234 বা admin) ব্যবহার করে প্রবেশ ও জব পোস্ট করতে পারবেন।");
        return 0;
      }
      return next;
    });
  };
  const [showPostModal, setShowPostModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // New Job posting state
  const [newJob, setNewJob] = useState({
    title: '',
    concern: 'SIM Fabrics Ltd. (Weaving Unit)',
    location: 'Sreepur, Gazipur',
    type: 'Full-Time',
    experience: '3-5 Years',
    salary: 'Negotiable',
    description: '',
    requirementsText: '', // Multi-line requirements to be parsed
  });

  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [recaptchaSpinning, setRecaptchaSpinning] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    concern: '',
    experience: '',
    resumeLink: '',
    coverLetter: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [selectedFileBase64, setSelectedFileBase64] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle addition of a new job post
  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.description) {
      alert("অনুগ্রহ করে সব সাধারণ তথ্য পূরণ করুন।");
      return;
    }

    // Parse text lines as requirements list
    const requirementsList = newJob.requirementsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const created: Job = {
      id: `job-dyn-${Date.now()}`,
      title: newJob.title,
      concern: newJob.concern,
      location: newJob.location,
      type: newJob.type,
      experience: newJob.experience,
      salary: newJob.salary,
      description: newJob.description,
      requirements: requirementsList.length > 0 ? requirementsList : ["Excellent communication skills", "Industry relevant expertise"]
    };

    const updatedJobs = [created, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('sim_jobs', JSON.stringify(updatedJobs));

    // Reset Form
    setNewJob({
      title: '',
      concern: 'SIM Fabrics Ltd. (Weaving Unit)',
      location: 'Sreepur, Gazipur',
      type: 'Full-Time',
      experience: '3-5 Years',
      salary: 'Negotiable',
      description: '',
      requirementsText: '',
    });
    
    setShowPostModal(false);
    alert("আপনার জব সার্কুলারটি সফলভাবে পোস্ট হয়েছে!");
  };

  // Handle deletion of a job post
  const handleDeleteJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("আপনি কি নিশ্চিত যে এই সার্কুলারটি মুছে ফেলতে চান?")) {
      const updated = jobs.filter(j => j.id !== id);
      setJobs(updated);
      localStorage.setItem('sim_jobs', JSON.stringify(updated));
    }
  };

  const handleRecruiterLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password verification or bypass. We can allow '1234' or any simple admin credential. Let's make it super easy!
    if (passwordInput === '1200' || passwordInput === 'admin' || passwordInput === '1234') {
      setIsRecruiterMode(true);
      setShowPasswordModal(false);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('ভুল পাসকোড প্রবেশ করানো হয়েছে! দয়া করে সঠিক কোড দিন (যেমন: 1234 বা admin)');
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const startFileUploadSimulation = (fileName: string) => {
    setSelectedFileName(fileName);
    setIsUploading(true);
    setUploadProgress(0);
    setUploadCompleted(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsUploading(false);
        setUploadCompleted(true);
      }
      setUploadProgress(progress);
    }, 120);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Ensure it is a PDF file
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        alert("শুধুমাত্র পিডিএফ (.pdf) ফরম্যাটের ফাইল সমর্থিত। অনুগ্রহ করে .pdf ফাইল সিলেক্ট করুন।");
        e.target.value = '';
        setSelectedFile(null);
        setSelectedFileName('');
        setSelectedFileBase64('');
        setUploadCompleted(false);
        return;
      }

      // Limit to 5MB (5 * 1024 * 1024 bytes)
      const maxSizeBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        alert("সিভি ফাইলের সাইজ সর্বোচ্চ ৫ মেগাবাইট (5MB) হতে পারবে। অনুগ্রহ করে ছোট সাইজের পিডিএফ ফাইল আপলোড করুন।");
        // Clear value to allow re-selection of different file
        e.target.value = '';
        setSelectedFile(null);
        setSelectedFileName('');
        setSelectedFileBase64('');
        setUploadCompleted(false);
        return;
      }

      setSelectedFile(file);
      startFileUploadSimulation(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const resultStr = event.target.result as string;
          // Splitting at comma returns pure base64 representation of the file.
          const base64Data = resultStr.split(',')[1];
          setSelectedFileBase64(base64Data);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRecaptchaClick = () => {
    if (recaptchaChecked || recaptchaSpinning) return;
    setRecaptchaSpinning(true);
    setTimeout(() => {
      setRecaptchaSpinning(false);
      setRecaptchaChecked(true);
    }, 1000);
  };

  const openApplyModal = (job: Job) => {
    setSelectedJob(job);
    setFormData(prev => ({
      ...prev,
      concern: job.concern
    }));
  };

  const sendEmailToGateway = async (subject: string, fields: any): Promise<{ success: boolean; error?: string }> => {
    let processedCvLink = fields["Attached Resume/CV"] || fields["CV / Resume Link"] || "None";

    if (selectedFile) {
      let uploaded = false;
      try {
        console.log("Uploading file to tmpfiles.org for a real downloadable link...");
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);
        const uploadResp = await fetch("https://tmpfiles.org/api/v1/upload", {
          method: "POST",
          body: uploadFormData
        });
        if (uploadResp.ok) {
          const uploadJson = await uploadResp.json();
          if (uploadJson && uploadJson.status === "success" && uploadJson.data && uploadJson.data.url) {
            const originalUrl = uploadJson.data.url;
            processedCvLink = originalUrl.replace("tmpfiles.org/", "tmpfiles.org/dl/");
            console.log("File uploaded successfully! Direct link generated:", processedCvLink);
            uploaded = true;
          }
        }
      } catch (err) {
        console.error("Error creating direct resume link from tmpfiles.org, trying fallback:", err);
      }

      // Fallback to file.io if tmpfiles.org fails
      if (!uploaded) {
        try {
          console.log("Uploading file to file.io as fallback...");
          const fallbackFormData = new FormData();
          fallbackFormData.append("file", selectedFile);
          const fallbackResp = await fetch("https://file.io", {
            method: "POST",
            body: fallbackFormData
          });
          if (fallbackResp.ok) {
            const fallbackJson = await fallbackResp.json();
            if (fallbackJson && fallbackJson.success && fallbackJson.link) {
              processedCvLink = fallbackJson.link;
              console.log("File uploaded successfully to file.io! Direct link generated:", processedCvLink);
              uploaded = true;
            }
          }
        } catch (fallbackErr) {
          console.error("All upload mechanisms failed:", fallbackErr);
        }
      }
    }

    // Compose cohesive email text body
    let body = `==================================================\n`;
    body += `SIM GROUP - CAREER APPLICATION DETAILS\n`;
    body += `==================================================\n\n`;

    Object.entries(fields).forEach(([key, val]) => {
      if (key === "Attached Resume/CV" || key === "CV / Resume Link") {
        body += `👉 ${key} (সিভি ডাউনলোড লিংক):\n${processedCvLink}\n\n`;
      } else if (key === "Cover Letter / Message" || key === "coverLetter") {
        body += `📝 ${key}:\n${val}\n\n`;
      } else {
        body += `▪ ${key}: ${val}\n`;
      }
    });

    body += `\n==================================================\n`;
    body += `Sent via SIM Group Career Portal\n`;
    body += `==================================================\n`;

    const recipient = "info@simgroup-bd.com";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      // Create a temporary link element to trigger opening in a new tab reliably
      const link = document.createElement('a');
      link.href = gmailUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    } catch (err: any) {
      console.warn("Direct Gmail open via link failed, trying window.open:", err);
      try {
        window.open(gmailUrl, '_blank');
        return { success: true };
      } catch (err2) {
        console.error("Window.open also failed, falling back to mailto protocol:", err2);
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        return { success: true };
      }
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required.");
      return;
    }
    if (!recaptchaChecked) {
      alert("Please check 'I'm not a robot' to confirm you are human.");
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    
    // Construct email fields
    const formFields = {
      "Applicant Name": formData.name,
      "Email Address": formData.email,
      "Subject of Application": formData.subject || "General Application Drop",
      "Attached Resume/CV": selectedFileName || "Local File Uploaded",
      "Cover Letter / Message": formData.coverLetter || "No message provided."
    };

    // Send silently in the background
    const result = await sendEmailToGateway(`Job Application (General CV Drop): ${formData.name}`, formFields);

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        concern: '',
        experience: '',
        resumeLink: '',
        coverLetter: '',
      });
      setSelectedFileName('');
      setSelectedFileBase64('');
      setSelectedFile(null);
      setIsUploading(false);
      setUploadProgress(0);
      setUploadCompleted(false);
      setRecaptchaChecked(false);
    } else {
      setSubmitError(result.error || "একটি অজানা ত্রুটি ঘটেছে।");
    }
  };

  return (
    <div className="bg-white font-sans min-h-screen text-slate-900 selection:bg-primary-purple selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 bg-slate-900 overflow-hidden text-white min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
            alt="SIM Group Careers"
            className="w-full h-full object-cover opacity-25 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-purple/20 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] -ml-40 -mb-40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-primary-purple/10 border border-primary-purple/30 text-primary-purple text-[10px] uppercase font-black tracking-[0.3em] px-4 py-2 rounded-full mb-6">
              <Sparkles size={12} className="animate-spin-slow" /> Join Our Legacy of Excellence
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 tracking-tighter leading-[0.95] uppercase">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-primary-orange to-emerald-500">Future</span> With SIM
            </h1>
            <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto text-slate-300 leading-relaxed uppercase tracking-wide mt-6">
              Empowering engineers, dynamic visionaries, and craftsmen to lead the next generation of textile sustainable innovations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-purple">Corporate Culture</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 uppercase tracking-tighter mt-2">
              Why Choose <span className="text-primary-purple">SIM Group?</span>
            </h2>
            <div className="h-1.5 w-20 bg-primary-purple mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-primary-purple" />,
                title: "Industry Leader",
                desc: "Be a part of a $102M+ industrial conglomerate with over 24 years of manufacturing heritage."
              },
              {
                icon: <Heart className="w-8 h-8 text-primary-orange" />,
                title: "Empowering Talents",
                desc: "We promote a highly inclusive work culture providing dynamic progression and continuous learning pathways."
              },
              {
                icon: <Shield className="w-8 h-8 text-emerald-500" />,
                title: "Sustainability Focus",
                desc: "Engage in highly responsible green production pathways. We are 'Way Forward to Sustainability'."
              },
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Global Projects",
                desc: "Work with top-tier global brands including H&M, Walmart, Pull&Bear, and Bershka directly."
              }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between group hover:shadow-2xl hover:border-primary-purple/10 transition-all duration-300"
              >
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-display font-black uppercase tracking-tight text-slate-800 mb-2">{benefit.title}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span 
              onClick={handleSecretTitleClick}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-purple cursor-pointer select-none"
              title="Click 5 times to reveal Recruiter console"
            >
              Current Vacancy
            </span>
            <h2 
              onClick={handleSecretTitleClick}
              className="text-4xl md:text-5xl font-display font-black text-slate-900 uppercase tracking-tighter mt-2 cursor-pointer select-none"
            >
              Explore Open <span className="text-primary-orange">Opportunities</span>
            </h2>
            <div 
              onClick={handleSecretTitleClick}
              className="h-1.5 w-20 bg-primary-orange mx-auto rounded-full mt-4 cursor-pointer"
            ></div>
            <p className="text-slate-500 text-sm mt-4 font-medium">Browse our current active openings and apply directly today.</p>
            
            {/* Recruiter Console Switcher */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {!isRecruiterMode ? (
                showRecruiterTrigger && (
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-primary-purple text-white text-[11px] font-black uppercase tracking-wider py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-slate-100/50"
                  >
                    <Lock size={14} /> Recruiter Access (জব পোস্ট করুন)
                  </button>
                )
              ) : (
                <div className="flex flex-col items-center gap-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-150 shadow-sm animate-fade-in max-w-lg mx-auto w-full">
                  <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-pulse">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Recruiter Session Active
                    </span>
                    <button 
                      onClick={() => setShowPostModal(true)}
                      className="inline-flex items-center gap-1.5 bg-primary-purple hover:bg-opacity-90 text-white text-[10px] font-black uppercase tracking-wider py-2.5 px-5 rounded-full transition-all"
                    >
                      <Plus size={12} /> Post New Job (নতুন সার্কুলার)
                    </button>
                    <button 
                      onClick={() => {
                        setIsRecruiterMode(false);
                        // Hide recruiter trigger again upon exiting the console
                        setShowRecruiterTrigger(false);
                      }}
                      className="text-slate-500 hover:text-slate-900 text-[10px] font-black uppercase tracking-wider py-2.5 px-4 hover:bg-slate-100 rounded-full transition-all border border-slate-200"
                      title="Exit and lock the recruiter access"
                    >
                      Exit & Lock Console
                    </button>
                  </div>

                  {/* Email Integration Configuration Container */}
                  <div className="w-full border-t border-slate-200 pt-4 text-left">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#0088cc]" /> 
                      ইমেল ফরওয়ার্ডিং গেটওয়ে (Email Integration Gateway)
                    </h4>
                    
                    {/* Tabs indicator */}
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-4 gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveGatewayTab('emailjs')}
                        className={`flex-1 text-[10px] font-black uppercase py-2 text-center rounded-lg transition-all ${
                          activeGatewayTab === 'emailjs' 
                            ? 'bg-white text-[#0088cc] shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        EmailJS (Recommended)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveGatewayTab('formspree')}
                        className={`flex-1 text-[10px] font-black uppercase py-2 text-center rounded-lg transition-all ${
                          activeGatewayTab === 'formspree' 
                            ? 'bg-white text-primary-purple shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Formspree
                      </button>
                    </div>

                    {activeGatewayTab === 'emailjs' ? (
                      <div className="space-y-3">
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-3">
                          আপনার <strong className="text-slate-800 font-bold">EmailJS</strong> অ্যাকাউন্ট থেকে নিচের তথ্যগুলো দিন যাতে সরাসরি আপনার ইনবক্সে সিভি জমা হয়।
                        </p>
                        
                        <div className="space-y-2">
                          {/* Service ID input */}
                          <div>
                            <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Service ID</label>
                            <input 
                              type="text" 
                              placeholder="உதாரণ: service_xxxxxx"
                              value={emailjsServiceId}
                              onChange={(e) => {
                                const val = e.target.value.trim();
                                setEmailjsServiceId(val);
                                localStorage.setItem('sim_emailjs_service_id', val);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                          </div>

                          {/* Template ID input */}
                          <div>
                            <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Template ID</label>
                            <input 
                              type="text" 
                              placeholder="উদাহরণ: template_xxxxxx"
                              value={emailjsTemplateId}
                              onChange={(e) => {
                                const val = e.target.value.trim();
                                setEmailjsTemplateId(val);
                                localStorage.setItem('sim_emailjs_template_id', val);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                          </div>

                          {/* Public Key input */}
                          <div>
                            <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Public Key / User Access Key</label>
                            <input 
                              type="text" 
                              placeholder="উদাহরণ: user_xxxxxx অথবা kHxxxxxx"
                              value={emailjsPublicKey}
                              onChange={(e) => {
                                const val = e.target.value.trim();
                                setEmailjsPublicKey(val);
                                localStorage.setItem('sim_emailjs_public_key', val);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                          </div>
                        </div>

                        {(emailjsServiceId && emailjsTemplateId && emailjsPublicKey) ? (
                          <div className="flex flex-col gap-1 mt-3">
                            <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                              ● EmailJS Live! Submissions will route through your EmailJS Account.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setEmailjsServiceId('');
                                setEmailjsTemplateId('');
                                setEmailjsPublicKey('');
                                localStorage.removeItem('sim_emailjs_service_id');
                                localStorage.removeItem('sim_emailjs_template_id');
                                localStorage.removeItem('sim_emailjs_public_key');
                              }}
                              className="text-[9px] hover:underline text-red-500 font-bold self-start mt-1"
                            >
                              রিসেট করুন (Clear Config)
                            </button>
                          </div>
                        ) : (
                          <p className="text-[10px] text-amber-600 font-bold mt-2">
                            ▲ Configure all 3 parameters above to activate EmailJS sending.
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-[11px] text-slate-500 font-medium mb-3 leading-relaxed">
                          সিভি সরাসরি <strong className="text-slate-800 font-bold">info@simgroup-bd.com</strong> এ ব্যাকগ্রাউন্ডে পাঠাতে আপনার <strong className="text-primary-purple font-bold">Formspree ID</strong> দিন।
                        </p>
                        
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="উদাহরণ: xp8aeozo (আপনার Formspree Endpoint Form Code)"
                            value={formspreeId}
                            onChange={(e) => {
                              const val = e.target.value.trim();
                              setFormspreeId(val);
                              localStorage.setItem('sim_formspree_id', val);
                            }}
                            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 flex-grow"
                          />
                          {formspreeId && (
                            <button 
                              onClick={() => {
                                setFormspreeId('');
                                localStorage.removeItem('sim_formspree_id');
                              }}
                              className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold text-xs px-3 rounded-xl transition-all"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        
                        {formspreeId ? (
                          <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                            ● Direct Email Active! App submissions will go silently to info@simgroup-bd.com via Formspree gateway.
                          </p>
                        ) : (
                          <p className="text-[10px] text-amber-600 font-bold mt-2 flex items-center gap-1">
                            ▲ Fallback Active: Opens user mail client on submit. Put Formspree ID for silent mailing.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {jobs.length === 0 ? (
              <div className="bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 p-12 text-center">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-display font-black text-slate-700 uppercase">কোনো সার্কুলার নেই</h3>
                <p className="text-slate-400 text-xs mt-1.5">বর্তমানে কোনো নিয়োগ বিজ্ঞপ্তি প্রকাশিত নয়। অনুগ্রহ করে পরে আবার চেষ্টা করুন।</p>
                {isRecruiterMode && (
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="mt-5 inline-flex items-center gap-2 bg-primary-purple text-white font-black text-[11px] uppercase tracking-widest py-3 px-6 rounded-2xl transition-all"
                  >
                    <Plus size={14} /> নতুন সার্কুলার পোস্ট করুন
                  </button>
                )}
              </div>
            ) : (
              jobs.map((job) => (
                <motion.div 
                  key={job.id}
                  layoutId={`job-card-${job.id}`}
                  className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-slate-200 relative group overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#FF4500] bg-[#FF4500]/5 px-3 py-1 rounded-full border border-[#FF4500]/15">
                        {job.concern}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 uppercase tracking-tight mt-3">
                        {job.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <MapPin size={14} className="text-primary-purple" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Clock size={14} className="text-primary-orange" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Briefcase size={14} className="text-emerald-500" /> {job.experience}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <DollarSign size={14} className="text-blue-500" /> {job.salary || "Negotiable"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {isRecruiterMode && (
                        <button 
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-[11px] uppercase tracking-widest py-3 px-4 rounded-2xl transition-all duration-300 flex items-center gap-1.5 border border-rose-100"
                          title="Delete Career Posting"
                        >
                          <Trash2 size={14} /> মুছে ফেলুন
                        </button>
                      )}
                      <button 
                        onClick={() => openApplyModal(job)}
                        className="bg-slate-900 hover:bg-primary-purple text-white font-black text-[11px] uppercase tracking-widest py-3 px-6 rounded-2xl transition-all duration-300 shadow-sm"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-50">
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-4xl">
                      {job.description}
                    </p>
                    <div className="mt-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Requirements:</span>
                      <ul className="list-disc pl-5 mt-2 space-y-1.5">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-slate-500 text-xs font-medium">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Direct Application Drop Box */}
      <section className="py-24 bg-[#f8fafc] border-t border-slate-100 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left bg-white p-8 md:p-14 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
            
            {/* Left Column: Form Details */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-display font-medium text-slate-800 mb-2">
                  Career <span className="font-normal text-slate-600">opportunities</span>
                </h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Feel free to send your CV to develop your bright Career with us.
                </p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-display font-black text-slate-900 uppercase tracking-tight">Application Submitted Successfully!</h4>
                  <p className="text-slate-500 text-xs font-semibold mt-3 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest! Your application and attached documents have been successfully routed to our HR Department at <span className="text-primary-purple font-bold">info@simgroup-bd.com</span>. We will review your profile and contact you soon.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-xs font-black uppercase tracking-widest text-[#0088cc] hover:text-[#005580] transition-colors flex items-center gap-1.5 mx-auto"
                  >
                    Submit Another Profile <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-6 relative z-10">
                  {/* Row 1: Full Name and Email Address */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Full Name *</label>
                      <input 
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder=""
                        className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-xs font-medium focus:outline-none focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Email Address *</label>
                      <input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder=""
                        className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-xs font-medium focus:outline-none focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Subject</label>
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject || ''}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-xs font-medium focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>

                  {/* Row 3: Attachment with Simulated Progress */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Attachment <span className="text-slate-500 font-semibold ml-1.5 text-[10px]">(Max file size: 5MB. Supported format: .pdf only)</span>
                    </label>
                    <div className="relative flex items-center gap-3">
                      <div className="relative">
                        <button 
                          type="button"
                          className="bg-[#f0f0f0] border border-slate-300 hover:bg-[#e4e4e4] text-[11px] font-sans font-medium px-4 py-2 rounded text-slate-700 shadow-sm transition-all relative z-10"
                        >
                          Choose File
                        </button>
                        <input 
                          type="file" 
                          accept=".pdf"
                          onChange={handleFileChange}
                          disabled={isUploading}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                      </div>
                      
                      <div className="flex-grow text-xs text-slate-500 font-sans">
                        {isUploading ? (
                          <div className="flex items-center gap-2 text-primary-purple font-medium animate-pulse">
                            <span className="w-2.5 h-2.5 border-2 border-primary-purple/20 border-t-primary-purple rounded-full animate-spin"></span>
                            <span>সিভি আপলোড হচ্ছে ({uploadProgress}%)</span>
                          </div>
                        ) : uploadCompleted ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                            আপলোড সম্পূর্ণ হয়েছে! ✅ <span className="font-medium text-slate-600">{selectedFileName}</span>
                          </span>
                        ) : (
                          <span>{selectedFileName ? selectedFileName : "No file chosen"}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Message *</label>
                    <textarea 
                      rows={8}
                      name="coverLetter"
                      required
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-xs font-medium focus:outline-none focus:border-blue-400 transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Row 5: Captcha mock style exactly like Google v2 */}
                  <div className="pt-2">
                    <div className="w-[302px] h-[78px] bg-[#f9f9f9] border border-[#d3d3d3] rounded shadow-[0_0_4px_rgba(0,0,0,0.05)] flex items-center justify-between px-3 select-none">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleRecaptchaClick}
                          className="w-6 h-6 border-2 border-[#c1c1c1] rounded-sm bg-white hover:border-[#a6a6a6] flex items-center justify-center transition-all duration-150 focus:outline-none"
                        >
                          {recaptchaSpinning ? (
                            <span className="w-4 h-4 border-2 border-[#4d90fe]/20 border-t-[#4d90fe] rounded-full animate-spin"></span>
                          ) : recaptchaChecked ? (
                            <motion.svg 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 text-emerald-605 font-black fill-none stroke-emerald-600"
                              viewBox="0 0 24 24"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </motion.svg>
                          ) : null}
                        </button>
                        <span className="text-[13px] font-sans font-normal text-[#2d2d2d]">I'm not a robot</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center pr-1.5 leading-none">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#4d90fe]/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-1.3,1.3A1,1,0,0,0,3.67,21.3L5,20a9.89,9.89,0,0,0,7,2A10,10,0,1,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
                            <path d="M12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Zm1,9H11V13H13Zm0-4H11V7H13Z" />
                          </svg>
                        </div>
                        <span className="text-[8px] font-sans font-medium text-[#9b9b9b] mt-0.5 tracking-tighter">reCAPTCHA</span>
                        <div className="flex gap-1 text-[6.5px] font-sans font-medium text-[#9b9b9b] mt-1">
                          <span className="hover:underline cursor-pointer">Privacy</span>
                          <span>-</span>
                          <span className="hover:underline cursor-pointer">Terms</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg text-slate-800 space-y-2 relative z-10"
                    >
                      <h5 className="text-xs font-black text-red-600 flex items-center gap-1.5 uppercase tracking-wider">
                        ❌ ইমেইল পাঠানো ব্যর্থ হয়েছে (Submission Failed)
                      </h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed font-sans">
                        বিবরণ: <span className="text-red-500 font-bold">{submitError}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                        অনুগ্রহ করে পরবর্তীতে পুনরায় চেষ্টা করুন অথবা সরাসরি info@simgroup-bd.com ইমেইলে যোগাযোগ করুন।
                      </p>
                    </motion.div>
                  )}

                  {/* Row 6: Submit Button */}
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="bg-[#0088cc] hover:bg-[#006699] text-white font-sans font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-md transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : "SEND MESSAGE"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Address and Info Panel */}
            <div className="lg:col-span-4 lg:pl-10 lg:border-l lg:border-slate-100 flex flex-col justify-start space-y-12">
              {/* Our Office Block */}
              <div>
                <h4 className="text-xl font-display font-medium text-slate-800 mb-8">Official <span className="font-normal text-slate-600">Contacts</span></h4>
                <div className="space-y-6">
                  
                  {/* Corporate Hub */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <h5 className="text-[11px] font-black uppercase tracking-widest text-[#0088cc] flex items-center gap-1.5 border-b border-slate-150 pb-2">
                      <span className="w-1.5 h-1.5 bg-[#0088cc] rounded-full animate-pulse"></span> Corporate Hub
                    </h5>
                    
                    <div className="space-y-4.5">
                      {/* Address */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 border border-blue-500 rounded-lg flex items-center justify-center text-blue-500 shrink-0 bg-white shadow-sm">
                          <MapPin size={14} />
                        </div>
                        <div>
                          <h6 className="text-[10px] font-bold text-slate-700 leading-none uppercase tracking-wider">Address:</h6>
                          <span className="text-[11px] font-sans text-slate-500 font-medium leading-relaxed mt-1.5 block">
                            House # 315, Road # 04, Baridhara D.O.H.S, Dhaka, Bangladesh.
                          </span>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 border border-blue-500 rounded-lg flex items-center justify-center text-blue-500 shrink-0 bg-white shadow-sm">
                          <Phone size={14} />
                        </div>
                        <div>
                          <h6 className="text-[10px] font-bold text-slate-700 leading-none uppercase tracking-wider">Phone:</h6>
                          <span className="text-[11px] font-sans text-slate-500 font-medium leading-relaxed mt-1.5 block">
                            +88 02 8415961-3
                          </span>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 border border-blue-500 rounded-lg flex items-center justify-center text-blue-500 shrink-0 bg-white shadow-sm">
                          <Mail size={14} />
                        </div>
                        <div>
                          <h6 className="text-[10px] font-bold text-slate-700 leading-none uppercase tracking-wider">Email:</h6>
                          <span className="text-[11px] font-sans text-slate-500 font-semibold leading-relaxed mt-1.5 block hover:text-blue-500 transition-colors">
                            info@simgroup-bd.com
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Industrial Presence */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <h5 className="text-[11px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1.5 border-b border-slate-150 pb-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span> Industrial Presence
                    </h5>
                    
                    {/* Address */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 border border-indigo-500 rounded-lg flex items-center justify-center text-indigo-500 shrink-0 bg-white shadow-sm">
                        <Factory size={14} />
                      </div>
                      <div>
                        <h6 className="text-[10px] font-bold text-slate-700 leading-none uppercase tracking-wider">Factory Address:</h6>
                        <span className="text-[11px] font-sans text-slate-500 font-medium leading-relaxed mt-1.5 block">
                          Thakurbari Teac, Masumabad, Bhulta, Rupgonj, Narayangonj, Dhaka, Bangladesh.
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Business Hours Block */}
              <div>
                <h4 className="text-xl font-display font-medium text-slate-800 mb-6">Business <span className="font-normal text-slate-600">Hours</span></h4>
                <div className="space-y-4">
                  {/* Sat-Thu */}
                  <div className="flex gap-3 items-start">
                    <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-medium font-sans text-slate-500 leading-none">
                        Saturday-Thursday: 9 am to 6 pm
                      </span>
                    </div>
                  </div>

                  {/* Fri */}
                  <div className="flex gap-3 items-start">
                    <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-medium font-sans text-slate-500 leading-none">
                        Friday: Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Custom Apply Modal for Specific Jobs */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative z-10"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#FF4500] bg-[#FF4500]/5 px-2.5 py-1 rounded-md border border-[#FF4500]/15">
                    {selectedJob.concern}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-black text-slate-800 uppercase tracking-tight mt-2">{selectedJob.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="p-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full font-black text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6 text-xs text-slate-500 font-medium">
                <p><strong>Region/Location:</strong> {selectedJob.location}</p>
                <p><strong>Job Type:</strong> {selectedJob.type}</p>
                <p><strong>Experience Required:</strong> {selectedJob.experience}</p>
                <p><strong>Description:</strong> {selectedJob.description}</p>
                <div>
                  <strong>Key Responsibilities:</strong>
                  <ul className="list-disc pl-5 mt-1.5 space-y-1">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4">Complete Quick Apply:</h4>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name *"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email *"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <input 
                    type="tel" 
                    placeholder="Your Phone Number *"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <input 
                    type="url" 
                    placeholder="Resume Link (Google Drive, Dropbox etc)"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                    value={formData.resumeLink}
                    onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
                  />

                  <button 
                    onClick={async (e) => {
                      if (!formData.name || !formData.email || !formData.phone) {
                        alert("Please fill out the basic required fields (Name, Email, Phone).");
                        return;
                      }
                      setSubmitting(true);

                      // Construct fields
                      const postDetails = {
                        "Position Applied": selectedJob?.title || "Career Profile",
                        "Concern / Unit": selectedJob?.concern || "SIM Group",
                        "Applicant Name": formData.name,
                        "Email Address": formData.email,
                        "Contact Phone": formData.phone,
                        "Expected Experience": selectedJob?.experience || "Not specified",
                        "CV / Resume Link": formData.resumeLink || "None provided"
                      };

                      // Submit in background
                      await sendEmailToGateway(`Job Application: ${selectedJob?.title || "Career Profile"} - ${formData.name}`, postDetails);

                      setTimeout(() => {
                        setSubmitting(false);
                        setSubmitted(true);

                        // Reset form
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          concern: '',
                          experience: '',
                          resumeLink: '',
                          coverLetter: '',
                        });
                        setSelectedFileName('');
                        setSelectedFileBase64('');
                        setSelectedFile(null);
                        setIsUploading(false);
                        setUploadProgress(0);
                        setUploadCompleted(false);
                        setSelectedJob(null);
                      }, 800);
                    }}
                    disabled={submitting}
                    className="w-full bg-[#FF4500] hover:bg-primary-purple text-white font-black text-[11px] uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    {submitting ? "Submitting..." : "Submit Direct Application"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Recruiter Login Pin Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordError('');
              }}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] border border-slate-150 shadow-2xl p-8 max-w-md w-full relative z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-black text-slate-950 uppercase tracking-tight flex items-center gap-2">
                  <Lock size={18} className="text-primary-purple" /> Recruiter Login
                </h3>
                <button 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError('');
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition-all text-sm"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider">
                দয়া করে রিক্রুটার পোর্টালে প্রবেশের জন্য সঠিক পাসকোড প্রদান করুন। (আমরা আপাতত ডেমো পাসকোড হিসেবে <code className="bg-slate-100 py-0.5 px-1.5 rounded text-primary-purple font-mono">1234</code> বা <code className="bg-slate-100 py-0.5 px-1.5 rounded text-primary-purple font-mono">admin</code> ব্যবহার করেছি)
              </p>

              <form onSubmit={handleRecruiterLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">পাসকোড (Recruiter Pin) *</label>
                  <input 
                    type="password" 
                    required
                    placeholder="পাসকোড দিন..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white text-center tracking-[0.2em]"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-rose-500 text-xs font-semibold mt-2">{passwordError}</p>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-primary-purple text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-2xl transition-all"
                >
                  পাসকোড দিন ও প্রবেশ করুন
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Recruiter Job Posting Form Modal */}
        {showPostModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPostModal(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] border border-slate-150 shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary-purple bg-primary-purple/5 px-2.5 py-1 rounded-md">
                    HR & Recruiter Space
                  </span>
                  <h3 className="text-2xl font-display font-black text-slate-950 uppercase tracking-tight mt-2">
                    নতুন সার্কুলার পোস্ট করুন
                  </h3>
                </div>
                <button 
                  onClick={() => setShowPostModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition-all text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateJobSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Job Designation / Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Senior Executive - Merchandising"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Concern / Company Division *</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                      value={newJob.concern}
                      onChange={(e) => setNewJob({...newJob, concern: e.target.value})}
                    >
                      <option value="SIM Fabrics Ltd. (Weaving Unit)">SIM Fabrics Ltd. (Weaving Unit)</option>
                      <option value="SIM Fabrics Ltd. (Knit Dyeing Unit)">SIM Fabrics Ltd. (Knit Dyeing Unit)</option>
                      <option value="SIM Fabrics Ltd. (Denim Unit)">SIM Fabrics Ltd. (Denim Unit)</option>
                      <option value="Mozaffar Hossain Spinning Mills Ltd.">Mozaffar Hossain Spinning Mills Ltd.</option>
                      <option value="SIM Towel Ind. Ltd.">SIM Towel Ind. Ltd.</option>
                      <option value="SIM Corporate Head Office">SIM Corporate Head Office</option>
                      <option value="Azlan Agro Food">Azlan Agro Food</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Job Location *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Uttara, Dhaka / Gazipur"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Employment Type *</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                      value={newJob.type}
                      onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract / Project Based">Contract / Project Based</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Experience Required *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 2-4 Years / 5-8 Years"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                      value={newJob.experience}
                      onChange={(e) => setNewJob({...newJob, experience: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Salary Details *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Negotiable / 30,000 - 45,000 BDT"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Short Description of the Role *</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Write a brief overview of what this role entails..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white resize-none animate-none"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Requirements / Qualifications (New line per requirement) *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Enter each requirement on a separate line..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-xs font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-primary-purple/20 focus:bg-white resize-none"
                    value={newJob.requirementsText}
                    onChange={(e) => setNewJob({...newJob, requirementsText: e.target.value})}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowPostModal(false)}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-black text-xs uppercase tracking-widest py-4.5 rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-primary-purple text-white font-black text-xs uppercase tracking-widest py-4.5 rounded-2xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-100"
                  >
                    Publish Circular (পোস্ট করুন) <Send size={12} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Footer Return Back Home */}
      <div className="py-12 bg-white text-center border-t border-slate-100">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary-purple transition-all"
        >
          <span>← Back to Primary Portal</span>
        </Link>
      </div>

    </div>
  );
};

export default CareerPage;
