import {
  Sparkles, Wrench, Droplet, Hammer, Waves, PanelTop, Building2, Home,
  Store, AlertTriangle, Phone, MessageCircle, MapPin, CheckCircle2,
  Star, Clock, ShieldCheck, Heart, Award, Check,
} from 'lucide-react';

export const iconMap = {
  Sparkles, Wrench, Droplet, Hammer, Waves, PanelTop, Building2, Home,
  Store, AlertTriangle, Phone, MessageCircle, MapPin, CheckCircle2,
  Star, Clock, ShieldCheck, Heart, Award, Check,
};

export const getIcon = (name) => iconMap[name] || Sparkles;
