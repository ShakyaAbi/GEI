import {
  Activity, AlertCircle, ArrowDown, ArrowLeft, ArrowRight, ArrowUp,
  Award, Book, BookOpen, BookText, Building, Calendar, CheckCircle,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Clipboard, Clock, Cloud, Compass, Copy, DollarSign, Download,
  Droplets, Edit, ExternalLink, Eye, Facebook, FileIcon, FileImage,
  FileText, Filter, Flag, FolderOpen, Globe, Goal, GraduationCap,
  Heart, HeartPulse, Home, Image as ImageIcon, ImagePlus, Instagram,
  Leaf, Lightbulb, Linkedin, ListOrdered, Loader2, Lock, LogOut,
  Mail, MapPin, Menu, Moon, MoveRight, Pause, PencilLine, Phone,
  Pill, Play, Plus, PlusCircle, Recycle, Save, School, Search, Send,
  Share2, Shield, ShieldAlert, ShieldCheck, SortAsc, SortDesc, Sprout,
  Star, Stethoscope, Sun, Syringe, Target, Thermometer, Trash2,
  TreePine, TrendingUp, Twitter, Upload, User, UserCheck, UserPlus,
  Users, Wind, X, XCircle, Youtube, Zap,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Activity, AlertCircle, ArrowDown, ArrowLeft, ArrowRight, ArrowUp,
  Award, Book, BookOpen, BookText, Building, Calendar, CheckCircle,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Clipboard, Clock, Cloud, Compass, Copy, DollarSign, Download,
  Droplets, Edit, ExternalLink, Eye, Facebook, FileIcon, FileImage,
  FileText, Filter, Flag, FolderOpen, Globe, Goal, GraduationCap,
  Heart, HeartPulse, Home, Image: ImageIcon, ImagePlus, Instagram,
  Leaf, Lightbulb, Linkedin, ListOrdered, Loader2, Lock, LogOut,
  Mail, MapPin, Menu, Moon, MoveRight, Pause, PencilLine, Phone,
  Pill, Play, Plus, PlusCircle, Recycle, Save, School, Search, Send,
  Share2, Shield, ShieldAlert, ShieldCheck, SortAsc, SortDesc, Sprout,
  Star, Stethoscope, Sun, Syringe, Target, Thermometer, Trash2,
  TreePine, TrendingUp, Twitter, Upload, User, UserCheck, UserPlus,
  Users, Wind, X, XCircle, Youtube, Zap,
};

export function getLucideIcon(iconName: string, className = "w-5 h-5 mr-2 text-blue-500 inline-block align-middle") {
  if (!iconName) return null;
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
}
