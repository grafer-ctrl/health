
import type React from 'react';

export interface Calculator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}
