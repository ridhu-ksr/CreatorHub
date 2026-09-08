import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Share2, 
  Video,
  Pin
} from 'lucide-react';
import { PlatformId } from '../types';

export function getPlatformIcon(platform: PlatformId, className: string = 'w-4 h-4') {
  switch (platform) {
    case 'youtube':
      return <Youtube className={`${className} text-red-500`} />;
    case 'instagram':
      return <Instagram className={`${className} text-pink-500`} />;
    case 'tiktok':
      return <Video className={`${className} text-cyan-400`} />;
    case 'twitter':
      return <Twitter className={`${className} text-sky-400`} />;
    case 'linkedin':
      return <Linkedin className={`${className} text-blue-500`} />;
    case 'facebook':
      return <Facebook className={`${className} text-indigo-500`} />;
    case 'pinterest':
      return <Pin className={`${className} text-rose-500`} />;
    default:
      return <Share2 className={`${className} text-slate-400`} />;
  }
}

export function getPlatformName(platform: PlatformId): string {
  switch (platform) {
    case 'youtube':
      return 'YouTube';
    case 'instagram':
      return 'Instagram';
    case 'tiktok':
      return 'TikTok';
    case 'twitter':
      return 'X (Twitter)';
    case 'linkedin':
      return 'LinkedIn';
    case 'facebook':
      return 'Facebook';
    case 'pinterest':
      return 'Pinterest';
    default:
      return platform;
  }
}

export function getPlatformBadgeColor(platform: PlatformId): string {
  switch (platform) {
    case 'youtube':
      return 'bg-red-500/15 text-red-400 border-red-500/30';
    case 'instagram':
      return 'bg-pink-500/15 text-pink-400 border-pink-500/30';
    case 'tiktok':
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    case 'twitter':
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    case 'linkedin':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'facebook':
      return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    case 'pinterest':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    default:
      return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
  }
}
