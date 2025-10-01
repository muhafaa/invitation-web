import { useState, useCallback } from 'react';

// Simple toast implementation
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((options) => {
    const id = Date.now();
    const toastItem = {
      id,
      title: options.title || 'Notification',
      description: options.description || '',
      variant: options.variant || 'default', // 'default', 'destructive', 'success'
      duration: options.duration || 3000
    };

    setToasts(prev => [...prev, toastItem]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, toastItem.duration);

    // Simple console log for now (in real app, this would show actual toast UI)
    console.log(`Toast: ${toastItem.title} - ${toastItem.description}`);
    
    // Show browser notification for demo
    if (window.Notification && Notification.permission === 'granted') {
      new Notification(toastItem.title, {
        body: toastItem.description,
        icon: '/favicon.ico'
      });
    } else if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(toastItem.title, {
            body: toastItem.description,
            icon: '/favicon.ico'
          });
        }
      });
    }

    return {
      id,
      dismiss: () => setToasts(prev => prev.filter(t => t.id !== id))
    };
  }, []);

  return {
    toast,
    toasts,
    dismiss: (id) => setToasts(prev => prev.filter(t => t.id !== id))
  };
}