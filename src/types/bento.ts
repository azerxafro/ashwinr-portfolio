export interface BentoItem {
  title: string;
  description?: string;
  icon?: string;
  class: string;
  gradient: string;
  items?: string[];
  link?: string;
  type?: 'video';
}