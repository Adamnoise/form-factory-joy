
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: 100 | 200 | 300 | 400 | 500 | 600;
  duration?: 'fast' | 'normal' | 'slow';
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

const FadeIn = ({
  children,
  className,
  delay = 100,
  duration = 'normal',
  direction = 'up',
}: FadeInProps) => {
  const getAnimation = () => {
    switch (direction) {
      case 'up':
        return 'animate-slide-up';
      case 'none':
        return 'animate-fade-in';
      case 'left':
      case 'right':
        return 'animate-slide-in';
      default:
        return 'animate-fade-in';
    }
  };

  const getDuration = () => {
    switch (duration) {
      case 'fast':
        return 'duration-300';
      case 'slow':
        return 'duration-1000';
      default:
        return 'duration-500';
    }
  };

  const delayClass = delay ? `animate-delay-${delay}` : '';

  return (
    <div
      className={cn(
        'opacity-0',
        getAnimation(),
        getDuration(),
        delayClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default FadeIn;
